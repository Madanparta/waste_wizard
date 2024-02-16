import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    getUsers:null
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userStart:(state)=>{
            state.error=null;
        },
        userSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.error=null;
        },
        userError:(state,action)=>{
            state.error=action.payload;
        },
        getAllUsersSuccess:(state,action)=>{
            state.getAllUsers=action.payload;
        },
        getAllUsersError:(state,action)=>{
            state.getAllUsers=action.payload;
        }
    }
})

export const {userStart,userSuccess,userError,getAllUsersSuccess,getAllUsersError} = userSlice.actions;
export default userSlice.reducer;