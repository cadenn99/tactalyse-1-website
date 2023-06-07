import { vi, describe, test, expect, beforeEach, Mock } from 'vitest'
import { DatabaseService } from '../DatabaseService'
import mongoose from 'mongoose'
import { TestContext } from '@root/typings';
import config from '@root/config';
import bcrypt from 'bcryptjs'
import { CError } from '@src/utils';

vi.mock('mongoose')
vi.mock('bcryptjs')

beforeEach<TestContext>((context) => {
    context.db = new DatabaseService()
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

    // test<TestContext>("Does the database reject user registration with existing email", async ({ db }) => {
    //     (mongoose.model("User").create as Mock).mockRejectedValueOnce(new CError("Email is already taken", 409))

    //     await db?.createUser(config.test.VALID_CREDENTIALS.email, config.test.VALID_CREDENTIALS.password)

    //     console.log(x)
    // })
})

describe("Test for database service class user login", () => {
    test<TestContext>("Can the database retrieve an existing user with valid credentials", async ({ db }) => {
        await db?.loginUser(config.test.VALID_CREDENTIALS.email, config.test.VALID_CREDENTIALS.password)

        expect(mongoose.model, 'findOne').toBeCalled()
    })
})