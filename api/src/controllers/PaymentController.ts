import { NextFunction, Request, Response } from "express";
import { CError } from "@src/utils";
import formidable from 'formidable';
import {
    DatabaseInterface,
    MailerInterface,
    PaymentProcessorInterface,
    FormResponseInterface
} from "@root/typings";
import { createPaymentSchema, employeePurchaseSchema } from "@src/models/api-models";
import { customerPurschaseSchema } from "@src/models/api-models/PaymentSchema";
import { pdfGenerator } from "@src/utils/pdfGenerator";
import fs from 'fs'

/**
 * PaymentController class is responsible for handling order flow
 */
export class PaymentController {

    /**
     * Method for extracting app data from the request object
     * 
     * @param req Request object
     * @returns 
     */
    private async getAppData(req: Request, res: Response) {

        const paymentClient: PaymentProcessorInterface = req.app.get('pc')
        const databaseClient: DatabaseInterface = req.app.get('db')
        const payload = res.locals.decoded
        const mailerClient: MailerInterface = req.app.get('nm')

        const form: FormResponseInterface = await new Promise((resolve, reject) => {
            if (!req.headers["content-type"]?.match(/multipart\/form-data/))
                resolve({})

            formidable({
                multiples: true,
                keepExtensions: true
            })
                .parse(req, (err, fields, files) => {
                    if (err) reject(err)
                    resolve({ files, fields })
                })
        })

        if (['/noPayment', '/fulfillOrder'].includes(req.path) && (!form.files.hasOwnProperty('player') || !form.files.hasOwnProperty('league')))
            throw new CError('Missing file', 404)

        return { paymentClient, databaseClient, payload, mailerClient, form }
    }

    /**
     * Creating a payment and store files
     * 
     * @param req Request object
     * @param res Response object
     */
    public acceptPayment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!createPaymentSchema.safeParse(req.body).success)
                throw new CError("Missing required fields", 404)

            const { paymentClient, databaseClient, payload } = await this.getAppData(req, res)

            const payment = await paymentClient
                .createPayment('49.00', "EUR", "Tactalyse Report", payload.email)

            await databaseClient
                .createOrder(
                    req.body.playerName,
                    payment.id,
                    payload._id
                )

            res.status(200)
                .json({ checkOutUrl: payment.checkOutUrl })
        } catch (err: any) {
            next(err)
        }
    }

    /**
     * Fullfilling order after payment completed (the hook which gets called by mollie)
     * 
     * @param req Request object
     * @param res Response object
     */
    public completePayment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paymentClient, databaseClient } = await this.getAppData(req, res)

            const id = await paymentClient.webhookHandler(req.body)

            databaseClient.completePayment(id)

            res.status(200)
                .json({ message: 'Payment completed, your report will be sent within 24 hours' })

        } catch (err: any) {
            next(err)
        }
    }

    /**
     * Method for fulfilling an order
     * 
     * @param req Request object
     * @param res Response object
     */
    public fulfillOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { payload, databaseClient, mailerClient, form } = await this.getAppData(req, res)

            if (!payload.isEmployee)
                throw new CError("Missing required authorization", 401)

            if (!customerPurschaseSchema.safeParse(form.fields).success)
                throw new CError("Missing required field(s)", 404)

            const order = await databaseClient.findOrder(form.fields.id)
            const orderOwner = await databaseClient.findUserByOrder(order._id)

            await databaseClient.completeOrder(order._id)

            const pdfBuffer = await pdfGenerator({
                leagueFile: fs.createReadStream(form.files.player.filepath),
                playerFile: fs.createReadStream(form.files.league.filepath),
                playerName: form.fields.playerName,
            })

            await mailerClient.sendEmail(
                orderOwner.email,
                {
                    filename: 'Report.pdf',
                    content: pdfBuffer,
                    contentType: "application/pdf"
                }
            )

            res.status(200)
                .json({ message: 'Emailed report!' })
        } catch (err: any) {
            next(err)
        }
    }

    /**
     * Method for getting a report as an employee
     * 
     * @param req Request object
     * @param res Response object
     */
    public noPayment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { payload, mailerClient, form } = await this.getAppData(req, res)

            if (!employeePurchaseSchema.safeParse(form.fields).success)
                throw new CError("Missing required field(s)", 404)

            if (!payload.isEmployee)
                throw new CError("Missing required authorization", 401)

            const pdfBuffer = await pdfGenerator({
                leagueFile: fs.createReadStream(form.files.player.filepath),
                playerFile: fs.createReadStream(form.files.league.filepath),
                playerName: form.fields.playerName,
            })

            await mailerClient.sendEmail(
                form.fields.email,
                {
                    filename: 'Report.pdf',
                    content: pdfBuffer,
                    contentType: "application/pdf"
                }
            )

            res.status(200)
                .json({ message: "Report sent" })
        } catch (err: any) {
            next(err)
        }
    }
}