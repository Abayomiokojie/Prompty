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
        isConnected = db.connections[0].readyState === 1;
        // isConnected = true; // Set the connection flag - This flag helps prevent unnecessary reconnection attempts if the function is called multiple times during the application’s lifecycle.
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log('MongoDB connection error:', error);
        throw error;
    }
};

// utils/database.js
// import mongoose from 'mongoose';

// let isConnected = false;

// export const connectToDB = async () => {
//     // If already connected, return immediately
//     if (isConnected && mongoose.connection.readyState === 1) {
//         console.log('♻️ Using existing MongoDB connection');
//         return;
//     }

//     if (!process.env.MONGODB_URI) {
//         throw new Error('MONGODB_URI environment variable is not defined');
//     }

//     try {
//         console.log('🔌 Initiating new MongoDB connection...');

//         // Set mongoose options before connecting
//         mongoose.set('strictQuery', true);

//         const options = {
//             dbName: 'share_prompt', // Replace with your database name
//             maxPoolSize: 10,
//             serverSelectionTimeoutMS: 5000, // 5 seconds
//             socketTimeoutMS: 45000, // 45 seconds
//         };

//         await mongoose.connect(process.env.MONGODB_URI, options);

//         isConnected = true;
//         console.log('✅ MongoDB connected successfully');

//         // Handle connection events
//         mongoose.connection.on('error', (err) => {
//             console.error('MongoDB connection error:', err);
//             isConnected = false;
//         });

//         mongoose.connection.on('disconnected', () => {
//             console.log('MongoDB disconnected');
//             isConnected = false;
//         });

//     } catch (error) {
//         console.error('❌ MongoDB connection failed:', error.message);
//         isConnected = false;
//         throw error;
//     }
// };