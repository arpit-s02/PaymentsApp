import express from "express";
import signupSchema from "../schemas/signup.shema.js"
import validate from "../middlewares/validate.middleware.js"
import { searchUsers, signin, signup, updateProfile } from "../controllers/user.controllers.js";
import signinSchema from "../schemas/signin.schema.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import updateProfileSchema from "../schemas/updateProfile.schema.js";

const router = express.Router();

router.post('/signup', validate(signupSchema, 'body'), signup);

router.post('/signin', validate(signinSchema, 'body'), signin);

router.patch('/updateProfile', authenticate, validate(updateProfileSchema, 'body'), updateProfile);

router.get('/bulk', authenticate, searchUsers);

export default router;