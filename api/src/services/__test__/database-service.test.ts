import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest'
import { DatabaseService } from '../DatabaseService'
import mongoose from 'mongoose'
import { TestContext } from '@root/typings';
import config from '@root/config';
import { CError } from '@src/utils';
import bcryptjs from '@root/__mocks__/bcryptjs';

vi.mock('mongoose')
vi.mock('bcryptjs')

beforeEach<TestContext>((context) => {
    context.db = new DatabaseService()
})

afterEach(() => {
    vi.clearAllMocks();
})

describe('Tests for database service class using mongoDB', () => {
    test<TestContext>('Can the database be connected', async ({ db }) => {

        db!.connect()

        expect(mongoose.connect).toBeCalled()
    })
})

describe("Tests for database service class user creation", () => {
    test<TestContext>("Can the database create a new user", async ({ db }) => {
        await db?.createUser(config.test.VALID_CREDENTIALS.email, config.test.VALID_CREDENTIALS.password)

        expect(mongoose.model, 'create').toBeCalled()
    })

    test<TestContext>("Does the database remove the users hash when returning it", async ({ db }) => {
        const returnValue = await db?.createUser(config.test.VALID_CREDENTIALS.email, config.test.VALID_CREDENTIALS.password)

        expect(returnValue).toEqual({ email: config.test.VALID_CREDENTIALS.email })
    })

    test<TestContext>("Does the database reject user registration with existing email", async ({ db }) => {
        vi.spyOn(mongoose.model('User'), 'create').mockRejectedValueOnce(new CError("", 11000))

        try {
            await db?.createUser(config.test.VALID_CREDENTIALS.email, config.test.VALID_CREDENTIALS.password)
        } catch (err: any) {
            expect(err.code).toBe(409)
            expect(err.message).toBe("Email is already taken")
        }

    })
})

describe("Test for database service class user login", () => {
    test<TestContext>("Can the database retrieve an existing user with valid credentials", async ({ db }) => {
        await db?.loginUser(config.test.VALID_CREDENTIALS.email, config.test.VALID_CREDENTIALS.password)

        expect(mongoose.model, 'findOne').toBeCalled()
    })

    test<TestContext>("Does the database reject user retrieval with invalid email", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({ findOne: vi.fn().mockReturnValueOnce(null) }))

        try {
            await db?.loginUser(config.test.VALID_CREDENTIALS.email, config.test.VALID_CREDENTIALS.password)
        } catch (err: any) {
            expect(err.code).toBe(401)
            expect(err.message).toBe('User doesn\'t exist or password incorrect')
        }
    })

    test<TestContext>("Does the database reject user retrieval with invalid password", async ({ db }) => {
        bcryptjs.compare.mockReturnValueOnce(false)

        try {
            await db?.loginUser(config.test.VALID_CREDENTIALS.email, config.test.VALID_CREDENTIALS.password)
        } catch (err: any) {
            expect(err.code).toBe(401)
            expect(err.message).toBe('User doesn\'t exist or password incorrect')
        }
    })
})

describe("Tests for database service class findUserByOrder", () => {
    test<TestContext>("Can a user be found given an orderid", async ({ db }) => {
        const user = await db?.findUserByOrder("")

        expect(user).not.toBe(null)
    })

    test<TestContext>("Does the database reject user retrieval with invalid orderid", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({ findOne: vi.fn().mockReturnValueOnce(null) }))

        try {
            await db?.findUserByOrder("")

        } catch (err: any) {
            expect(err.code).toBe(404)
            expect(err.message).toBe('No user with this order id')
        }
    })
})

describe("Tests for database service class createOrder", () => {
    test<TestContext>("Can a new order be created", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({ create: vi.fn().mockReturnValueOnce({ _id: "x" }) }))

        await db?.createOrder()

        expect(mongoose.model, 'create').toBeCalled()
        expect(mongoose.model, 'updateOne').toBeCalled()
    })

    test<TestContext>("Does the database reject order creation with existing id", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({ create: vi.fn().mockRejectedValueOnce(new CError("", 11000)) }))

        try {
            await db?.createOrder()

        } catch (err: any) {
            expect(err.code).toBe(409)
            expect(err.message).toBe('An order with this ID already exists')
        }
    })
})

describe("Tests for database service class findOrder", () => {
    test<TestContext>("Can an existing order be found from the database", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({
            findOne: vi.fn(() => ({
                _id: "",
                toJSON: vi.fn()
            }))
        }))

        await db?.findOrder()

        expect(mongoose.model, 'findOne').toBeCalled()
    })

    test<TestContext>("Does the database reject order search if order doesnt exist", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({
            findOne: vi.fn().mockReturnValue(null)
        }))

        try {
            await db?.findOrder()

        } catch (err: any) {
            expect(err.code).toBe(409)
            expect(err.message).toBe('An order with this ID doesn\'t exists')
        }
    })
})

describe("Tests for database service class completePayment", () => {
    test<TestContext>("Can an existing order's payment can be completed", async ({ db }) => {
        await db?.completePayment()

        expect(mongoose.model, 'updateOne').toBeCalled()
    })
})

describe("Tests for database service class findAllUnfulfilledOrders", () => {
    test<TestContext>("Can all unfilfilled orders be retrieved", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({
            find: vi.fn()
        }))

        await db?.findAllUnfulfilledOrders()

        expect(mongoose.model, 'find').toBeCalled()
    })
})

describe("Tests for database service class completeOrder", () => {
    test<TestContext>("Can an order be completed", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({
            updateOne: vi.fn()
        }))

        await db?.completeOrder()

        expect(mongoose.model, 'updateOne').toBeCalled()
    })

    test<TestContext>("Can an order be completed", async ({ db }) => {
        vi.spyOn(mongoose, 'model').mockImplementationOnce(() => ({
            updateOne: vi.fn().mockRejectedValueOnce(new CError("", 11000))
        }))

        try {
            await db?.completeOrder()

        } catch (err: any) {
            expect(err?.code).toBe(409)
            expect(err?.message).toBe('An order with this ID doesn\'t exists')
        }

    })
})



