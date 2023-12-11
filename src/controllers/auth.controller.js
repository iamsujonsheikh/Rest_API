import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";


// login user
export const login = asyncHandler(async (req, res) => {

    // get value
    const { email, password } = req.body;

    // validate
    if (!(email || password)) {
        return res.status(400).send("All fields are required.")
    }

    // check login email user
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
        return res.status(400).json({ message: "User email not valid." })
    };


    // check password
    const loginPassword = await bcrypt.compare(password, loginUser.password);

    if (!loginPassword) {
        return res.status(401).json({ message: "Password is wrong." })
    };


    // create access token
    const token = Jwt.sign({ email: loginUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN });

    // token set into cokkie
    res.cookie("accessToken", token);


    // send to the response
    res.status(200).json({ token })

});



// logout user
export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken").json({ message: "logout successful" });
});