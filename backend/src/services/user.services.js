import User from "../model/user.model.js";

const createUser = async (userDetails) => {
    const user = await User.create(userDetails);
    return user;
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

const updateUserInfo = async (email, updatedInfo) => {
    await User.updateOne({ email }, updatedInfo);
}

export { createUser, getUserByEmail, updateUserInfo };