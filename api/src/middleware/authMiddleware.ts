import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

/**
 * Middleware function to protect routes
 * 
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (token) {
            if (jwt.verify(token, process.env.JWT_SECRET as string))
                return next()
        }

        throw new Error()

    } catch (err: any) {
        return res.status(401)
            .json({
                message: 'Unauthorized - Missing or invalid token'
            })
    }
}