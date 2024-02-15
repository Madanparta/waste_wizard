import {createSlice} from '@reduxjs/toolkit';

const initialState={
    about:false,
    userType:"",
}
const aboueSlice = createSlice({
    name:'about',
    initialState,
    reducers:{
        aboutToggle:(state,action)=>{
            state.about = action.payload
        },
        selectUserType:(state,action)=>{
            state.userType = action.payload
        }
    }
});

export const {aboutToggle,selectUserType} = aboueSlice.actions;
export default aboueSlice.reducer;