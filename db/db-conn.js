import mongoose from "mongoose";
import { MONGODB_URI } from '../config/config.js';

const dbConn = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
    }
}

export default dbConn;