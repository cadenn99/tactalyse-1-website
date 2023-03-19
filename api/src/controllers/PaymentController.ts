import { Request, Response } from "express";
import { CError } from "@src/utils";
import formidable from 'formidable';
import { FormResponseInterface } from "@root/typings";
import fs from 'fs'
import { model } from "mongoose";
import xlsx from 'xlsx'
import { spawn } from "child_process";

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
                    .parse(req, (err, fields, files) => {
                        if (err) {
                            reject(err)
                        }
                        resolve({ files })
                    })
            })

            const payment = await mollieClient.payments.create({
                amount: {
                    value: "50.00",
                    currency: 'EUR'
                },
                description: 'Purchase of report',
                redirectUrl: 'https://yourwebshop.example.org/order/123456', // TODO: Change 
                webhookUrl: 'https://yourwebshop.example.org/webhook' // TODO: Change 
            });

            await model('Order').create({
                file: Buffer.from(fs.readFileSync(files.file.filepath)),
                orderId: payment.id,
                creationTimestamp: new Date().getTime()
            })

            res.status(200)
                .json({ checkOutUrl: payment.getCheckoutUrl() })
        } catch (err: any) {
            console.log(err)

            // TODO: Handle errors
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
            const mollieClient = req.app.get('mollie')

            const payment = await mollieClient.payments.get(req.body.id)

            if (payment.status === 'expired') {
                throw new CError("Payment expired, try again", 404)
            }

            if (payment.status !== 'paid') {
                throw new CError("Payment not yet completed", 404)
            }

            const order = await model('Order').findOne({ orderId: req.body.id })

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
        } catch (err: any) {
            console.log(err)

            if (err instanceof CError) {
                return res.status(err.code)
                    .json({ message: err.message })
            }

            res.status(500)
                .json({ message: "Something went wrong" })
        }
    }
}