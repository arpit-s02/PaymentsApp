import express from "express";
import signupSchema from "../schemas/signup.shema.js"
import validate from "../middlewares/validate.middleware.js"
import { signin, signup } from "../controllers/user.controllers.js";
import signinSchema from "../schemas/signin.schema.js";

const router = express.Router();

router.post('/signup', validate(signupSchema, 'body'), signup);

router.post('/signin', validate(signinSchema, 'body'), signin);

export default router;