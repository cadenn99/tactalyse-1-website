import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    leagueFile: {
        type: Buffer,
        required: true,
    },
    playerFile: {
        type: Buffer,
        required: true
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
    },
    pdf: {
        type: Buffer,
        required: false,
        default: undefined
    }
})

export default model('Order', orderSchema)