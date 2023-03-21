
import { Application } from 'express'
import '@src/models/db-models/User'
import '@src/models/db-models/Order'
import { createExpressApp } from './app'
import { MongoDatabase } from '@src/providers/mongoDatabase'
import { MolliePayment } from '@src/providers/molliePayment'
require('dotenv').config({ path: __dirname + '/.env' });

const app: Application = createExpressApp(new MongoDatabase(), new MolliePayment(process.env.MOLLIE_API_KEY as string))

app.get('db').connect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('>> Listening to port 5000');
        })
    })
