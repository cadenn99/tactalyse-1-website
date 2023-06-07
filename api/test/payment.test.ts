import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '@root/app';
import { DatabaseService, PaymentService, MailerService } from '@src/services/index';
import { CError } from '@src/utils';
import { TestContext } from '@root/typings';
import config from '@root/config';

vi.mock('@src/services/DatabaseService')
vi.mock('@src/services/PaymentService')
vi.mock('@src/services/MailerService')
vi.mock('jsonwebtoken')
vi.mock('@src/middleware/AuthMiddleware')

beforeEach<TestContext>((context) => {
    context.app = createExpressApp(
        new DatabaseService(),
        new PaymentService(""),
        new MailerService(config.test.MAILER)
    )
    context.supertestInstance = supertest(context.app)
})

afterEach(() => {
    vi.clearAllMocks();
})

describe("Tests for order creation", () => {
    test<TestContext>("Can create a new order", async ({ supertestInstance, app }) => {
        const response = await supertestInstance
            .post('/checkout/pay')
            .set({ 'Authorization': "Bearer x" })
            .send({ playerName: "Joe Biden" })

        expect(app.get('pc').createPayment).toBeCalled()
        expect(app.get('db').createOrder).toBeCalledWith(
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

        expect(app.get('pc').createPayment).not.toBeCalled()
        expect(app.get('db').createOrder).not.toBeCalled()
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'Unauthorized - Missing or invalid token' })
    })

    test<TestContext>("Rejects order creation without playername", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .post('/checkout/pay')
            .set({ 'Authorization': "Bearer x" })

        expect(app.get('pc').createPayment).not.toBeCalled()
        expect(app.get('db').createOrder).not.toBeCalled()
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'Missing required fields' })
    })

    // test<TestContext>("Rejects order creation with existing id", async ({ supertestInstance, app }) => {
    //     app.get('db').createOrder.mockRejectedValueOnce(new CError('An order with this ID already exists', 409))

    //     const response = await supertestInstance.post("/checkout/pay")
    //         .set({ 'Authorization': "Bearer x" })
    //         .attach('league', path.resolve(__dirname + "/test.xlsx"))
    //         .attach('player', path.resolve(__dirname + "/test.xlsx"))

    //     expect(app.get("pc").createPayment).toBeCalled()
    //     expect(app.get('db').createOrder).toBeCalledWith(
    //         Buffer.from(fs.readFileSync(path.resolve(__dirname + "/test.xlsx"))),
    //         Buffer.from(fs.readFileSync(path.resolve(__dirname + "/test.xlsx"))),
    //         10,
    //         "1"
    //     )
    //     expect(response.status).toBe(409)
    //     expect(response.body).toEqual({ message: 'An order with this ID already exists' })
    // })

    // TODO: Test other methods in PaymentController
})

