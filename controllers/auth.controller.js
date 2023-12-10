import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// login user
export const login = asyncHandler(async (req, res) => {

    // get values
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." })
    };

    // login user
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
        return res.status(404).json({ message: "User not found." })
    };

    // check password
    const loginPassword = await bcrypt.compare(password, loginUser.password);

    if (!loginPassword) {
        return res.status(401).json({ message: "Password is wrong." })
    };

    // create access token
    const token = jwt.sign({ email: loginUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN });

    // token set into cookie
    res.cookie("accessToken", token);

    // response login user token
    res.status(200).json({ token });

});



// logout user
export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken").json({ message: "logout successful" });
});