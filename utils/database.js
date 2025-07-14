// import mongoose from "mongoose";

// let isConnected = false;
// export const connectToDB = async () => {
//     mongoose.set('strictQuery', true);
//     if (isConnected) {
//         console.log("MongoDB is already connected");
//         return;
//     }

//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             dbName: "dabkinger",
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//         });
//         isConnected = true; // Set the connection flag - This flag helps prevent unnecessary reconnection attempts if the function is called multiple times during the application’s lifecycle.
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log('MongoDB connection error:', error);
//         throw error;
//     }
// };

// utils/database.js
import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}