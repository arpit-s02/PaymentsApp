import { getAccountByUserId, transferMoney } from "../services/account.services.js";
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

const tranfer = async (req, res, next) => {
    try {
        const { receiverId, amount } = req.body;
        const userEmail = req.userEmail;

        const user = await getUserByEmail(userEmail);
        const senderId = user._id;

        await transferMoney(senderId, receiverId, amount);

        return res.json({ message: "Transfer successful" });
    } catch (error) {
        next(error);
    }
}

export { getAccountBalance, tranfer };