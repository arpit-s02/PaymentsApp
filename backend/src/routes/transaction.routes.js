import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import newTransactionSchema from "../schemas/newTransaction.schema.js";
import { newTransaction, transactionDetails } from "../controllers/transaction.controllers.js";
import transactionDetailsSchema from "../schemas/transactionDetails.schema.js";

const router = express.Router();

router.use(authenticate);

router.get('/details', validate(transactionDetailsSchema, 'query'), transactionDetails);

router.post('/new', validate(newTransactionSchema, 'body'), newTransaction);

export default router;