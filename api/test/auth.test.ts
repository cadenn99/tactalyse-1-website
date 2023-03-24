import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '@root/app';
import { MongoDatabase, MolliePayment, NodemailerMailer } from '@src/services';
import { TestContext } from '@root/typings';
import { CError } from '@src/utils';

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

    MolliePayment.prototype.createPayment = vi.fn()

    return { MolliePayment }
})

vi.mock('@src/services/mailer.service', () => {
    const NodeMailer = vi.fn()

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

describe("Tests for user registration", () => {
    test<TestContext>('Can register a new account', async ({ supertestInstance, app }) => {
        app.get('db').createUser.mockResolvedValueOnce({ user: 'Some fake user' })

        const response = await supertestInstance.post('/auth/register')
            .send({
                email: 'examp464le@gmail.com',
                password: '1234565789'
            })

        expect(app.get('db').createUser).toBeCalledTimes(1)
        expect(app.get('db').createUser).toBeCalledWith('examp464le@gmail.com', '1234565789')
        expect(response.body).toHaveProperty('token')
        expect(response.status).toBe(200)
    })

    test<TestContext>('Rejects registration with existing email', async ({ supertestInstance, app }) => {
        app.get('db').createUser.mockRejectedValueOnce(new CError('Email is already taken', 409))

        const response = await supertestInstance.post('/auth/register')
            .send({
                email: 'examp464le@gmail.com',
                password: '1234565789'
            })
        expect(app.get('db').createUser).toBeCalledTimes(1)
        expect(app.get('db').createUser).toBeCalledWith('examp464le@gmail.com', '1234565789')
        expect(response.status).toBe(409)
        expect(response.body).toEqual({ message: 'Email is already taken' })
    })

    test<TestContext>('Rejects registration with invalid password format', async ({ supertestInstance }) => {
        const response = await supertestInstance.post('/auth/register')
            .send({
                email: 'example@gmail.com',
                password: '1234567'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })

    test<TestContext>('Rejects registration with invalid email format', async ({ supertestInstance }) => {
        const response = await supertestInstance.post('/auth/register')
            .send({
                email: 'examplegmail.com',
                password: '12345678'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })
})

describe("Tests for user login", () => {
    test<TestContext>("Can login with valid credentials", async ({ supertestInstance, app }) => {
        app.get('db').loginUser.mockResolvedValueOnce({ user: 'Some fake user' })

        const response = await supertestInstance.post('/auth/login')
            .send({
                email: 'examp464le@gmail.com',
                password: '1234565789'
            })

        expect(app.get('db').loginUser).toBeCalledTimes(1)
        expect(app.get('db').loginUser).toBeCalledWith('examp464le@gmail.com', '1234565789')
        expect(response.body).toHaveProperty('token')
        expect(response.status).toBe(200)
    })

    test<TestContext>("Rejects login with invalid credentials", async ({ supertestInstance, app }) => {
        app.get('db').loginUser.mockRejectedValueOnce(new CError('User doesn\'t exist or password incorrect', 401))

        const response = await supertestInstance.post('/auth/login')
            .send({
                email: 'examp464le@gmail.com',
                password: '1234565789'
            })

        expect(app.get('db').loginUser).toBeCalledTimes(1)
        expect(app.get('db').loginUser).toBeCalledWith('examp464le@gmail.com', '1234565789')
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'User doesn\'t exist or password incorrect' })
    })

    test<TestContext>("Rejects login with invalid password format", async ({ supertestInstance }) => {
        const response = await supertestInstance.post('/auth/login')
            .send({
                email: 'example@gmail.com',
                password: '1234567'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })

    test<TestContext>('Rejects login with invalid email format', async ({ supertestInstance }) => {
        const response = await supertestInstance.post('/auth/login')
            .send({
                email: 'examplegmail.com',
                password: '12345678'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })
})

// describe('Auth middleware test', () => {
//     // TODO: Figure out how to test the middleware
// })


