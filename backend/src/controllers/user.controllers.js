import { createUser, getUserByEmail } from "../services/user.services.js";
import { generateToken, hashPassword, verifyPassword } from "../services/authentication.services.js";
import { JWT_SECRET } from "../../config.js";

const signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
    
        const isEmailDuplicate = await getUserByEmail(email);
    
        if(isEmailDuplicate) {
            res.status(409).json({ message: "A user with this email already exists" });
            return;
        }
    
        const hashedPassword = await hashPassword(password);
    
        const newUser = await createUser({ firstName, lastName, email, password: hashedPassword });
    
        res.status(201).json({ firstName: newUser.firstName, email: newUser.email });
    } catch(error) {
        next(error);
    }
}

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);

        if(!user) {
            const err = new Error("Invalid username or password");
            err.status = 401
            throw err;
        }

        const isPasswordCorrect = await verifyPassword(user, password);

        if(!isPasswordCorrect) {
            const err = new Error("Invalid username or password");
            err.status = 401
            throw err;
        }

        const token = generateToken(user, JWT_SECRET);

        res.json({ token });
    } catch (error) {
        next(error);
    }
}

export { signup, signin };