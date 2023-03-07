
import express, { Application } from 'express'
import { authRoute } from './src/routes/AuthRoutes'

export const app: Application = express()

app.use(express.json())
app.use('/auth', authRoute)

app.listen(5000, () => {
    console.log('Listening to port 5000');
})