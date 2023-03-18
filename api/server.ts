
import { Application } from 'express'
import '@src/models/db-models/User'
import { createExpressApp } from './app'
import { MongoDatabase } from '@src/database/mongoDatabase'
require('dotenv').config({ path: __dirname + '/.env' });
const { createMollieClient } = require('@mollie/api-client');

const app: Application = createExpressApp(new MongoDatabase(), createMollieClient({ apiKey: 'test_mKdenUnyR3FHCWMSndC4nSCEWVVyJD' }))

app.get('db').connect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('>> Listening to port 5000');
        })
    })
