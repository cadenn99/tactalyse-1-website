import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '@root/app';
import { DatabaseService, MailerService, StripePaymentService } from '@src/services';
import { TestContext } from '@root/typings';
import { CError } from '@src/utils';
import config from '@root/config';

vi.mock('@src/services/DatabaseService')
vi.mock('@src/services/PaymentService')
vi.mock('@src/services/MailerService')

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

describe("Tests for user registration", () => {

    test<TestContext>('Can register a new account', async ({ supertestInstance, app }) => {

        const response = await supertestInstance.post('/auth/register')
            .send(config.test.VALID_CREDENTIALS)

        expect(app!.get('db').createUser).toBeCalledWith(
            config.test.VALID_CREDENTIALS.email,
            config.test.VALID_CREDENTIALS.password
        )
        expect(response.body).toHaveProperty('token')
        expect(response.status).toBe(200)
    })

    test<TestContext>('Rejects registration with existing email', async ({ supertestInstance, app }) => {
        app!.get('db').createUser.mockRejectedValueOnce(new CError('Email is already taken', 409))

        const response = await supertestInstance.post('/auth/register')
            .send(config.test.VALID_CREDENTIALS)

        expect(app!.get('db').createUser).toBeCalledWith(
            config.test.VALID_CREDENTIALS.email,
            config.test.VALID_CREDENTIALS.password
        )
        expect(response.status).toBe(409)
        expect(response.body).toEqual({ message: 'Email is already taken' })
    })

    test<TestContext>('Rejects registration with invalid password format', async ({ supertestInstance }) => {
        const response = await supertestInstance.post('/auth/register')
            .send(config.test.INVALID_PASSWORD)

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })

    test<TestContext>('Rejects registration with invalid email format', async ({ supertestInstance }) => {
        const response = await supertestInstance.post('/auth/register')
            .send(config.test.INVALID_EMAIL)

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })
})

describe("Tests for user login", () => {
    test<TestContext>("Can login with valid credentials", async ({ supertestInstance, app }) => {
        app!.get('db').loginUser.mockResolvedValueOnce({ user: 'Some fake user' })

        const response = await supertestInstance.post('/auth/login')
            .send(config.test.VALID_CREDENTIALS)

        expect(app!.get('db').loginUser).toBeCalledWith(
            config.test.VALID_CREDENTIALS.email,
            config.test.VALID_CREDENTIALS.password
        )
        expect(response.body).toHaveProperty('token')
        expect(response.status).toBe(200)
    })

    test<TestContext>("Rejects login with invalid credentials", async ({ supertestInstance, app }) => {
        app!.get('db').loginUser.mockRejectedValueOnce(new CError('User doesn\'t exist or password incorrect', 401))

        const response = await supertestInstance.post('/auth/login')
            .send(config.test.VALID_CREDENTIALS)

        expect(app!.get('db').loginUser).toBeCalledWith(
            config.test.VALID_CREDENTIALS.email,
            config.test.VALID_CREDENTIALS.password
        )
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'User doesn\'t exist or password incorrect' })
    })

    test<TestContext>("Rejects login with invalid password format", async ({ supertestInstance }) => {
        const response = await supertestInstance.post('/auth/login')
            .send(config.test.INVALID_PASSWORD)

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })

    test<TestContext>('Rejects login with invalid email format', async ({ supertestInstance }) => {
        const response = await supertestInstance.post('/auth/login')
            .send(config.test.INVALID_EMAIL)

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })
})


