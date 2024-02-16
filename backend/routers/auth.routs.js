import express from "express";
import { getUsers, signIn, signOut, signup } from "../controllers/auth.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.get('/users',verifyUser,getUsers);
router.post('/signup',signup);
router.post('/signin',signIn);
router.post('/signOut',verifyUser,signOut);

export default router;