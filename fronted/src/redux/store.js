import { configureStore } from "@reduxjs/toolkit";
import aboutToggle from "./about/aboutSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
    reducer:{
        about:aboutToggle,
        user:userReducer
    }
})

export default store;