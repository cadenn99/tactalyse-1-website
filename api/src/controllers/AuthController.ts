import { NextFunction, Request, Response } from "express";
import { authReqSchema } from "@src/models/api-models";
import { CError } from "@src/utils/CError";
import jwt from 'jsonwebtoken'
import { DatabaseInterface } from "@root/typings";
import { logger } from "@src/utils";

/**
 * AuthController class responsible for handling user registeration and logging in
 */
export class AuthController {

    /**
     * Controller function for registering a new user
     * 
     * @param req Request object
     * @param res Response object 
     */
    public async registerUser(req: Request, res: Response, next: NextFunction) {
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
        } catch (err: any) {
            next(err)
        }
    }

    /**
     * Controller method for logging a user in
     * 
     * @param req Request object
     * @param res Response object
     */
    public async loginUser(req: Request, res: Response, next: NextFunction) {
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
            next(err)
        }
    }
}
