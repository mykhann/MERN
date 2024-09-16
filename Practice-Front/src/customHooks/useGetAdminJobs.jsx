import { setAdminJobs } from '@/Redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {

    const dispatch=useDispatch()
    useEffect(()=>{
       const fetchAdminJobs=async()=>{
        try {   
            const res=await axios.get(`http://localhost:8000/api/v1/job/get`)
            if(res.data.success){
                dispatch(setAdminJobs(res.data.jobs))
            }
            
        } catch (error) {
            console.log(error)
            
        }
       }
       fetchAdminJobs()
    },[dispatch])

}

export default useGetAdminJobs