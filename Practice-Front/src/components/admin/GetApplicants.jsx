import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/Redux/applicantSlice";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const GetApplicants = () => {
  const dispatch=useDispatch()
  const params=useParams()

  const {applicants}=useSelector((store)=>store.applicant)

  useEffect(()=>{
    
    const fetchAllApplicants=async()=>{
      try {
        const res=await axios.get(`http://localhost:8000/api/v1/application/${params.id}/applicants`)
        dispatch(setApplicants(res.data.job))
        
        
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        
      }
      
    }
    fetchAllApplicants()
  },[dispatch])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold my-5'>{applicants?.applications?.length}</h1>
            <ApplicantsTable/>

        </div>
    </div>
  )
}

export default GetApplicants