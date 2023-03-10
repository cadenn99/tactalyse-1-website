
import { Application } from 'express'
import './src/models/db-models/User'
import { createExpressApp } from './app'
import { MongoDatabase } from './src/database/mongoDatabase'


const app: Application = createExpressApp(new MongoDatabase())

app.get('db').connect()
    .then(() => {
        app.listen(5000, () => {
            console.log('>> Listening to port 5000');
        })
    })
