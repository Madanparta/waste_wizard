import express from "express";
import dbConnection from "./dbConnection/db.js"
import userRouter from "./router/userRouter.js";
import dotenv from 'dotenv';
dotenv.config()
const app = express();

// database connection.
dbConnection();

app.use(express.json());

app.listen(process.env.PORT ,()=>{
    console.log(`server run with ${process.env.PORT}`)
})

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