import mongoose, { model } from "mongoose";
import { DatabaseInterface } from "../../typings";
import { CError } from "../utils/CError";

export class MongoDatabase implements DatabaseInterface {
    constructor() { }

    public async connect() {
        await mongoose.connect('mongodb://127.0.0.1:27017/users')
            .then(() => console.log('>> Connected with MongoDB'))
    };

    public async createUser(email: string, password: string) {
        try {
            return (await model('User').create({ email, password })).toJSON();
        } catch (err: any) {
            if (err?.code === 11000) {
                throw new CError('Email is already taken', 409)
            }
            throw err
        }

    };

    public async loginUser(email: string, password: string) {
        try {
            const user = await model('User').findOne({ email, password })
            if (user === null) {
                throw new CError('User doesn\'t exist or password incorrect', 401)
            }

            return user.toJSON()
        } catch (err: any) {

            throw err
        }
    };


}