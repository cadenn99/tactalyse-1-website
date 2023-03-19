import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import { createExpressApp } from '@root/app';
import { MongoDatabase } from '@src/database/mongoDatabase';
import { CError } from '@src/utils';
import { TestContext } from '@root/typings';
import { createMollieClient } from '@mollie/api-client';
import path from 'path';
import fs from 'fs'

vi.mock('@src/database/mongoDatabase', () => {
    const MongoDatabase = vi.fn()

    MongoDatabase.prototype.createUser = vi.fn()
    MongoDatabase.prototype.connect = vi.fn()
    MongoDatabase.prototype.loginUser = vi.fn()
    MongoDatabase.prototype.createOrder = vi.fn()

    return { MongoDatabase }
})

vi.mock('@mollie/api-client', () => {
    const createMollieClient = vi.fn(() => ({
        payments: {
            create: vi.fn(() => ({
                id: 10,
                getCheckoutUrl: vi.fn(() => 'test')
            }))
        }
    }))

    return { createMollieClient }
})

beforeEach<TestContext>((context) => {
    context.app = createExpressApp(new MongoDatabase(), createMollieClient({ apiKey: 'test_' }))
    context.supertestInstance = supertest(context.app)
})

afterEach(() => {
    vi.clearAllMocks();
})

describe("Tests for order creation", () => {
    test<TestContext>("Can create a new order", async ({ supertestInstance, app }) => {

        const response = await supertestInstance.post('/checkout/pay')
            .attach('file', path.resolve(__dirname + "/test.xlsx"))

        expect(app.get('mollie').payments.create).toBeCalledTimes(1)
        expect(app.get('db').createOrder).toBeCalledTimes(1)
        expect(app.get('db').createOrder).toBeCalledWith(Buffer.from(fs.readFileSync(path.resolve(__dirname + "/test.xlsx"))), 10)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ checkOutUrl: 'test' })
    })

    test<TestContext>("Rejects order creation without file", async ({ supertestInstance, app }) => {

        const response = await supertestInstance.post('/checkout/pay')

        expect(app.get('mollie').payments.create).toBeCalledTimes(0)
        expect(app.get('db').createOrder).toBeCalledTimes(0)
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'Missing file' })
    })
})

