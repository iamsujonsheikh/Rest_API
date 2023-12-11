import express from "express";
import cors from "cors";
import colors from "colors";
import userRouter from "./routes/user.route.js";
import loginRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();


// initialize app
const app = express();


// default application middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// externel application middlewares
app.use(cors());
app.use(cookieParser());

// router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", loginRouter);

// error handler middleware
app.use(errorHandler);

// routing
app.get('/', (req, res) => {
    res.status(200).send('Wellcome to my server.')
});

export default app;