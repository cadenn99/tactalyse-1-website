import { Router } from 'express'
import { PaymentController } from '@src/controllers';
import { AuthMiddleware as authMiddleware } from '@src/middleware';

const PaymentControllerInstance = new PaymentController()

export const paymentRoute = Router();

paymentRoute.route('/pay')
    .post(authMiddleware, PaymentControllerInstance.acceptPayment)

paymentRoute.route('/completeOrder')
    .post(PaymentControllerInstance.completePayment)

paymentRoute.route('/noPayment')
    .post(authMiddleware, PaymentControllerInstance.noPayment)