import { configureStore,combineReducers } from "@reduxjs/toolkit";
import aboutToggle from "./about/aboutSlice";
import userReducer from "./user/userSlice";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    user:userReducer,
    about:aboutToggle,
})

const persistConfig = {
    key:"root",
    storage,
    version:1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:false}),
})

export const persist = persistStore(store)