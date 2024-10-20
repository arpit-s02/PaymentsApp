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

const filterUsers = async (filter, email) => {
    const users = await User.find(
        {
            $or: [
                {
                    firstName: { $regex: filter, $options: "i" },
                    email: { $ne: email}
                },
                {
                    lastName: { $regex: filter, $options: "i" },
                    email: { $ne: email}
                }
            ]
        },
        {
            firstName: true,
            lastName: true,
            email: true
        }
    );

    return users;
}

export { createUser, getUserByEmail, updateUserInfo, filterUsers };