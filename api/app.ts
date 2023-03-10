import './src/models/db-models/User'
import express, { Application } from 'express'
import { authRoute } from './src/routes/AuthRoutes'
import { DatabaseInterface } from './typings'
import { AuthController } from './src/controllers/AuthController'

export function createExpressApp(database: DatabaseInterface) {
    const app: Application = express()

    app.use(express.json())
    app.use('/auth', authRoute)

    app.set('db', database)
    return app
}

