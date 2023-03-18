import './src/models/db-models/User'
import express, { Application } from 'express'
import { authRoute, paymentRoute } from './src/routes'
import { DatabaseInterface } from './typings'

export function createExpressApp(database: DatabaseInterface, mollie: any) {
    const app: Application = express()

    app.use(express.json())
    app.use('/auth', authRoute)
    app.use('/checkout', paymentRoute)

    app.set('db', database)
    app.set('mollie', mollie)
    return app
}

