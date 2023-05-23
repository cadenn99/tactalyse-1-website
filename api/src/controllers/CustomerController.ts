import { DatabaseInterface, TokenInterface } from "@root/typings";
import { CError } from "@src/utils"
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

/**
 * CustomerController class responsible for handling customer specific requests
 */
export class CustomerController {

    /**
     * Method for retrieving all the orders of a customer
     * @param req 
     * @param res 
     * @param next 
     */
    public async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = jwt.decode(req.headers.authorization?.split(' ')[1] as string) as TokenInterface
            const databaseClient: DatabaseInterface = req.app.get('db')
            const orders = await databaseClient.findUserOrderHistory(payload._id)

            res.status(200).json({ orders })
        } catch (err: any) {
            next(err)
        }
    }
}