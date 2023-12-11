import asyncHandler from "express-async-handler";
import { db_url } from "../secret/secret.js";
import mongoose from "mongoose";


const connectDB = asyncHandler(async () => {
    try {
        await mongoose.connect(db_url);
        console.log("Database connection successfull.".bgGreen.black)
    } catch (error) {
        console.log(`Database connection failed. ${error.message}`.bgRed.bold)
    }
});

export default connectDB;