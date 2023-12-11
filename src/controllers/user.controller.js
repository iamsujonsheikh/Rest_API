import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";


// get all user
export const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({});

    if (users.length === 0) {
        return res.status(404).send("User not found")
    }
    res.status(200).send(users)
});


// create new user
export const createUser = asyncHandler(async (req, res) => {

    // get value
    const { name, email, mobile, password, gender } = req.body;

    // validate
    if (!(name || email || mobile || password || gender)) {
        return res.status(400).send("All fields are required.")
    }

    // check exist user
    const userEmail = await User.findOne({ email });
    if (userEmail) {
        return res.status(400).send(`This user ${userEmail.email} already exist.`)
    }

    // password hash
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);


    // create user
    const newUser = {
        name,
        email,
        mobile,
        password: hashPassword,
        gender
    };
    const creatUser = await User.create(newUser);

    // send response
    res.status(201).json({
        message: "user create successfull.",
        creatUser
    });

});


// get a user
export const getAUser = asyncHandler(async (req, res) => {

    // get id value
    const { id } = req.params;

    // find user by id
    const findUser = await User.findById(id);

    if (!findUser) {
        return res.status(404).json({ message: "user not found." })
    }

    res.status(200).json(findUser);
});


// update a user
export const updateUser = asyncHandler(async (req, res) => {

    // get params
    const { id } = req.params;
    // body value
    const { name, email, password, mobile } = req.body;

    // validate
    if (!(name || email || password || mobile)) {
        return res.status(400).send("all fields are required")
    }

    // find a user by id and update value
    const updateUser = await User.findByIdAndUpdate(id, { name, email, password, mobile }, { new: true });

    res.status(200).json({
        message: "Update successfull.",
        updateUser
    })
});


// delete user
export const deleteUser = asyncHandler(async (req, res) => {
    // get id from params
    const { id } = req.params;
    // get user find by id and delete
    const removeUser = await User.findByIdAndDelete(id);
    // send response
    res.status(200).json({
        message: "User delete successful",
        removeUser
    })
});