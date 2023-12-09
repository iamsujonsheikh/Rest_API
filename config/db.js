import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database Connection Succesfull".bgBlue.black);
    } catch (error) {
        console.log(`${error.message}`.bgRed.black);
    }
};