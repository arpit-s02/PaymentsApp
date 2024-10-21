import Transaction from "../model/transaction.model.js";

const getTransactionById = async (transactionId) => {
    const transaction = await Transaction.findById(transactionId);
    return transaction;
}

const createTransaction = async (senderId, recipientId, amount) => {
    const status = "processing";
    const description = "In process";

    const transaction = await Transaction.create({ senderId, recipientId, amount, status, description });
    return transaction._id;
}

const updateTransactionStatus = async (transactionId, status, description) => {
    await Transaction.findByIdAndUpdate(transactionId, { status, description });
}

const getPendingTransactions = async () => {
    const pendingTransactions = await Transaction.find({ status: "processing" });

    return pendingTransactions;
}

export { createTransaction, updateTransactionStatus, getTransactionById, getPendingTransactions };