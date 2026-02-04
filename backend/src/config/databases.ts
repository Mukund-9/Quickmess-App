import mongoose from "mongoose";
export const connnectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MONGODb connnected successfully");
    } catch (error) {
        console.log("MONGODb not connnected ",error);

        process.exit(1);
    }
}