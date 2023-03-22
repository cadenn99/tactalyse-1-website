import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    isEmployee: {
        type: Boolean,
        default: false
    },
    orderHistory: [{
        type: Types.ObjectId,
        ref: "Order",
    }]
})

model('User', userSchema)