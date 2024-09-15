import { setJob } from "@/Redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JOBS_API = "http://localhost:8000/api/v1/job/get";
const useGetJobs = () => {
  const { jobs } = useSelector((store) => store.job);
  const dispach = useDispatch();

  useEffect(() => {
    const fetchjobs = async () => {
      try {
        const res = await axios.get(JOBS_API, { withCredentials: true });
        if (res.data.success) {
          dispach(setJob(res.data.jobs));
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    fetchjobs();
  }, [dispach]);
};

export default useGetJobs;
