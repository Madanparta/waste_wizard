import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
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
        
    }
})

export const {userStart,userSuccess,userError} = userSlice.actions;
export default userSlice.reducer;