import mongoose from "mongoose";
import { MONGODB_URI } from "../../config.js";

const connectDB = async () => {
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB");
}

export default connectDB;