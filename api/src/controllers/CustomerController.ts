import { DatabaseInterface, TokenInterface } from "@root/typings";
import { CError } from "@src/utils"
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'

/**
 * CLEAN UP!!!!
 */
export class CustomerController {
    public async getOrders(req: Request, res: Response) {
        try {
            const payload = jwt.decode(req.headers.authorization?.split(' ')[1] as string) as TokenInterface
            const databaseClient: DatabaseInterface = req.app.get('db')
            const orders = await databaseClient.findUserOrderHistory(payload._id)

            res.status(200).json({ orders })
        } catch (err: any) {
            if (err instanceof CError)
                return res.status(err.code).json({
                    message: err.message
                })

            return res.status(500).json({ message: 'Something went wrong' })
        }
    }
}