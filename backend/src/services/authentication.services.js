import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bycrpt.hash(password, saltRounds);
    return hashedPassword;
}

const verifyPassword = async (user, password) => {
    const result = await bycrpt.compare(password, user.password);
    return result;
}

const generateToken = (user, secret) => {
    const { firstName, email } = user;

    const payload = { firstName, email }

    const token = jwt.sign(payload, secret);
    return token;
}

export { hashPassword, verifyPassword, generateToken };