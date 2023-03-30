import { Router } from 'express'
import { PaymentController } from '@src/controllers/index';
import { authMiddleware } from '@src/middleware/index';

const PaymentControllerInstance = new PaymentController()

export const paymentRoute = Router();

paymentRoute.route('/pay')
    .post(authMiddleware, PaymentControllerInstance.acceptPayment)

paymentRoute.route('/completeOrder')
    .post(PaymentControllerInstance.completePayment)

paymentRoute.route('/noPayment')
    .post(authMiddleware, PaymentControllerInstance.noPayment)