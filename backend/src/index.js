import express from "express";
import { PORT } from "../config.js";
import connectDB from "./db/index.js";
import routes from "./routes/index.js";

const app = express();

await connectDB();

app.use(express.json());

app.use("/api/v1", routes);

app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong";
    const status = err.status || 500;

    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});