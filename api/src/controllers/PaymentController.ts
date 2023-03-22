import { Request, Response } from "express";
import { CError } from "@src/utils";
import formidable from 'formidable';
import { DatabaseInterface, FormResponseInterface, PaymentProcessorInterface } from "@root/typings";
import fs from 'fs'
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

            const paymentClient: PaymentProcessorInterface = req.app.get('pc')
            const databaseClient: DatabaseInterface = req.app.get('db')

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

            const payment = await paymentClient
                .createPayment("50.00", "EUR", "xxx")

            await databaseClient
                .createOrder(Buffer.from(fs.readFileSync(files.file.filepath)), payment.id)

            res.status(200)
                .json({ checkOutUrl: payment.checkOutUrl })
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

            const paymentClient: PaymentProcessorInterface = req.app.get('pc')
            const databaseClient: DatabaseInterface = req.app.get('db')

            const payment = await paymentClient.getPayment(req.body.id)

            if (payment.status === 'expired')
                throw new CError("Payment expired, try again", 404)

            if (payment.status !== 'paid')
                throw new CError("Payment not yet completed", 402)

            const order = await databaseClient.findOrder(req.body.id)

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