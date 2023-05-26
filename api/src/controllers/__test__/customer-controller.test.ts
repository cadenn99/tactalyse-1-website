import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '@root/app';
import { DatabaseService, StripePaymentService, MailerService } from '@src/services/index';
import { TestContext } from '@root/typings';
import config from '@root/config';
import { authMiddleware } from '@src/middleware';
import { NextFunction, Response, Request } from 'express';

vi.mock('@src/services/DatabaseService')
vi.mock('@src/services/PaymentService')
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

    authMiddleware.mockImplementation((req: Request, res: Response, next: NextFunction) => {
        res.locals.decoded = {
            email: 'test@test.com',
            isEmployee: false,
            _id: 'Document Id'
        }
        next()
    })
})

afterEach(() => {
    vi.clearAllMocks();
})

describe("Tests for customer controller", () => {
    test<TestContext>("A customer can retrieve all orders", async ({ supertestInstance, app }) => {

        const response = await supertestInstance
            .get('/content/order-history')
            .set({ 'Authorization': "Bearer x" })

        expect(app!.get('db').findUserOrderHistory).toBeCalled()
        expect(response.status).toBe(200)
    })

    test<TestContext>("Rejects request with missing token", async ({ supertestInstance, app }) => {
        authMiddleware.mockImplementationOnce((req: Request, res: Response, next: NextFunction) => {
            res.status(401).json({ message: 'Unauthorized - Missing or invalid token' })
        })

        const response = await supertestInstance
            .get('/content/order-history')

        expect(app!.get('db').findUserOrderHistory).not.toBeCalled()
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'Unauthorized - Missing or invalid token' })
    })
})

