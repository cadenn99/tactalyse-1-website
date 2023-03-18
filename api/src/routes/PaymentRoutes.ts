import { Router } from 'express'
import { PaymentController } from '@src/controllers';

const PaymentControllerInstance = new PaymentController()

export const paymentRoute = Router();

paymentRoute.route('/pay')
    .post(PaymentControllerInstance.acceptPayment)

