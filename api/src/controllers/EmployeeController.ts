import { DatabaseInterface, TokenInterface } from "@root/typings";
import { CError } from "@src/utils"
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'

export class EmployeeController {
    public async getOustandingOrders(req: Request, res: Response) {
        try {
            const databaseClient: DatabaseInterface = req.app.get('db')

            res.status(200).json({ unfilfilledOrders: await databaseClient.findAllUnfulfilledOrders() })
        } catch (err: any) {
            if (err instanceof CError)
                return res.status(err.code).json({
                    message: err.message
                })

            return res.status(500).json({ message: 'Something went wrong' })
        }
    }
}