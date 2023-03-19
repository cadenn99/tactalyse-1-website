import { raw, Request, Response } from "express";
import { CError } from "@src/utils";
import formidable from 'formidable';
import { FormResponseInterface } from "@root/typings";
import fs from 'fs'
import { model } from "mongoose";
import xlsx from 'xlsx'

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

            // TODO: If the payment expires remove files from in-memory storage

            const payment = await mollieClient.payments.get(req.body.id)

            console.log(payment)

            if (payment.status === 'expired') {
                throw new CError("Payment expired, try again", 404)
            }

            if (payment.status !== 'paid') {
                throw new CError("Payment has not yet completed", 404)
            }

            const order = await model('Order').findOne({ orderId: req.body.id })

            // I dont think there is need to write it to a file, it can be passed directly to the script
            xlsx.writeFile(xlsx.read(order.file), __dirname + `/uploads/${req.body.id}.xlsx`);
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