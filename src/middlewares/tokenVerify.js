import Jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../models/user.model.js";

const tokenVerify = (req, res, next) => {

    // check header has into accestoken
    const authHeader = req.headers.authorization;

    // check token
    if (!authHeader) {
        return res.status(401).send("Unathorized user")
    };

    // cut token bearer part
    const token = authHeader.split(" ")[1];
    console.log(token)

    // verify token
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, AsyncHandler(async (error, decode) => {

        if (error) {
            return res.status(400).json({ message: "Invalid Token" })
        };

        const accessUser = await User.findOne({ email: decode.email });

        req.accessUser = accessUser;

        next();
    }))

};

export default tokenVerify;