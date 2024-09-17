import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateAdminJobs = () => {
  const navigate=useNavigate()
  const { companies } = useSelector((store) => store.company);
  // const companies=[ ]
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
    experience: "",
  });

  const ChangeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    setInput({ ...input, companyId: selectedCompany._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/v1/job/post", input, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/jobs")

        
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)}
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2">
            {/* Title Field */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                onChange={ChangeInputHandler}
                value={input.title}
                placeholder="Job Role"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Description Field */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Job description"
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="4"
                value={input.description}
                onChange={ChangeInputHandler}
                required
              ></textarea>
            </div>

            {/* Requirements Field */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Requirements</label>
              <input
                type="text"
                name="requirements"
                placeholder="Job requirements"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={ChangeInputHandler}
                value={input.requirements}
                required
              />
            </div>

            {/* Salary Field */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Salary</label>
              <input
                type="number"
                name="salary"
                placeholder="Enter Salary "
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={ChangeInputHandler}
                value={input.salary}
                required
              />
            </div>

            {/* Location Field */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter location for the job"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={input.location}
                onChange={ChangeInputHandler}
                required
              />
            </div>

            {/* Job Type Field */}

            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">jobType</label>
              <input
                type="text"
                name="jobType"
                placeholder="Job Type"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={input.jobType}
                onChange={ChangeInputHandler}
                required
              />
            </div>

            {/* <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Job Type</label>
              <select
                name="jobType"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div> */}

            {/* Position Field */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Position</label>
              <input
                type="number"
                name="position"
                placeholder="Enter job positions"
                onChange={ChangeInputHandler}
                value={input.position}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Experience Field */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-gray-700">Experience (years)</label>
              <input
                type="number"
                value={input.experience}
                onChange={ChangeInputHandler}
                name="experience"
                placeholder="1"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
          {companies.length !== 0 && (
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company) => {
                    return (
                      <SelectItem
                        value={company?.name?.toLowerCase()}
                        key={company._id}
                      >
                        {company?.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          {/* Submit Button */}

          <div className="mb-4">
            <button
              type="submit"
              className="w-full mt-4 bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              Submit
            </button>

            {companies.length === 0 && (
              <p className="font-medium text-red-600">
                Please register a company before posting a job
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAdminJobs;
