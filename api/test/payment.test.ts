import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '@root/app';
import { MongoDatabase, MolliePayment, NodemailerMailer } from '@src/services';
import { CError } from '@src/utils';
import { TestContext } from '@root/typings';
import path from 'path';
import fs from 'fs'

vi.mock('@src/services/database.service', () => {
    const MongoDatabase = vi.fn()

    MongoDatabase.prototype.createUser = vi.fn()
    MongoDatabase.prototype.connect = vi.fn()
    MongoDatabase.prototype.loginUser = vi.fn()
    MongoDatabase.prototype.createOrder = vi.fn()
    MongoDatabase.prototype.findOrder = vi.fn()

    return { MongoDatabase }
})

vi.mock('@src/services/payment.service', () => {
    const MolliePayment = vi.fn()

    MolliePayment.prototype.createPayment = vi.fn(() => ({
        id: 10,
        checkOutUrl: 'test'
    }))

    MolliePayment.prototype.getPayment = vi.fn(() => ({
        id: 10
    }))

    return { MolliePayment }
})

vi.mock('@src/services/mailer.service', () => {
    const NodeMailer = vi.fn()

    NodeMailer.prototype.send = vi.fn(() => {

    })

    return { NodeMailer }
})

beforeEach<TestContext>((context) => {
    context.app = createExpressApp(
        new MongoDatabase(),
        new MolliePayment(""),
        new NodemailerMailer({
            host: '',
            port: 0,
            user: '',
            pass: '',
            email: ''
        })
    )
    context.supertestInstance = supertest(context.app)
})

afterEach(() => {
    vi.clearAllMocks();
})

describe("Tests for order creation", () => {
    test<TestContext>("Can create a new order", async ({ supertestInstance, app }) => {

        const response = await supertestInstance.post('/checkout/pay')
            .attach('file', path.resolve(__dirname + "/test.xlsx"))

        expect(app.get('pc').createPayment).toBeCalledTimes(1)
        expect(app.get('db').createOrder).toBeCalledTimes(1)
        expect(app.get('db').createOrder).toBeCalledWith(Buffer.from(fs.readFileSync(path.resolve(__dirname + "/test.xlsx"))), 10)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ checkOutUrl: 'test' })
    })

    test<TestContext>("Rejects order creation without file", async ({ supertestInstance, app }) => {

        const response = await supertestInstance.post('/checkout/pay')

        expect(app.get('pc').createPayment).toBeCalledTimes(0)
        expect(app.get('db').createOrder).toBeCalledTimes(0)
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'Missing file' })
    })

    test<TestContext>("Rejects order creation with existing id", async ({ supertestInstance, app }) => {
        app.get('db').createOrder.mockRejectedValueOnce(new CError('An order with this ID already exists', 409))

        const response = await supertestInstance.post("/checkout/pay")
            .attach('file', path.resolve(__dirname + "/test.xlsx"))


        expect(app.get("pc").createPayment).toBeCalledTimes(1)
        expect(app.get('db').createOrder).toBeCalledTimes(1)
        expect(app.get('db').createOrder).toBeCalledWith(Buffer.from(fs.readFileSync(path.resolve(__dirname + "/test.xlsx"))), 10)
        expect(response.status).toBe(409)
        expect(response.body).toEqual({ message: 'An order with this ID already exists' })
    })
})

