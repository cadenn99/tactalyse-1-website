import { Router } from 'express'
import { CustomerController } from '@src/controllers';
import { authMiddleware } from '@src/middleware';

const CustomerControllerInstance = new CustomerController()

export const customerRoute = Router();

customerRoute.route('/order-history')
    .get(authMiddleware, CustomerControllerInstance.getOrders)
