import { Request, Response } from "express";
import { authReqSchema } from "@src/models/api-models/AuthSchema";
import { CError } from "@src/utils/CError";
import jwt from 'jsonwebtoken'
import { DatabaseInterface } from "@root/typings";

export class AuthController {

    /**
     * Controller function for registering a new user
     * 
     * @param req Request object
     * @param res Response object 
     */
    public async registerUser(req: Request, res: Response) {
        try {
            if (!authReqSchema.safeParse(req.body).success)
                throw new CError("Invalid email or password format", 404)

            const databaseClient: DatabaseInterface = req.app.get('db')

            const user = await databaseClient
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
            if (!authReqSchema.safeParse(req.body).success)
                throw new CError("Invalid email or password format", 404)

            const databaseClient: DatabaseInterface = req.app.get('db')

            const user = await databaseClient
                .loginUser(req.body.email, req.body.password)

            const token = jwt.sign(user, process.env.JWT_SECRET as string)

            return res.status(200).json({
                message: "Logged in successful",
                token
            })
        } catch (err: any) {

            if (err instanceof CError)
                return res.status(err.code).json({
                    message: err.message
                })

            return res.status(500).json({ message: 'Something went wrong' })
        }
    }
}
