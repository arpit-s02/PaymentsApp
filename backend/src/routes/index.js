import express from "express";
import userRoutes from "./user.routes.js";
import accountRoutes from "./account.routes.js";
import transactionRoutes from "./transaction.routes.js";

const router = express.Router();

router.use("/user", userRoutes);

router.use("/account", accountRoutes);

router.use("/transaction", transactionRoutes);

export default router;