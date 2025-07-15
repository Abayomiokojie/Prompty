import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "dabkinger",

        });

        isConnected = true; // Set the connection flag - This flag helps prevent unnecessary reconnection attempts if the function is called multiple times during the application’s lifecycle.

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log('MongoDB connection error:', error);
        throw error;
    }
};

