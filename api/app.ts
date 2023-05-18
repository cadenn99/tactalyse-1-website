import './src/models/db-models/User'
import './src/models/db-models/Order'
import express, { Application } from 'express'
import { authRoute, paymentRoute, customerRoute, employeeRoute } from './src/routes'
import { DatabaseInterface, MailerInterface, PaymentProcessorInterface } from './typings'
import cors from 'cors'

export function createExpressApp(
    database: DatabaseInterface,
    paymentClient: PaymentProcessorInterface,
    mailer: MailerInterface
) {
    const app: Application = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded())
    app.use('/auth', authRoute)
    app.use('/content', customerRoute)
    app.use('/checkout', paymentRoute)
    app.use('/employee', employeeRoute)

    app.set('db', database)
    app.set('pc', paymentClient)
    app.set('nm', mailer)
    return app
}

