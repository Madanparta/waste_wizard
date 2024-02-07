import express from "express";
import { signIn, signup } from "../controller/userController.js";
const userRouter = express.Router();

userRouter.post('/sign-up',signup);
userRouter.post('/sign-in',signIn);

export default userRouter;