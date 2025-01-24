import mongoose from 'mongoose'
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("DB connected")
    } catch (error) {
        throw new Error(error.message || "Failed to connect to database")
    }
}
