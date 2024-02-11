import { createSlice } from "@reduxjs/toolkit";

const initialState={
    complaints:null,
    error:null,
}
const complaintSlice = createSlice({
    name:'complaint',
    initialState,
    reducers:{
        uploadsComplaintStart:(state)=>{
            state.error=null;
        },
        uploadsComplaintSuccss:(state,action)=>{
            state.complaints=action.payload;
            state.error=null;
        },
        uploadsComplaintFailure:(state,action)=>{
            state.error=action.payload;
        },
    }
})

export const {uploadsComplaintStart,uploadsComplaintSuccss,uploadsComplaintFailure} = complaintSlice.actions;
export default complaintSlice.reducer;