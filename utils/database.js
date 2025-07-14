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
            // serverSelectionTimeoutMS: 5000, // Reduce timeout for faster fails
            // socketTimeoutMS: 45000,

        });
        // isConnected = db.connections[0].readyState === 1;
        isConnected = true; // Set the connection flag - This flag helps prevent unnecessary reconnection attempts if the function is called multiple times during the application’s lifecycle.
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log('MongoDB connection error:', error);
        throw error;
    }
};
