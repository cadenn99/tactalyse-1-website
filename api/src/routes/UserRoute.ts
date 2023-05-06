import { Router } from 'express'
import { UserController } from '@src/controllers';
import { authMiddleware } from '@src/middleware';

const UserControllerInstance = new UserController()

export const userRoute = Router();

userRoute.route('/order-history')
    .get(authMiddleware, UserControllerInstance.getOrders)
