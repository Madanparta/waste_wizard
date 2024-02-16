import Complaint from "../Model/comp.model.js"
import { errorHandler } from "../utils/error.js"

export const create_complaint = async(req,res,next)=>{
    const {ward_number,category,description,rate,image} = req.body;
    console.log(image)
    if(!req.user){
        return next(errorHandler(401,"User not authentication!"));
    }
    try {
        await Complaint.create({ward_number,category,description,rate,image,userID:req.user.id})
        res.status(200).json({
            message:'succesfully posted complaint'
        })

    } catch (error) {
        next(error)
    }
}

export const get_all_complaint = async(req,res,next)=>{
    if(!req.user){
        return next(errorHandler(401,"User not authentication!"));
    }
    try {
        const data = await Complaint.find({});
        res.status(200).json({
            data:data
        });
    } catch (error) {
        next(error)
    }
}