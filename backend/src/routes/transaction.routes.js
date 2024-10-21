import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import newTransactionSchema from "../schemas/newTransaction.schema.js";
import { newTransaction } from "../controllers/transaction.controllers.js";

const router = express.Router();

router.use(authenticate);

router.post('/new', validate(newTransactionSchema, 'body'), newTransaction);

export default router;