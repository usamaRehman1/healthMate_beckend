import mongoose from "mongoose";
import { ENV } from "../constant/index.js";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(`mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@healthmatecluster.hijv9sy.mongodb.net/`);
        console.log(`MongoDB Connected => ${con.connection.host}`)
    } catch (error) {
        console.log("Error =>", error)
    }
}