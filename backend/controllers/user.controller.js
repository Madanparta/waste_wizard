import { errorHandler } from "../utils/error.js"

export const create_complaint = async(req,res,next)=>{
    console.log(req.body);
    try {
        
    } catch (error) {
        next(error)
    }
}