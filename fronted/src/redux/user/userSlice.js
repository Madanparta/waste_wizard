import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    loading:false,
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        userSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.error=null
        },
        userError:(state,action)=>{
            state.error=action.payload,
            state.loading=false
        }
    }
})

export const {userStart,userSuccess,userError} = userSlice.actions;
export default userSlice.reducer;