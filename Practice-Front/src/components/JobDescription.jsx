import React, { useEffect, useState } from "react";
import useGetJobs from "../customHooks/useGetJobs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setsingleJob } from "@/Redux/jobSlice";
import { toast } from "sonner";
import { Button } from "./ui/button";

const JobDescription = () => {
  useGetJobs();
  const { singleJob } = useSelector((store) => store.job);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const {user}=useSelector((store)=>store.auth)

  const initiallyApplied=singleJob?.applications?.some((application)=>application.applicant ===user?._id ||false)

    const [isApplied,setIsApplied]=useState(initiallyApplied)

  

  const applyJobHandle=async()=>{

    try {
      const res=await axios.get(`http://localhost:8000/api/v1/application/apply/${jobId}`,{withCredentials:true})
      console.log(res.data)
      if (res.data.success){
        const updatedJob={...singleJob,applications:[{...singleJob.applications},{applicant:user?._id}]}
        dispatch(setsingleJob(updatedJob))
        toast.success(res.data.message)
        setIsApplied(true)
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
      
    }

  }
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/job/get/${jobId}`,{withCredentials:true});
        if (res.data.success) {
          dispatch(setsingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id ))
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-full md:max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg my-6">
      {/* Top section with buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {/* Job Type */}
          <button disabled={true}  className="bg-red-500 rounded-full text-white px-4 py-2 ">
            {singleJob?.jobType || "Job Type"}
          </button>
          {/* Job Salary */}
          <button disabled={true} className="bg-red-700 text-white px-4 py-2 rounded-full ">
            {singleJob?.salary ? `$${singleJob?.salary}` : "Salary"}
          </button>
          {/* Positions */}
          <button disabled={true}  className="bg-red-500 text-white px-4 py-2 rounded-full ">
            {`${singleJob?.position} positions` || "Positions"}
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {singleJob?.title || "Job Role"}
        </h1>
        <div className="text-sm md:text-lg text-gray-600">
          {singleJob?.location || "Location"}
        </div>
      </div>

      {/* Description and Experience */}
      <div className="text-gray-600 mb-8 text-sm md:text-base">
        <p className="mb-4">{singleJob?.description || "Job description not available"}</p>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
          Experience Required:
        </h2>
        <p className="mb-4">{singleJob?.experience || "Not specified"}</p>
      </div>

      {/* Additional Information */}
      <div className="flex flex-col md:flex-row justify-between text-gray-500 text-sm md:text-base mb-4">
        <div className="mb-4 md:mb-0">
          <strong>Total Applicants:</strong> {singleJob?.applications.length || "0"}
        </div>
        <div>
          <strong>Posted on:</strong> {singleJob?.postedDate || "Date not available"}
        </div>
      </div>

      {/* Apply Now Button */}
      <div className="mt-6 text-center md:text-left">
       {
        isApplied?<Button disabled={true} className='bg-red-200'>Already Applied</Button>: <button onClick={isApplied?null:applyJobHandle} className="bg-red-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-red-800 w-full md:w-auto">
        Apply Now
      </button>
       }
      </div>
    </div>
  );
};

export default JobDescription;
