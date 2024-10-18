import Account from "../model/account.model.js";

const createAccount = async (userId, balance) => {
    const account = await Account.create({ userId, balance });
    return account;
}

const getAccountByUserId = async (userId) => {
    const account = await Account.findOne({ userId });
    return account;
}

export { createAccount, getAccountByUserId };