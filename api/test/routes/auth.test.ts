import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../../server';

const appInstance = supertest(app)

describe("/auth/*", () => {
    test('Can a user register a new account', async () => {
        const response = await appInstance.post('/auth/register')
            .send({
                email: 'example@gmail.com',
                password: '123456578'
            })

        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'Registered' })
    })

    test('Does the server throw an error with invalid password', async () => {
        const response = await appInstance.post('/auth/register')
            .send({
                email: 'example@gmail.com',
                password: '1234567'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password" })
    })

    test('Does the server throw an error with invalid email', async () => {
        const response = await appInstance.post('/auth/register')
            .send({
                email: 'examplegmail.com',
                password: '1234567'
            })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: "Invalid email or password" })
    })
})