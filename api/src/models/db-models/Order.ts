import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    file: {
        type: Buffer,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    creationTimestamp: {
        type: Number,
        required: true
    }
})

model('Order', orderSchema)