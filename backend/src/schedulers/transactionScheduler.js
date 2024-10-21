import cron from "node-cron";
import { getPendingTransactions, getTransactionById, updateTransactionStatus } from "../services/transaction.services.js";
import { transferMoney } from "../services/account.services.js";

const rejectTransaction = async (error, transactionId) => {
    // update transaction status as failed
    const description = error.message || "Transaction failed";
    await updateTransactionStatus(transactionId, "failed", description);

    console.log("Transaction rejected", description);
    
}

const completeTransaction = async (transactionId) => {
    try {
        const transaction = await getTransactionById(transactionId);

        // transation status must be processing
        if(transaction.status != "processing") return;

        // destructure senderId, recipientId, amount
        const { senderId, recipientId, amount } = transaction;

        // transfer money
        await transferMoney(senderId, recipientId, amount);

        // update transaction status as completed
        await updateTransactionStatus(transactionId, "completed", "Transaction completed");

        console.log("Transaction completed");

    } catch (error) {
        rejectTransaction(error, transactionId);
    }
}

const startTransactionScheduler = () => {
    cron.schedule('* * * * *', async () => {
        try {
            // get pending transactions
            const pendingTransactions = await getPendingTransactions();
            
            // iterate over each transaction and complete or reject it accordingly
            pendingTransactions.forEach(transaction => {
                const { _id: transactionId, createdAt } = transaction
                
                // time in epoch ms when transaction was created
                const transactionTime = new Date(createdAt).getTime();

                // current time in epoch ms
                const currentTime = Date.now();

                // calculate number of minutes elapsed
                const minutesElapsed = ((currentTime - transactionTime) / 1000) / 60;
                
                // if less than 5 minutes elapsed, complete transaction else reject
                if(minutesElapsed > 2 && minutesElapsed < 5) {
                    completeTransaction(transactionId);
                }
                else if(minutesElapsed >= 5) {
                    // create error to pass to rejectTransaction function
                    const err = new Error("Transaction took a very long time");
                    rejectTransaction(err, transactionId);
                }
            })
            
        } catch (error) {
            console.error(error);
        }
        
    });
}

export default startTransactionScheduler;