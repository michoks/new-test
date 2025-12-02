import mongoose from "mongoose"

const mongo_Url = process.env.MONGO_URL as string;
let isConnected = false;

export default async function connectDB() {
    if (isConnected) {
        console.log("DB is already connected");
        return;
    }

    if (!mongo_Url) {
        throw new Error("Missing mongodb_url in environment variable");
        return;
    }

    try {
        const db = await mongoose.connect(mongo_Url);
        isConnected = !!db.connections[0].readyState;
        console.log("mongodb connected")

    } catch (err: any) {
        console.error("something went wrong", err)
    }
}