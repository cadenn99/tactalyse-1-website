import { Request, Router, Response } from 'express'
import { AuthController } from '../controllers/AuthController';

const AuthControllerInstance = new AuthController()

export const authRoute = Router();

authRoute.route('/register')
    .post((req: Request, res: Response) => AuthControllerInstance.registerUser)
