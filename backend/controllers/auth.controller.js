import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

export const signup = async (req, res, next) => {
    try {
        const {aadharID,voterID,username,password,re_password,email,phone_number,role} = req.body;
        if(!aadharID || !voterID || !username || !password || !re_password || !email || !phone_number || aadharID === "" || voterID === "" || username === "" || password === "" || re_password === "" || email === "" || phone_number === ""){
            return next(errorHandler(402,"All fields are required"))
        }

        const validUser = await userModel.findOne({email})
        if(validUser){
            return next(errorHandler(402,"user existed.!"))
        }

        const haspassword = bcrypt.hashSync(password,10);

        const newUser = new userModel({
            aadharID,voterID,username,password:haspassword,re_password:haspassword,email,phone_number,role
        })
        await newUser.save()
        res.status(200).json({
            message:"Signup successful"
        })
    } catch (error) {
        next(error)
    }
}

export const signIn = async(req,res,next)=>{
    try {
        const {aadharID,password}=req.body;

        if(!aadharID || !password || aadharID === "" || password === ""){
            return next(errorHandler(402,"All fields are required"));
        }

        const validUser = await userModel.findOne({aadharID})
        if(!validUser){
            return next(errorHandler(404,"user not found."));
        }

        const validPassword = bcrypt.compareSync(password,validUser.password);

        if(!validPassword){
            return next(errorHandler(404,"Invalid password"));
        }
        
        const token = jwt.sign({
            id:validUser._id,
        },process.env.JWT_SECRET,);

        const {password:pass,re_password:re_pas,...rest} =validUser._doc;

        res.status(200).json({rest,token})

    } catch (error) {
        next(error)
    }
}

export const signOut = async (req,res,next)=>{
    if(!req.user){
        return next(errorHandler(401,'User not authentication!'))
    }
    try {
        res.status(200).json({rest:'',token:''});
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        next(error);
    }
}

export const getUsers = async(req,res,next)=>{
    if(!req.user){
        return next(errorHandler(401,'User not authentication!'))
    }
    try {
        const users = await userModel.find({});
        res.status(200).json({
            users:users
        });
    } catch (error) {
        next(error);
    }
}