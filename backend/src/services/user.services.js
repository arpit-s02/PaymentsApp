import User from "../model/user.model.js";

const createUser = async (userDetails) => {
    const user = await User.create(userDetails);
    return user;
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

export { createUser, getUserByEmail };