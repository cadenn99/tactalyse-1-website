import { describe, expect, it, test, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '../../app';
import { MongoDatabase } from '../../src/database/mongoDatabase';
import { TestContextAuth } from '../../typings';
import { CError } from '../../src/utils/CError';

vi.mock('../../src/database/mongoDatabase', () => {
    const MongoDatabase = vi.fn()
    MongoDatabase.prototype.createUser = vi.fn()
    MongoDatabase.prototype.connect = vi.fn()
    MongoDatabase.prototype.loginUser = vi.fn()

    return { MongoDatabase }
})

beforeEach<TestContextAuth>((context) => {
    context.app = createExpressApp(new MongoDatabase())
    context.supertestInstance = supertest(context.app)
})

afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
})

describe("Test for registering a new user", () => {
    test<TestContextAuth>('Can a user register a new account', async ({ supertestInstance, app }) => {
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

    test<TestContextAuth>('Does the server throw an error when registering with taken email', async ({ supertestInstance, app }) => {
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

    test<TestContextAuth>('Does the server throw an error with invalid password length', async ({ supertestInstance, app }) => {
        const response = await supertestInstance.post('/auth/register')
            .send({
                email: 'example@gmail.com',
                password: '1234567'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })

    test<TestContextAuth>('Does the server throw an error with invalid email format', async ({ supertestInstance, app }) => {
        const response = await supertestInstance.post('/auth/register')
            .send({
                email: 'examplegmail.com',
                password: '12345678'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })
})

describe("Tests for logging in a new user", () => {
    test<TestContextAuth>("Can a user login", async ({ supertestInstance, app }) => {
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

    test<TestContextAuth>("Does the server throw an error with invalid credentials", async ({ supertestInstance, app }) => {
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

    test<TestContextAuth>("Does the server throw an error with invalid password length", async ({ supertestInstance, app }) => {
        const response = await supertestInstance.post('/auth/login')
            .send({
                email: 'example@gmail.com',
                password: '1234567'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })

    test<TestContextAuth>('Does the server throw an error with invalid email format', async ({ supertestInstance, app }) => {
        const response = await supertestInstance.post('/auth/login')
            .send({
                email: 'examplegmail.com',
                password: '12345678'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password format" })
    })
})


