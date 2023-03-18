import { Request, Response } from "express";
import { CError } from "@src/utils";

export class PaymentController {

    /**
     * Creating a payment
     * 
     * @param req Request object
     * @param res Response object
     */
    public async acceptPayment(req: Request, res: Response) {
        try {
            const mollieClient = req.app.get('mollie')

            const payment = await mollieClient.payments.create({
                amount: {
                    value: req.body.value.toFixed(2),
                    currency: 'EUR'
                },
                description: 'Purchase of report',
                redirectUrl: 'https://yourwebshop.example.org/order/123456', // TODO: Change 
                webhookUrl: 'https://yourwebshop.example.org/webhook' // TODO: Change 
            });

            res.status(200)
                .json({ checkOutUrl: payment.getCheckoutUrl() })
        } catch (err: any) {
            console.log(err)

            // TODO: Handle errors
        }
    }

    /**
     * Fullfilling order after payment completed
     * 
     * @param req Request object
     * @param res Response object
     */
    public async completePayment(req: Request, res: Response) {
        try {
            const mollieClient = req.app.get('mollie')

            const payment = mollieClient.payments.get(req.body.id)

        } catch (err: any) {
            console.log(err)

            // TODO: Handle errors
        }
    }
}