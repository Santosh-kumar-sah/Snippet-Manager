import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async()=>{
    try {
        const connetionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         console.log(`\n MongoDB connected !! DB Host: ${connetionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection Failed ",error);
        process.exit(1)
        
    }
}

export { connectDB}
