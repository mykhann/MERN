import { createSlice } from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        job:{},
        singleJob:null,
    },
    reducers:{
         setJob:(state,action)=>{
            state.job=action.payload

        },
        setsingleJob:(state,action)=>{
            state.singleJob=action.payload
        }
    }
})

export const {setJob,setsingleJob}=jobSlice.actions
export default jobSlice.reducer
