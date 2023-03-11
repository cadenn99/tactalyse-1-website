import { Request, Response } from "express";
import { authSchema } from "@src/models/api-models";
import { CError } from "@src/utils";
import jwt from 'jsonwebtoken'

export class AuthController {
    constructor() { }

    /**
     * Controller function for registering a new user
     * 
     * @param req Request object
     * @param res Response object 
     */
    public async registerUser(req: Request, res: Response) {
        try {
            if (!authSchema.safeParse(req.body).success)
                return res.status(404).json({
                    message: "Invalid email or password format",
                });

            const user = await req.app.get('db')
                .createUser(req.body.email, req.body.password)

            const token = jwt.sign(user, process.env.JWT_SECRET as string)

            return res.status(200).json({
                message: "Registered successfully",
                token
            });
        } catch (err) {
            if (err instanceof CError)
                return res.status(err.code).json({
                    message: err.message
                })
            return res.status(500).json({ message: 'Something went wrong' })
        }
    }

    /**
     * Controller method for logging a user in
     * 
     * @param req Request object
     * @param res Response object
     */
    public async loginUser(req: Request, res: Response) {
        try {
            if (!authSchema.safeParse(req.body).success) {
                return res.status(404).json({
                    message: 'Invalid email or password format'
                })
            }

            const user = await req.app.get('db')
                .loginUser(req.body.email, req.body.password)

            const token = jwt.sign(user, process.env.JWT_SECRET as string)

            return res.status(200).json({
                message: "Logged in successful",
                token
            })
        } catch (err: any) {
            if (err instanceof CError) {
                return res.status(err.code).json({
                    message: err.message
                })
            }
            return res.status(500).json({ message: 'Something went wrong' })
        }
    }
}
