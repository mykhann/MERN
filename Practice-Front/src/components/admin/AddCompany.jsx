import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCompany } from "@/Redux/companySlice";

const AddCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch=useDispatch()

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/company/register",
        {companyName},
        { withCredentials: true, 
          headers:{"Content-Type": "application/json"}
        }
      );
      if (res.data.success) {
        dispatch(setCompany(res.data.company))
        const companyId=res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
        toast.success(res.data.message);
      }
    } catch (error) {
      const errormessage=error?.response?.data?.message
        toast.error(errormessage)
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add New Company
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Company Name Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
              
            </label>
            <input
              onChange={(e)=>setCompanyName(e.target.value)}
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Enter company name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex gap-2 w-full">
            <Button type="submit" className="gap-2">
              Add Company
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="gap-2"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
