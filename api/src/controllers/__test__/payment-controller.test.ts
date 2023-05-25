import { describe, expect, test, vi, beforeEach, afterEach, Mock, Test } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '@root/app';
import { DatabaseService, StripePaymentService, MailerService } from '@src/services/index';
import { TestContext } from '@root/typings';
import config from '@root/config';
import jsonwebtoken from 'jsonwebtoken';
import { authMiddleware } from '@src/middleware';
import { NextFunction, Response } from 'express';

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

        authMiddleware.mockImplementationOnce((req: Request, res: Response, next: NextFunction) => res.status(401).json({
            message: 'Unauthorized - Missing or invalid token'
        }))

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

    test<TestContext>("Order can be completed by hook", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .post('/checkout/completeOrder')
            .set({ 'Authorization': "Bearer x" })

        expect(app!.get('pc').webhookHandler).toBeCalled()
        expect(app!.get('db').completePayment).toBeCalled()
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'Payment completed, your report will be sent within 24 hours' })
    })
})

describe("Tests for report generation with completed order", () => {

    beforeEach<TestContext>((context) => {
        authMiddleware.mockImplementation((req: Request, res: Response, next: NextFunction) => {
            res.locals.decoded = {
                email: 'test@test.com',
                isEmployee: true,
                _id: 'Document Id'
            }
            next()
        })

    })
    test<TestContext>("Completed orders can be fulfilled", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .post('/checkout/fulfillOrder')
            .set({ 'Authorization': "Bearer x" })
            .attach('league', __dirname + '/test.xlsx')
            .attach('player', __dirname + '/test.xlsx')
            .field('id', "1")

        expect(app!.get('db').findOrder).toBeCalled()
        expect(app!.get('db').findUserByOrder).toBeCalled()
        expect(app!.get('db').completeOrder).toBeCalled()
        expect(app!.get('nm').sendEmail).toBeCalled()
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'Emailed report!' })

    })

    test<TestContext>("Rejects order fulfillment request without player file", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .post('/checkout/fulfillOrder')
            .set({ 'Authorization': "Bearer x" })
            .attach('league', __dirname + '/test.xlsx')
            .field('id', "1")

        expect(app!.get('db').findOrder).not.toBeCalled()
        expect(app!.get('db').findUserByOrder).not.toBeCalled()
        expect(app!.get('db').completeOrder).not.toBeCalled()
        expect(app!.get('nm').sendEmail).not.toBeCalled()
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'Missing file' })
    })

    test<TestContext>("Rejects order fulfillment request without league file", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .post('/checkout/fulfillOrder')
            .set({ 'Authorization': "Bearer x" })
            .attach('player', __dirname + '/test.xlsx')
            .field('id', "1")

        expect(app!.get('db').findOrder).not.toBeCalled()
        expect(app!.get('db').findUserByOrder).not.toBeCalled()
        expect(app!.get('db').completeOrder).not.toBeCalled()
        expect(app!.get('nm').sendEmail).not.toBeCalled()
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'Missing file' })
    })

    test<TestContext>("Rejects order fulfillment request without order id", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .post('/checkout/fulfillOrder')
            .set({ 'Authorization': "Bearer x" })
            .attach('player', __dirname + '/test.xlsx')
            .attach('league', __dirname + '/test.xlsx')

        expect(app!.get('db').findOrder).not.toBeCalled()
        expect(app!.get('db').findUserByOrder).not.toBeCalled()
        expect(app!.get('db').completeOrder).not.toBeCalled()
        expect(app!.get('nm').sendEmail).not.toBeCalled()
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Missing required field(s)" })
    })

    test<TestContext>("Rejects order fulfillment request of unauthorized users", async ({ supertestInstance, app }) => {

        authMiddleware.mockImplementationOnce((req: Request, res: Response, next: NextFunction) => {
            res.locals.decoded = {
                email: 'test@test.com',
                isEmployee: false,
                _id: 'Document Id'
            }
            next()
        })

        const response = await supertestInstance
            .post('/checkout/fulfillOrder')
            .set({ 'Authorization': "Bearer x" })
            .attach('player', __dirname + '/test.xlsx')
            .attach('league', __dirname + '/test.xlsx')
            .field('id', "1")

        expect(app!.get('db').findOrder).not.toBeCalled()
        expect(app!.get('db').findUserByOrder).not.toBeCalled()
        expect(app!.get('db').completeOrder).not.toBeCalled()
        expect(app!.get('nm').sendEmail).not.toBeCalled()
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'Missing required authorization' })
    })
})

describe("Tests for report generation without order", () => {

    beforeEach<TestContext>((context) => {
        authMiddleware.mockImplementation((req: Request, res: Response, next: NextFunction) => {
            res.locals.decoded = {
                email: 'test@test.com',
                isEmployee: true,
                _id: 'Document Id'
            }
            next()
        })
    })

    test<TestContext>("Employees can generate reports", async ({ supertestInstance, app }) => {

        (jsonwebtoken.decode as Mock).mockImplementationOnce(() => ({
            email: 'test@test.com',
            isEmployee: true,
            _id: 'Document Id'
        }))

        const response = await supertestInstance
            .post('/checkout/noPayment')
            .set({ 'Authorization': "Bearer x" })
            .attach('league', __dirname + '/test.xlsx')
            .attach('player', __dirname + '/test.xlsx')
            .field("playerName", "test")
            .field("email", "test@test.com")

        expect(app!.get('nm').sendEmail).toBeCalled()
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: "Report sent" })
    })

    test<TestContext>("Rejects report generation request with missing email", async ({ supertestInstance, app }) => {

        (jsonwebtoken.decode as Mock).mockImplementationOnce(() => ({
            email: 'test@test.com',
            isEmployee: true,
            _id: 'Document Id'
        }))

        const response = await supertestInstance
            .post('/checkout/noPayment')
            .set({ 'Authorization': "Bearer x" })
            .attach('league', __dirname + '/test.xlsx')
            .attach('player', __dirname + '/test.xlsx')
            .field("playerName", "test")

        expect(app!.get('nm').sendEmail).not.toBeCalled()
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Missing required field(s)" })
    })

    test<TestContext>("Rejects report generation request with missing playername", async ({ supertestInstance, app }) => {

        (jsonwebtoken.decode as Mock).mockImplementationOnce(() => ({
            email: 'test@test.com',
            isEmployee: true,
            _id: 'Document Id'
        }))

        const response = await supertestInstance
            .post('/checkout/noPayment')
            .set({ 'Authorization': "Bearer x" })
            .attach('league', __dirname + '/test.xlsx')
            .attach('player', __dirname + '/test.xlsx')
            .field("email", "test@test.com")

        expect(app!.get('nm').sendEmail).not.toBeCalled()
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Missing required field(s)" })

    })

    test<TestContext>("Rejects report generation request with missing files", async ({ supertestInstance, app }) => {

        (jsonwebtoken.decode as Mock).mockImplementationOnce(() => ({
            email: 'test@test.com',
            isEmployee: true,
            _id: 'Document Id'
        }))

        const response = await supertestInstance
            .post('/checkout/noPayment')
            .set({ 'Authorization': "Bearer x" })
            .field("playerName", "test")
            .field("email", "test@test.com")

        expect(app!.get('nm').sendEmail).not.toBeCalled()
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Missing file" })

    })

    test<TestContext>("Rejects report generation request with invalid authorization", async ({ supertestInstance, app }) => {

        authMiddleware.mockImplementationOnce((req: Request, res: Response, next: NextFunction) => {
            res.locals.decoded = {
                email: 'test@test.com',
                isEmployee: false,
                _id: 'Document Id'
            }
            next()
        })

        const response = await supertestInstance
            .post('/checkout/noPayment')
            .set({ 'Authorization': "Bearer x" })
            .field("playerName", "test")
            .field("email", "test@test.com")
            .attach('league', __dirname + '/test.xlsx')
            .attach('player', __dirname + '/test.xlsx')

        expect(app!.get('nm').sendEmail).not.toBeCalled()
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: "Missing required authorization" })


    })
})


