import { PaymentProcessorInterface } from "@root/typings";
import { CError } from "@src/utils";
import Stripe from 'stripe';

export class StripePaymentService implements PaymentProcessorInterface {

    private client: Stripe

    constructor(apiKey: string) {
        this.client = new Stripe(apiKey, {
            apiVersion: '2022-11-15',
            typescript: true
        });
    }

    /**
     * Method for creating a new payment
     * 
     * @param price The price for the product
     * @param currency The currency
     * @param description Product description
     * @returns 
     */
    public async createPayment(price: string, currency: string, description: string, email?: string) {
        const payment = await this.client.checkout.sessions.create({
            payment_method_types: ['card', 'ideal'],
            mode: "payment",
            customer_email: email ?? undefined,
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: description
                    },
                    unit_amount: parseFloat(price) * 100 // in cents
                },
                quantity: 1
            }],
            expires_at: Math.round(Date.now() / 1000 + 30 * 60),
            success_url: "https://platform.testalyse.nl/callback?id={CHECKOUT_SESSION_ID}",
            cancel_url: "https://platform.testalyse.nl",
        })

        return {
            id: payment.id,
            checkOutUrl: payment.url
        }
    }

    /**
     * Method for retrieving a payment and checking if it has been completed
     * 
     * @param id The order id
     * @returns 
     */
    public async webhookHandler(body: any) {
        if (!body?.data?.object?.id)
            throw new CError("Missing order id", 404)

        const checkout = await this.client.checkout.sessions.retrieve(body.data.object.id)

        if (checkout.status === 'expired')
            throw new CError("Payment expired, try again", 404)

        if (checkout.status === 'open')
            throw new CError("Payment not yet completed", 402)

        return body.data.object.id
    }
}