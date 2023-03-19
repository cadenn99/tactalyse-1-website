import { Request, Response } from "express";
import { CError } from "@src/utils";
import formidable from 'formidable';
import { FormResponseInterface } from "@root/typings";
import fs from 'fs'

export class PaymentController {

    /**
     * Creating a payment and store files (arrow function to preserve `this`)
     * 
     * NOTE: Probably want to use a better way of storing the files like Google Drive API or in Mongodb 
     * but this will work for the time being
     * 
     * @param req Request object
     * @param res Response object
     */
    public acceptPayment = async (req: Request, res: Response) => {
        try {

            const mollieClient = req.app.get('mollie')

            const { fields, files }: FormResponseInterface = await new Promise((resolve, reject) => {
                formidable({ multiples: true })
                    .parse(req, (err, fields, files) => {
                        if (err) {
                            reject(err)
                        }
                        resolve({ fields, files })
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

            const rawData = fs.readFileSync(files.file.filepath)
            await new Promise((resolve, reject) => {
                fs.writeFile(__dirname + `/uploads/${payment.id}.xlsx`, rawData, (err) => {
                    if (err) reject(err)
                    resolve(0)
                })
            });

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

            const payment = mollieClient.payments.get(req.body.id)

        } catch (err: any) {
            console.log(err)

            // TODO: Handle errors
        }
    }
}