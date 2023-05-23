import { DatabaseInterface, TokenInterface } from "@root/typings";
import { CError } from "@src/utils"
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

/**
 * EmployeeController class responsible for handling employee specific requests
 */
export class EmployeeController {

    /**
     * Method for retrieving all orders with processing status
     * @param req 
     * @param res 
     * @returns 
     */
    public async getOustandingOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const databaseClient: DatabaseInterface = req.app.get('db')

            res.status(200).json({ unfilfilledOrders: await databaseClient.findAllUnfulfilledOrders() })
        } catch (err: any) {
            next(err)
        }
    }
}