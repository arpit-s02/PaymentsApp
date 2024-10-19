import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import { getAccountBalance, tranfer } from "../controllers/account.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import tranferSchema from "../schemas/tranfer.schema.js";

const router = express.Router();

router.get('/balance', authenticate, getAccountBalance);

router.post('/transfer', authenticate, validate(tranferSchema, 'body'), tranfer);

export default router;