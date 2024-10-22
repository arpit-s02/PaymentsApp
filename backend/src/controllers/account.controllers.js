import { getAccountByUserId, transferMoney } from "../services/account.services.js";
import { createTransaction, getTransactionById, updateTransactionStatus } from "../services/transaction.services.js";
import { getUserByEmail } from "../services/user.services.js";

const getAccountBalance = async (req, res, next) => {
    try {
        const email = req.userEmail;

        const user = await getUserByEmail(email);
        const userAccount = await getAccountByUserId(user._id);

        if(!userAccount) {
            const err = new Error("User doesn't have an account");
            err.status = 404;
            throw err;
        }

        const { balance } = userAccount;
        return res.json({ balance });
        
    } catch (error) {
        next(error);
    }
}


const transfer = async (req, res, next) => {
    const { transactionId } = req.body;

    try {        
        // get transaction using transactionId 
        const transaction = await getTransactionById(transactionId);
        
        // if transaction not found return
        if(!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // if transaction status is not processing return
        if(transaction.status !== "processing") {
            return res.status(400).json({ message: "Transaction already processed" });
        }

        // destructure senderId, recipientId, amount
        const { senderId, recipientId, amount } = transaction;

        // transfer money
        await transferMoney(senderId, recipientId, amount);

        // update transaction status as completed
        await updateTransactionStatus(transactionId, "completed", "Transaction completed");

        // return a response
        return res.json({ message: "Transfer successful" });
        
    } catch (error) {
        // update transaction status as failed
        const description = error.message || "Transaction failed";
        await updateTransactionStatus(transactionId, "failed", description);

        next(error);
    }
}

export { getAccountBalance, transfer };