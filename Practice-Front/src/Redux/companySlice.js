import { createSlice } from "@reduxjs/toolkit";

const companySlice= createSlice({
    name:"company",
    initialState:{
        company:null,
        companies:null,
        searchCompanyByText:null,
    },
    reducers:{
        setCompany:(state,action)=>{
            state.company=action.payload
        },
        setAllCompanies:(state,action)=>{
            state.companies=action.payload

        },
        setSearchCompanyByText:(state,action)=>{
            state.searchCompanyByText=action.payload
        }
    }
})

export const {setCompany,setAllCompanies,setSearchCompanyByText}=companySlice.actions
export default companySlice.reducer