import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        recipientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['processing', 'completed', 'failed'],

        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;