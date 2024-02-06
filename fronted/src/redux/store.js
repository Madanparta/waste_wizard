import { configureStore } from "@reduxjs/toolkit";
import aboutToggle from "./about/aboutSlice";

const store = configureStore({
    reducer:{
        about:aboutToggle,
    }
})

export default store;