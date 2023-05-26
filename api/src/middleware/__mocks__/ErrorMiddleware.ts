import { Request, Response, NextFunction } from "express"
import { vi } from "vitest"

export const errorMiddleware = vi.fn((req: Request, res: Response, next: NextFunction) => next())