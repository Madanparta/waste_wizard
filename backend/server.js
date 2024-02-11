import express from "express";
import dbConnection from "./dbConnection/db.js"
import authUser from "./router/authUserRouter.js";
import userRoute from './router/userRoute.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config()
const app = express();

// database connection.
dbConnection();

app.use(express.json());
app.use(cookieParser())

app.listen(process.env.PORT ,()=>{
    console.log(`server run with ${process.env.PORT}`)
})

app.use('/api',authUser);
app.use('/api/post',userRoute)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})