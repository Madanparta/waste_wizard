import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routers/auth.routs.js';
import userRouter from './routers/user.routs.js';
import dbConnection from "./dbConnections/db.js";
import bodyParser from 'body-parser';
dotenv.config()
const app = express();

// database connection.
dbConnection();

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
}))


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

app.listen(process.env.PORT ,()=>{
    console.log(`server run with ${process.env.PORT}`)
})
