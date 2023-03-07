import { Request, Router, Response } from "express";
import { authSchema } from "../models";

export class AuthController {
    constructor() { }

    /**
     * Controller function for registering a new user
     * 
     * @param req Request object
     * @param res Response object
     * @returns 
     */
    public registerUser(req: Request, res: Response) {

        if (!authSchema.safeParse(req.body).success)
            return res.status(404).json({
                message: "Invalid email or password",
            });

        //TODO: Store user

        return res.status(200).json({
            message: "Registered",
        });
    }

    /**
     * Controller method for logging a user in
     * 
     * @param req Request object
     * @param res Response object
     */
    public loginUser(req: Request, res: Response) { }
}
