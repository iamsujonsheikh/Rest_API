import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            trim: true,
            default: null
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,
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