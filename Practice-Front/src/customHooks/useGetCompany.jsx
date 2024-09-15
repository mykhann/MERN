import { setCompany } from "@/Redux/companySlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompany = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompany = async () => {
        try {
            const res=await axios.get(`http://localhost:8000/api/v1/company/get/${companyId}`,{
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setCompany(res.data.company))
            }
            
        } catch (error) {
            console.log(error)
        }

    };
    fetchCompany()
  },[companyId,dispatch]);
};

export default useGetCompany;
