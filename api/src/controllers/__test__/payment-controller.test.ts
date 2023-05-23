import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '@root/app';
import { DatabaseService, StripePaymentService, MailerService } from '@src/services/index';
import { CError } from '@src/utils';
import { TestContext } from '@root/typings';
import config from '@root/config';

vi.mock('@src/services/DatabaseService')
vi.mock('@src/services/StripePaymentService')
vi.mock('@src/services/MailerService')
vi.mock('jsonwebtoken')
vi.mock('@src/middleware/AuthMiddleware')

beforeEach<TestContext>((context) => {
    context.app = createExpressApp(
        new DatabaseService(),
        new StripePaymentService(""),
        new MailerService(config.test.MAILER)
    )
    context.supertestInstance = supertest(context.app)
})

afterEach(() => {
    vi.clearAllMocks();
})

describe("Tests for order placement", () => {
    test<TestContext>("Can create a new order", async ({ supertestInstance, app }) => {
        const response = await supertestInstance
            .post('/checkout/pay')
            .set({ 'Authorization': "Bearer x" })
            .send({ playerName: "Joe Biden" })

        expect(app!.get('pc').createPayment).toBeCalled()
        expect(app!.get('db').createOrder).toBeCalledWith(
            "Joe Biden",
            "Payment Id",
            "Document Id"
        )
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ checkOutUrl: 'test' })
    })

    test<TestContext>("Rejects order creation without token", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .post('/checkout/pay')
            .send({ playerName: "Joe Biden" })

        expect(app!.get('pc').createPayment).not.toBeCalled()
        expect(app!.get('db').createOrder).not.toBeCalled()
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'Unauthorized - Missing or invalid token' })
    })

    test<TestContext>("Rejects order creation without playername", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .post('/checkout/pay')
            .set({ 'Authorization': "Bearer x" })

        expect(app!.get('pc').createPayment).not.toBeCalled()
        expect(app!.get('db').createOrder).not.toBeCalled()
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'Missing required fields' })
    })
})

describe("Tests for payment completion", () => {
    
})



