import mongoose, { model } from "mongoose";
import { DatabaseInterface } from "@root/typings";
import { CError } from "@src/utils";
import bcrypt from 'bcrypt'

export class MongoDatabase implements DatabaseInterface {
    constructor() { }

    public async connect() {
        await mongoose.connect(process.env.DB_URI as string)
            .then(() => console.log('>> Connected with MongoDB'))
    };

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

    public async loginUser(email: string, password: string) {
        try {

            const user = await model('User').findOne({ email })

            if (user === null)
                throw new CError('User doesn\'t exist or password incorrect', 401)

            if (!(await bcrypt.compare(password, user.toJSON().hash)))
                throw new CError('User doesn\'t exist or password incorrect', 401)

            return user.toJSON()
        } catch (err: any) {
            throw err
        }
    };
}