import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name must be required."],
        },
        email: {
            type: String,
            required: [true, "Email must be required."],
            trim: true,
            lowercase: true
        },
        mobile: {
            type: String,
            trim: true,
            default: null
        },
        password: {
            type: String,
            required: [true, "Password must be required."],
            trim: true
        },
        gender: {
            type: String,
            required: [true, "Gender must be required."],
            enum: ["Male", "Female"]
        },
        photo: {
            type: String,
            null: true
        },
        status: {
            type: Boolean,
            default: true
        },
        trash: {
            type: String,
            default: false
        },
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);

export default User;