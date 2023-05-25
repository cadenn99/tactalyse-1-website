import { Request, Response, NextFunction } from "express"
import { vi } from "vitest"

export const authMiddleware = vi.fn((req: Request, res: Response, next: NextFunction) => {
    res.locals.decoded = {
        email: 'test@test.com',
        isEmployee: false,
        _id: 'Document Id'
    }
    next()
})