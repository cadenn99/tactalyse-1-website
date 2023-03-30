import { Request, Response } from "express";
import { CError } from "@src/utils";
import formidable from 'formidable';
import {
    DatabaseInterface,
    MailerInterface,
    PaymentProcessorInterface,
    TokenInterface,
    FormResponseInterface
} from "@root/typings";
import { paymentCompleteReqSchema, createPaymentSchema } from "@src/models/api-models";
import jwt from 'jsonwebtoken'

export class PaymentController {

    /**
     * Method for extracting app data from the request object
     * 
     * @param req Request object
     * @returns 
     */
    private async getAppData(req: Request) {

        if (req.headers.authorization === undefined) throw new CError('Unauthorized - Missing or invalid token', 401)

        const paymentClient: PaymentProcessorInterface = req.app.get('pc')
        const databaseClient: DatabaseInterface = req.app.get('db')
        const payload = jwt.decode(req.headers.authorization?.split(' ')[1] as string) as TokenInterface
        const mailerClient: MailerInterface = req.app.get('nm')

        const form: FormResponseInterface = await new Promise((resolve, reject) => {
            if (!req.headers["content-type"]!.match(/multipart\/form-data/))
                resolve({})

            formidable({ multiples: true })
                .parse(req, (err, fields, files) => {
                    if (err) reject(err)
                    resolve({ files, fields })
                })
        })

        if (req.path === '/noPayment' && (!form.files.hasOwnProperty('player') || !form.files.hasOwnProperty('league')))
            throw new CError('Missing file', 404)

        return { paymentClient, databaseClient, payload, mailerClient, form }
    }

    /**
     * Creating a payment and store files
     * 
     * @param req Request object
     * @param res Response object
     */
    public acceptPayment = async (req: Request, res: Response) => {
        try {
            if (!createPaymentSchema.safeParse(req.body).success)
                throw new CError("Missing required fields", 404)

            const { paymentClient, databaseClient, payload } = await this.getAppData(req)

            const payment = await paymentClient
                .createPayment("50.00", "EUR", "xxx")

            await databaseClient
                .createOrder(
                    req.body.playerName,
                    payment.id,
                    payload._id
                )

            res.status(200)
                .json({ checkOutUrl: payment.checkOutUrl })
        } catch (err: any) {
            console.log(err)
            if (err instanceof CError)
                return res.status(err.code)
                    .json({ message: err.message })

            res.status(500)
                .json({ message: err })
        }
    }

    /**
     * Fullfilling order after payment completed (the hook which gets called by mollie)
     * 
     * @param req Request object
     * @param res Response object
     */
    public completePayment = async (req: Request, res: Response) => {
        try {
            if (!paymentCompleteReqSchema.safeParse(req.body).success)
                throw new CError("Missing order id", 404)

            const { paymentClient, databaseClient, mailerClient } = await this.getAppData(req)

            const payment = await paymentClient.getPayment(req.body.id)

            if (payment.status === 'expired')
                throw new CError("Payment expired, try again", 404)

            if (payment.status !== 'paid')
                throw new CError("Payment not yet completed", 402)

            databaseClient.completePayment(req.body.id)

            // await mailerClient.sendEmail(
            //     orderOwner.email,
            //     form.fields.id,
            //     form.files.player.filepath // FIXME: Change to file name of report
            // )

            res.status(200)
                .json({ message: 'Payment completed, your report will be sent within 24 hours' })

        } catch (err: any) {
            console.log(err)
            if (err instanceof CError)
                return res.status(err.code)
                    .json({ message: err.message })

            res.status(500)
                .json({ message: "Something went wrong", err })
        }
    }

    /**
     * Method for getting a report as an employee
     * 
     * @param req Request object
     * @param res Response object
     */
    public noPayment = async (req: Request, res: Response) => {
        try {
            const { payload, databaseClient, mailerClient, form } = await this.getAppData(req)

            if (!payload.isEmployee)
                throw new CError("Missing required authorization" + payload.email, 401)

            const order = await databaseClient.findOrder(form.fields.id)
            const orderOwner = await databaseClient.findUserByOrder(order._id)

            // TODO: Call script API

            await mailerClient.sendEmail(
                orderOwner.email,
                form.fields.id,
                form.files.player.filepath // FIXME: Change to file name of report
            )

            res.status(200)
                .json({ message: 'Emailed report!' })
        } catch (err: any) {
            console.log(err)
            if (err instanceof CError)
                return res.status(err.code)
                    .json({ message: err.message })

            res.status(500)
                .json({ message: 'Something went wrong' })
        }
    }
}