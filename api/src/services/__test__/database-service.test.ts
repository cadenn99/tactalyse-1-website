import { vi, describe, test, expect, beforeEach } from 'vitest'
import { DatabaseService } from '../DatabaseService'
import mongoose from 'mongoose'
import { TestContext } from '@root/typings';

vi.mock('mongoose')

beforeEach<TestContext>((context) => {
    context.db = new DatabaseService()
})

describe('Tests for database service class using mongoDB', () => {
    test<TestContext>('Can the database be connected', async ({ db }) => {

        db!.connect()

        expect(mongoose.connect).toBeCalled()
    })
})