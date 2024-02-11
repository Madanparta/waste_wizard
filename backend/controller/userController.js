import { errorHandler } from "../utils/error.js";

export const create_complaint = async (req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(401,'Unathorized'))
    }
    console.log(req.body)
    try {
    } catch (error) {
        next(error);
    }
}