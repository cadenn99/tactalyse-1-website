import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    playerName: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    completedPayment: {
        type: Boolean,
        required: true,
        default: false
    },
    creationTimestamp: {
        type: Number,
        required: true
    },
    pdf: {
        type: Buffer,
        required: false,
        default: undefined
    }
})

export default model('Order', orderSchema)