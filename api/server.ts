
import express, { Application } from 'express'
import { authRoute } from './src/routes/AuthRoutes'
import mongoose from 'mongoose'
import './src/models/db-models/User'
import { createExpressApp } from './app'
import { MongoDatabase } from './src/database/mongoDatabase'
import { DatabaseInterface } from './typings'
import { describe, expect, jest, test } from '@jest/globals';

const app: Application = createExpressApp(new MongoDatabase())

app.get('db').connect()
    .then(() => {
        app.listen(5000, () => {
            console.log('>> Listening to port 5000');
        })
    })
