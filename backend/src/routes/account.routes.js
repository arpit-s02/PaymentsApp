import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import { getAccountBalance } from "../controllers/account.controllers.js";

const router = express.Router();

router.get('/balance', authenticate, getAccountBalance);

export default router;