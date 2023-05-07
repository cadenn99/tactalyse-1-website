import './src/models/db-models/User'
import './src/models/db-models/Order'
import express, { Application } from 'express'
import { authRoute, paymentRoute, userRoute } from './src/routes'
import { DatabaseInterface, MailerInterface, PaymentProcessorInterface } from './typings'

export function createExpressApp(
    database: DatabaseInterface,
    paymentClient: PaymentProcessorInterface,
    mailer: MailerInterface
) {
    const app: Application = express()

    app.use(express.json())
    app.use(express.urlencoded())
    app.use('/auth', authRoute)
    app.use('/content', userRoute)
    app.use('/checkout', paymentRoute)

    app.set('db', database)
    app.set('pc', paymentClient)
    app.set('nm', mailer)
    return app
}

