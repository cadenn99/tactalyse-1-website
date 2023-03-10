import { Router } from 'express'
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const AuthControllerInstance = new AuthController()

export const authRoute = Router();

authRoute.route('/register')
    .post(AuthControllerInstance.registerUser)

authRoute.route('/login')
    .post(AuthControllerInstance.loginUser)