import express from "express";
import colors from "colors"
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./route/user.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectDB } from "./config/db.js";
dotenv.config();

// inisialization.
const app = express()

// set middlewares.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// set environment variables.
const PORT = process.env.port || 9090;


// routing
app.use("/api/v1/user", userRouter);


// use error handler.
app.use(errorHandler)

// application litenser.
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`.bgCyan.black);
    connectDB();
})