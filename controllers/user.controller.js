import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


// get all user
export const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (users.length === 0) {
        return res.status(500).json({ message: "user data not found..." });
    }
    res.status(200).json(users);
});


// get single user
export const getSingleUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const findUser = await User.findById(id);
    if (!findUser) {
        return res.status(404).json({ message: "user not found." })
    }
    res.status(200).json(findUser);
});


// create a user
export const createUser = asyncHandler(async (req, res) => {
    // get values
    const { name, email, mobile, password, gender } = req.body;

    // validation
    if (!name || !email || !mobile || !password || !gender) {
        return res.status(400).json({ message: "All fields are required." })
    };

    // email check
    const emailExist = await User.findOne({ email });

    if (emailExist) {
        return res.status(400).send("This email already exist.")
    };

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create(
        {
            name,
            email,
            mobile,
            password: hashPassword,
            gender
        }
    );

    // send response
    res.status(201).json(user);
});



// delete a user
export const deleteAUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json({
        message: "successfull",
        deleteUser
    });
});



// update a user
export const updateAUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, email, mobile, password, gender } = req.body;

    if (!name || !email || !mobile || !password || !gender) {
        return res.status(400).json({ message: "All fields are required." })
    }

    const updateUser = await User.findByIdAndUpdate(id, { name, email, mobile, password, gender }, { new: true });
    res.status(200).json({
        message: "successfull",
        updateUser
    });
});
