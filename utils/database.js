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
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        isConnected = true; // Set the connection flag - This flag helps prevent unnecessary reconnection attempts if the function is called multiple times during the application’s lifecycle.
    } catch (error) {
        console.log(error);
    }
};