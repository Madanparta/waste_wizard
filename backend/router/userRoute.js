import express from "express";
const route = express.Router();
import { create_complaint } from "../controller/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

route.post('/complaint/:userId',verifyUser,create_complaint);

export default route;