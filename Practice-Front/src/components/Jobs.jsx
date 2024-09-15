import React from "react";
import Navbar from "./shared/Navbar";
import JobsCard from "./JobsCard";
import { useSelector } from "react-redux";
import useGetJobs from "../../src/customHooks/useGetJobs";

const Jobs = () => {
  useGetJobs(); // Fetch jobs when the component mounts

  // Access jobs from Redux store
  const { job } = useSelector((store) => store.job);

 

  return (
    <div>
      
      <div className="flex flex-wrap">
        {job && job.length > 0 ? (
          job.slice(0,6).map((job) => (
            <div key={job._id} className="w-full md:w-1/3 lg:w-1/4 p-4">
              <JobsCard job={job} />
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
