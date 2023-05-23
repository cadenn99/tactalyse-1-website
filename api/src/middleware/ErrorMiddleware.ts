import { ErrorRequestHandler } from "express";
import { CError } from "../utils/CError";
import { logger } from "../utils/logger";

/**
 * Express errorhandling middleware which handles and logs the error
 * 
 * @param error 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const ErrorMiddleware: ErrorRequestHandler = (error, req, res, next) => {

    if (error instanceof CError)
        return res.status(error.code).json({
            message: error.message
        })

    logger.log('error', error.stack)

    res.status(500)
        .json({ message: 'Something went wrong' })
}