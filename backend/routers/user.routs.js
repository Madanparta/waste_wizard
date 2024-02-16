import express from "express";
const route = express.Router();
import {verifyUser} from '../utils/verifyUser.js';
import { create_complaint, get_all_complaint } from "../controllers/user.controller.js";

route.post('/complaint',verifyUser,create_complaint);
route.get('/complaint',verifyUser,get_all_complaint);

export default route;