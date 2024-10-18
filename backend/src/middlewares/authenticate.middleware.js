import { verifyToken } from "../services/authentication.services.js";
import { JWT_SECRET } from "../../config.js";
import { getUserByEmail } from "../services/user.services.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Please authenticate" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token, JWT_SECRET);
        req.userEmail = decoded.email;
        next();
    } catch (error) {
        error.message = "Please authenticate";
        error.status = 403;
        next(error);
    }
}

export default authenticate;