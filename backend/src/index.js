import express from "express";
import connectDB from "./db/index.js";
import routes from "./routes/index.js";
import cors from "cors";
import { PORT } from "../config.js";
import startTransactionScheduler from "./schedulers/transactionScheduler.js";

const app = express();

await connectDB();

app.use(cors());

app.use(express.json());

startTransactionScheduler();

app.use("/api/v1", routes);

app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong";
    const status = err.status || 500;

    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});