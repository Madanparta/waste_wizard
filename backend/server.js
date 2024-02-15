import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from './routers/auth.routs.js';
import userRouter from './routers/user.routs.js';
import dbConnection from "./dbConnections/db.js";
dotenv.config()
const app = express();

// database connection.
dbConnection();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
}))

app.listen(process.env.PORT ,()=>{
    console.log(`server run with ${process.env.PORT}`)
})

app.use('/api',authRouter);
app.use('/api',userRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})
