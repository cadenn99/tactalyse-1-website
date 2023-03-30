import { Router } from 'express'
import { AuthController } from '@src/controllers/index';

const AuthControllerInstance = new AuthController()

export const authRoute = Router();

authRoute.route('/register')
    .post(AuthControllerInstance.registerUser)

authRoute.route('/login')
    .post(AuthControllerInstance.loginUser)
