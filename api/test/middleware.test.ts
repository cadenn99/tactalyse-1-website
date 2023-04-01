import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest'
import { Request, Response, NextFunction } from 'express'
import { TestContext } from '@root/typings'
import { authMiddleware } from '@src/middleware/AuthMiddleware'
import jwt from 'jsonwebtoken'
import { CError } from '@src/utils/CError'

vi.mock('jsonwebtoken')

beforeEach<TestContext>((context) => {
    context.mockReq = {}
    context.mockRes = {
        status: vi.fn(() => context.mockRes),
        json: vi.fn()
    } as any
    context.mockNext = vi.fn()
})

afterEach(() => {
    vi.clearAllMocks()
})

describe('Tests for auth middleware', () => {
    test<TestContext>('Requests with missing authorization header get rejected', ({ mockReq, mockRes, mockNext }) => {

        authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext)

        expect(jwt.verify).not.toBeCalled()
        expect(mockRes?.status).toBeCalledWith(401)
        expect(mockRes?.json).toBeCalledWith({
            message: 'Unauthorized - Missing or invalid token'
        })

    })

    // test<TestContext>("Request with invalid authorization header gets rejected", ({ mockReq, mockRes, mockNext }) => {
    //     jwt.verify.mockRejectedValueOnce(new Error())

    //     mockReq = {
    //         headers: {
    //             "authorization": "Test Test"
    //         }
    //     }

    //     authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext)
    //     console.log(jwt.verify)
    //     expect(mockRes?.status).toBeCalledWith(401)
    //     expect(mockRes?.json).toBeCalledWith({
    //         message: 'Unauthorized - Missing or invalid token'
    //     })

    // })

    // test<TestContext>("Request with valid authorization header gets passed on", ({ mockReq, mockRes, mockNext }) => {
    //     mockReq = {
    //         headers: {
    //             "authorization": jwt
    //         }
    //     }
    // })
})