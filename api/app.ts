import './src/models/db-models/User'
import express, { Application } from 'express'
import { authRoute, paymentRoute } from './src/routes'
import { DatabaseInterface, PaymentProcessorInterface } from './typings'

export function createExpressApp(database: DatabaseInterface, paymentClient: PaymentProcessorInterface) {
    const app: Application = express()

    app.use(express.json())
    app.use('/auth', authRoute)
    app.use('/checkout', paymentRoute)

    app.set('db', database)
    app.set('pc', paymentClient)
    return app
}

