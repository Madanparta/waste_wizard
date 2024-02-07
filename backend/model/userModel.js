import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    aadharID:{
        type:String,
        required:true,
    },
    voterID:{
        type:String,
        required:true,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    re_password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone_number:{
        type:String,
        required:true,
    },
},{timestamps:true});

const userModel = mongoose.model("user",userSchema)

export default userModel;