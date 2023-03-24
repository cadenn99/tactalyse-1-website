
import { Application } from 'express'
import '@src/models/db-models/User'
import '@src/models/db-models/Order'
import { createExpressApp } from './app'
import {
    MongoDatabase,
    MolliePayment,
    NodemailerMailer
} from '@src/services'
require('dotenv').config({ path: __dirname + '/.env' });

const app: Application = createExpressApp(
    new MongoDatabase(),
    new MolliePayment({ apiKey: process.env.MOLLIE_API_KEY as string }),
    new NodemailerMailer({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        user: 'snowboard8442@gmail.com',
        pass: '1NcGnXO24vHSDh6U',
        email: `<h1>Hello from tactalyse</h1>`
    })
)

app.get('db').connect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('>> Listening to port 5000');
        })
    })
