import mongoose from "mongoose";

const compModelSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
    },
    ward_number:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    rate:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
},{timestamps:true});

const Complaint = mongoose.model("Complaint",compModelSchema)

export default Complaint;