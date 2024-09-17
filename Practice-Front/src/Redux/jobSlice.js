import { createSlice } from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        job:{},
        singleJob:null,
        adminjobs:{},
        searchJobByText:null,
        appliedJobs:null
    },
    reducers:{
         setJob:(state,action)=>{
            state.job=action.payload

        },
        setsingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAdminJobs:(state,action)=>{
            state.adminjobs=action.payload
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload

        },
        setAppliedJobs:(state,action)=>{
            state.appliedJobs=action.payload
        }
    }
})

export const {setJob,setsingleJob,setAdminJobs,setSearchJobByText,setAppliedJobs}=jobSlice.actions
export default jobSlice.reducer
