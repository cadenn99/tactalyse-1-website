import { Router } from 'express'
import { EmployeeController } from '@src/controllers';
import { authMiddleware } from '@src/middleware';

const EmployeeControllerInstance = new EmployeeController()

export const employeeRoute = Router();

employeeRoute.route('/unfilfilled-orders')
    .get(authMiddleware, EmployeeControllerInstance.getOustandingOrders)
