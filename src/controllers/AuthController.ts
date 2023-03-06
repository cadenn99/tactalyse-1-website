import { Request, Router, Response } from 'express'
import { authSchema } from '../models';

export class AuthController {
    constructor() {

    }

    public registerUser(req: Request, res: Response) {
        const requestBody = req.body

        if (!authSchema.safeParse(requestBody).success)
            return res.status(404).json({ message: 'Invalid email or password' })

        // Register user
        return res.status(200).json({ message: 'Registered' })
    }

    public loginUser(req: Request, res: Response) {

    }
}