import mongoose from "mongoose";

const isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            bdName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};