import { Request, Response } from "express";
import { CError } from "@src/utils";
import formidable from 'formidable';
import { DatabaseInterface, FormResponseInterface, MailerInterface, PaymentProcessorInterface, TokenInterface } from "@root/typings";
import fs from 'fs'
import xlsx from 'xlsx'
import { paymentCompleteReqSchema } from "@src/models/api-models";
import jwt from 'jsonwebtoken'
import { model } from "mongoose";

export class PaymentController {

    /**
     * Creating a payment and store files (arrow function to preserve `this`)
     * 
     * @param req Request object
     * @param res Response object
     */
    public acceptPayment = async (req: Request, res: Response) => {
        try {

            const paymentClient: PaymentProcessorInterface = req.app.get('pc')
            const databaseClient: DatabaseInterface = req.app.get('db')
            const payload = jwt.decode(req.headers.authorization?.split(' ')[1] as string) as TokenInterface

            const { files }: FormResponseInterface = await new Promise((resolve, reject) => {
                formidable({ multiples: true })
                    .parse(req, (err, _, files) => {
                        if (err) reject(err)
                        resolve({ files })
                    })
            })

            if (!files.hasOwnProperty('player') || !files.hasOwnProperty('league'))
                throw new CError('Missing file', 404)

            const payment = await paymentClient
                .createPayment("50.00", "EUR", "xxx")

            await databaseClient
                .createOrder(
                    Buffer.from(fs.readFileSync(files.player.filepath)),
                    Buffer.from(fs.readFileSync(files.league.filepath)),
                    payment.id,
                    payload._id
                )

            res.status(200)
                .json({ checkOutUrl: payment.checkOutUrl })
        } catch (err: any) {
            if (err instanceof CError)
                return res.status(err.code)
                    .json({ message: err.message })

            res.status(500)
                .json({ message: err })
        }
    }

    /**
     * Fullfilling order after payment completed (the hook which gets called)
     * 
     * @param req Request object
     * @param res Response object
     */
    public async completePayment(req: Request, res: Response) {
        try {
            if (!paymentCompleteReqSchema.safeParse(req.body).success)
                throw new CError("Missing order id", 404)

            const paymentClient: PaymentProcessorInterface = req.app.get('pc')
            const databaseClient: DatabaseInterface = req.app.get('db')
            const mailer: MailerInterface = req.app.get('nm')

            const payment = await paymentClient.getPayment(req.body.id)

            if (payment.status === 'expired')
                throw new CError("Payment expired, try again", 404)

            if (payment.status !== 'paid')
                throw new CError("Payment not yet completed", 402)

            const order = await databaseClient.findOrder(req.body.id)
            const orderOwner = await databaseClient.findUserByOrder(req.body.id)

            if (!fs.existsSync('./src/uploads')) fs.mkdirSync('./src/uploads');

            xlsx.writeFile(xlsx.read(order.leagueFile), `./src/uploads/league_${req.body.id}.xlsx`);
            xlsx.writeFile(xlsx.read(order.playerFile), `./src/uploads/player_${req.body.id}.xlsx`);

            // TODO: Call script API

            const info = await mailer.sendEmail(
                orderOwner.email,
                order.orderId,
                `./src/uploads/league_${req.body.id}.xlsx` // FIXME: Change to file name of report
            )

            if (info.accepted.length == 0)
                throw new CError(info.err, 500)

            fs.unlinkSync(`./src/uploads/league_${req.body.id}.xlsx`)
            fs.unlinkSync(`./src/uploads/player_${req.body.id}.xlsx`)

            res.status(200)
                .json({ message: 'Emailed report!' })

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
    public async noPayment(req: Request, res: Response) {
        try {
            const payload = jwt.decode(req.headers.authorization?.split(' ')[1] as string) as TokenInterface
            const databaseClient: DatabaseInterface = req.app.get('db')
            const mailer: MailerInterface = req.app.get('nm')

            if (!payload.isEmployee)
                throw new CError("Missing required authorization" + payload.email, 401)

            const { files }: FormResponseInterface = await new Promise((resolve, reject) => {
                formidable({ multiples: true })
                    .parse(req, (err, _, files) => {
                        if (err) reject(err)
                        resolve({ files })
                    })
            })

            if (!files.hasOwnProperty('player') || !files.hasOwnProperty('league'))
                throw new CError('Missing file', 404)

            const orderId = `employee_purchase_${new Date().getTime()}`

            await databaseClient
                .createOrder(
                    Buffer.from(fs.readFileSync(files.player.filepath)),
                    Buffer.from(fs.readFileSync(files.league.filepath)),
                    orderId,
                    payload._id
                )

            // TODO: Call script API

            const info = await mailer.sendEmail(
                payload.email,
                orderId,
                files.player.filepath // FIXME: Change to file name of report
            )

            if (info.accepted.length == 0)
                throw new CError(info.err, 500)

            res.status(200)
                .json({ message: 'Emailed report!' })
        } catch (err: any) {

            if (err instanceof CError)
                return res.status(err.code)
                    .json({ message: err.message })

            res.status(500)
                .json({ message: 'Something went wrong' })
        }
    }
}