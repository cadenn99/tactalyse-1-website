
import { Application } from 'express'
import '@src/models/db-models'
import { createExpressApp } from './app'
import { MongoDatabase } from '@src/database/mongoDatabase'
require('dotenv').config({ path: __dirname + '/.env' });

const app: Application = createExpressApp(new MongoDatabase())

app.get('db').connect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('>> Listening to port 5000');
        })
    })
