import { PaymentProcessorInterface } from "@root/typings";
const { createMollieClient } = require('@mollie/api-client');

export class MolliePayment implements PaymentProcessorInterface {

    private client

    constructor(apiKey: string) {
        this.client = createMollieClient(apiKey)
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
    public async getPayment(id: string) {
        return await this.client.payments.get(id)
    }
}

function Injectable() {
    throw new Error("Function not implemented.");
}
