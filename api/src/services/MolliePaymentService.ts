import { PaymentProcessorInterface } from "@root/typings";
import { createMollieClient } from '@mollie/api-client';
import { CError } from "@src/utils";

/**
 * Implementation of mollie payment service, client didn't wanted to switch over to stripe
 */
export class MolliePaymentService implements PaymentProcessorInterface {

    private client

    constructor(apiKey: string) {
        this.client = createMollieClient({ apiKey: apiKey })
    }

    /**
     * Method for creating a new payment
     * 
     * @param price The price for the product
     * @param currency The currency
     * @param description Product description
     * @returns 
     */
    public async createPayment(price: string, currency: string, description: string) {
        const payment = await this.client.payments.create({
            amount: {
                value: price,
                currency: currency
            },
            description: description,
            redirectUrl: 'https://yourwebshop.example.org/order/123456', // TODO: Change 
            webhookUrl: 'https://yourwebshop.example.org/webhook' // TODO: Change 
        });

        return {
            id: payment.id,
            checkOutUrl: payment.getCheckoutUrl()
        }
    }

    /**
     * Method for retrieving a payment
     * 
     * @param id The order id
     * @returns 
     */
    public async webhookHandler(id: string) {
        const payment = await this.client.payments.get(id)

        if (payment.status === 'expired')
            throw new CError("Payment expired, try again", 404)

        if (payment.status === 'open')
            throw new CError("Payment not yet completed", 402)

    }
}