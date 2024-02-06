import {createSlice} from '@reduxjs/toolkit';

const initialState={
    about:false,
}
const aboueSlice = createSlice({
    name:'about',
    initialState,
    reducers:{
        aboutToggle:(state,action)=>{
            state.about = action.payload
        }
    }
});

export const {aboutToggle} = aboueSlice.actions;
export default aboueSlice.reducer;