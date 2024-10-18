import mongoose from "mongoose";
import { MONGODB_URI } from "../../config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log("Couldn't connect to DB", error);
    }
}

export default connectDB;