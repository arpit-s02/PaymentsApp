import mongoose from "mongoose";
import Account from "../model/account.model.js";

const createAccount = async (userId, balance) => {
    const account = await Account.create({ userId, balance });
    return account;
}

const getAccountByUserId = async (userId) => {
    const account = await Account.findOne({ userId });
    return account;
}

const transferMoney = async (senderId, receiverId, amount) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const senderAccount = await Account.findOne({ userId: senderId });
    
        if(!senderAccount) {
            const err = new Error("You do not have an account");
            err.status = 400;
            throw err;
        }
    
        else if(senderAccount.balance < amount) {
            const err = new Error("You do not have enough balance");
            err.status = 400;
            throw err;
        }
    
        const receiverAccount = await Account.findOne({ userId: receiverId });
    
        if(!receiverAccount) {
            const err = new Error("Receiver does not have an account");
            err.status = 400;
            throw err;
        }

        senderAccount.balance -= amount;
        await senderAccount.save({ session });

        receiverAccount.balance += amount;
        await receiverAccount.save({ session });
    
        await session.commitTransaction();
        session.endSession();

    } catch(error) {
        await session.abortTransaction();
        session.endSession();

        throw error;
    }
}

export { createAccount, getAccountByUserId, transferMoney };