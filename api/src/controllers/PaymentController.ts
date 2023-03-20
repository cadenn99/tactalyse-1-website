import { Request, Response } from "express";
import { CError } from "@src/utils";
import formidable from 'formidable';
import { FormResponseInterface } from "@root/typings";
import fs from 'fs'
import { model } from "mongoose";
import xlsx from 'xlsx'
import { spawn } from "child_process";
import { paymentCompleteReqSchema } from "@src/models/api-models";

export class PaymentController {

    /**
     * Creating a payment and store files (arrow function to preserve `this`)
     * 
     * @param req Request object
     * @param res Response object
     */
    public acceptPayment = async (req: Request, res: Response) => {
        try {

            const mollieClient = req.app.get('mollie')

            const { files }: FormResponseInterface = await new Promise((resolve, reject) => {
                formidable({ multiples: true })
                    .parse(req, (err, _, files) => {
                        if (err) {
                            reject(err)
                        }
                        resolve({ files })
                    })
            })

            if (!files.hasOwnProperty('file'))
                throw new CError('Missing file', 404)

            const payment = await mollieClient.payments.create({
                amount: {
                    value: "50.00",
                    currency: 'EUR'
                },
                description: 'Purchase of report',
                redirectUrl: 'https://yourwebshop.example.org/order/123456', // TODO: Change 
                webhookUrl: 'https://yourwebshop.example.org/webhook' // TODO: Change 
            });

            await req.app.get('db')
                .createOrder(Buffer.from(fs.readFileSync(files.file.filepath)), payment.id)

            res.status(200)
                .json({ checkOutUrl: payment.getCheckoutUrl() })
        } catch (err: any) {
            if (err instanceof CError) {
                return res.status(err.code)
                    .json({ message: err.message })
            }

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

            const mollieClient = req.app.get('mollie')

            const payment = await mollieClient.payments.get(req.body.id)

            if (payment.status === 'expired') {
                throw new CError("Payment expired, try again", 404)
            }

            if (payment.status !== 'paid') {
                throw new CError("Payment not yet completed", 404)
            }

            const order = await req.app.get("db").findOrder(req.body.id)

            //------------ Maybe want to find a cleaner way of doing this ------------//

            if (!fs.existsSync('./src/uploads')) fs.mkdirSync('./src/uploads');

            xlsx.writeFile(xlsx.read(order.file), `./src/uploads/${req.body.id}.xlsx`);

            const cp = spawn("python",
                ["-c", `import placeholder; placeholder.main('../../uploads/${req.body.id}.xlsx')`],
                { cwd: './src/services/python' }
            )

            cp.stdout.on('data', (data) => {
                res.status(200)
                    .json({ message: 'Script processed data' })
            });

            cp.stderr.on('error', (err) => {
                res.status(500)
                    .json({ message: err })
            });

            cp.on('exit', () => {
                fs.unlinkSync(`./src/uploads/${req.body.id}.xlsx`)
            })
            //------------ --------------------------------------------- ------------//
        } catch (err: any) {
            console.log(err)

            if (err instanceof CError) {
                return res.status(err.code)
                    .json({ message: err.message })
            }

            res.status(500)
                .json({ message: "Something went wrong", err })
        }
    }
}