import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import { app } from "./app.js";


import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})

import {connectDB} from "./db/db.js";

connectDB()
.then(()=>{

    
    app.on("error",(error)=>{
            console.log("Not able to listen error : ",error)
            throw error
        })

    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed!!!",err);
})

