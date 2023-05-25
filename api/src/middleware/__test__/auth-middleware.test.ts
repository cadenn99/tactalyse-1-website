import { vi, describe, beforeEach, afterEach, test, expect, Mock } from 'vitest'
import { Request, Response, NextFunction } from 'express'
import { TestContext } from '@root/typings'
import { authMiddleware } from '@src/middleware'
import jsonwebtoken from 'jsonwebtoken';

vi.mock('jsonwebtoken')

beforeEach<TestContext>((context) => {
    context.mockReq = {}
    context.mockRes = {
        status: vi.fn(() => context.mockRes),
        json: vi.fn(),
        locals: {}
    } as any
    context.mockNext = vi.fn()
})

afterEach(() => {
    vi.clearAllMocks()
})

describe('Tests for auth middleware', () => {
    test<TestContext>('Requests with missing authorization header get rejected', async ({ mockReq, mockRes, mockNext }) => {

        await authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as unknown as NextFunction)

        expect(jsonwebtoken.verify).not.toBeCalled()
        expect(mockRes?.status).toBeCalledWith(401)
        expect(mockRes?.json).toBeCalledWith({
            message: 'Unauthorized - Missing or invalid token'
        })

    })

    test<TestContext>("Request with invalid authorization header gets rejected", async ({ mockReq, mockRes, mockNext }) => {
        (jsonwebtoken.verify as Mock).mockRejectedValueOnce(new Error())

        mockReq = {
            headers: {
                authorization: "Tes Test"
            }
        } as any

        await authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as unknown as NextFunction)

        expect(mockRes?.status).toBeCalledWith(401)
        expect(mockRes?.json).toBeCalledWith({
            message: 'Unauthorized - Missing or invalid token'
        })

    })

    test<TestContext>("Request with valid authorization header gets passed on", async ({ mockReq, mockRes, mockNext }) => {

        // jsonwebtoken.decode.mockImplementationOnce(() =)
        mockReq = {
            headers: {
                authorization: "Test valid"
            }
        } as any

        await authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as unknown as NextFunction)

        expect(mockNext).toBeCalled()
    })
})