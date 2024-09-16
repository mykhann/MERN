import Navbar from "../shared/Navbar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Pen } from "lucide-react"; // Importing the Lucide React edit icon
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchJobByText } from "@/Redux/jobSlice";
import useGetAdminJobs from "@/customHooks/useGetAdminJobs";

const Jobs = () => {
  useGetAdminJobs();
  const { adminjobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState("");
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  });

  useEffect(() => {
    if (searchJobByText) {
      const filteredjob =
        adminjobs.length > 0 &&
        adminjobs.map((job) => {
          if (!searchJobByText) {
            return null;
          }
          return job?.title
            ?.toLowerCase()
            .includes(searchJobByText?.toLowerCase());
        });
      setFilterJob(filteredjob);
    } else {
      setFilterJob(adminjobs);
    }
  }, [searchJobByText, adminjobs]);

  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between mt-8 max-w-4xl mx-auto space-x-4">
        <input
          type="text"
          placeholder="Search companies..."
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-red-400 focus:border-transparent transition duration-300 ease-in-out h-12"
        />
        <Button
          onClick={() => navigate("/admin/jobs/create")}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400 transition duration-300 ease-in-out h-12"
        >
          Add Job
        </Button>
      </div>

      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-left text-gray-600">Company</th>
              <th className="py-2 px-4 text-left text-gray-600">Role</th>
              {/* <th className="py-2 px-4 text-left text-gray-600">Date</th> */}
              <th className="py-2 px-4 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterJob.length <= 0 ? (
              <span>No jobs found</span>
            ) : (
              filterJob.map((job) => {
                return (
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-left">
                      <h1>{job?.company?.name}</h1>
                    </td>
                    <td className="py-2 px-4 text-left">{job?.title}</td>
                    {/* <td className="py-2 px-4 text-left">Date</td> */}
                    <td className="py-2 px-4 text-left">
                      {/* Popover for Action */}
                      <Popover>
                        <PopoverTrigger>
                          <button
                            onClick={() =>
                              navigate(`/admin/companies/${company?._id}`)
                            }
                            className="text-red-500 hover:translate-x-1 transition-shadow transform-gpu hover:text-red-700"
                          >
                            <Pen />
                          </button>
                        </PopoverTrigger>
                        {/* <PopoverContent className="p-2"> */}
                        {/* Edit button inside the popover */}
                        {/* <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                          
                          </button> */}
                        {/* </PopoverContent> */}
                      </Popover>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Jobs;
