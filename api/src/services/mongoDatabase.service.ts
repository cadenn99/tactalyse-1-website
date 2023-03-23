import mongoose, { model } from "mongoose";
import { DatabaseInterface } from "@root/typings";
import { CError } from "@src/utils";
import bcrypt from 'bcryptjs'

export class MongoDatabase implements DatabaseInterface {

    /**
     * Method for connecting to a Mongodb instance
     * 
     */
    public async connect() {
        await mongoose.connect(process.env.DB_URI as string)
            .then(() => console.log('>> Connected with MongoDB'))
    };

    /**
     * Method for creating a new user and storing it in mongodb database
     * 
     * @param email User email
     * @param password User password
     * @returns 
     */
    public async createUser(email: string, password: string) {
        try {
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS as string));
            const hash = await bcrypt.hash(password, salt);

            return (await model('User').create({ email, hash })).toJSON();
        } catch (err: any) {
            if (err?.code === 11000) {
                throw new CError('Email is already taken', 409)
            }
            throw err
        }
    };

    /**
     * Method for logging in a new user 
     * 
     * @param email User email
     * @param password User password
     * @returns 
     */
    public async loginUser(email: string, password: string) {
        try {

            const user = await model('User').findOne({ email })

            if (user === null || !(await bcrypt.compare(password, user.toJSON().hash)))
                throw new CError('User doesn\'t exist or password incorrect', 401)

            return user.toJSON()
        } catch (err: any) {
            throw err
        }
    };

    /**
     * Method for creating a new order and adding it to the user
     * 
     * @param playerFile Excel file for the player
     * @param leagueFile Excel file for the league
     * @param orderId Order id
     * @param userId User id
     * @returns 
     */
    public async createOrder(playerFile: Buffer, leagueFile: Buffer, orderId: string, userId: string) {
        try {
            const order = await model('Order')
                .create({
                    playerFile,
                    leagueFile,
                    orderId,
                    creationTimestamp: new Date().getTime()
                })

            await model('User')
                .updateOne(
                    { _id: userId },
                    { $push: { orderHistory: order._id } }
                )
        } catch (err: any) {
            if (err?.code === 11000) {
                throw new CError('An order with this ID already exists', 409)
            }
            throw err
        }
    }

    /**
     * Method for finding an order
     * 
     * @param orderId Order id 
     * @returns 
     */
    public async findOrder(orderId: string) {
        try {
            const order = await model('Order').findOne({ orderId })

            if (order === null)
                throw new CError('An order with this ID doesn\'t exists', 409)

            return order
        } catch (err: any) {
            if (err?.code === 11000) {
                throw new CError('An order with this ID doesn\'t exists', 409)
            }
            throw err
        }
    }
}