import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import transferSchema from "../schemas/transfer.schema.js";
import { getAccountBalance, transfer } from "../controllers/account.controllers.js";

const router = express.Router();

router.get('/balance', authenticate, getAccountBalance);

router.post('/transfer', authenticate, validate(transferSchema, 'body'), transfer);

export default router;