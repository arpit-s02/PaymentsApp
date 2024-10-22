import { createTransaction, getTransactionById } from "../services/transaction.services.js";
import { getUserByEmail } from "../services/user.services.js";

const newTransaction = async (req, res, next) => {
    try {
        const { recipientId, amount } = req.body;
        const { userEmail } = req;

        // fetch user to get senderId
        const user = await getUserByEmail(userEmail);
        const senderId = user._id;

        // senderId and recipientId must not be the same
        if(senderId.toString() === recipientId.toString()) {
            const err = new Error("Sender and receiver can't be the same");
            err.status(400);
            throw err;
        }

        // create a new transaction
        const transactionId = await createTransaction(senderId, recipientId, amount);
        
        // return transactionId as response
        return res.json({ transactionId });

    } catch(error) {
        next(error);
    }
}

const transactionDetails = async (req, res, next) => {
    try {
        const { transactionId } = req.query;

        const transaction = await getTransactionById(transactionId);

        return res.json(transaction);

    } catch(error) {
        next(error);
    }
}

export { newTransaction, transactionDetails };