import { Request, Response, NextFunction } from "express"
import { vi } from "vitest"

export const authMiddleware = vi.fn((req: Request, res: Response, next: NextFunction) => next())