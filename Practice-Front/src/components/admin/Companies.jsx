import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { DotSquare, Edit, LucideEdit, Pen } from "lucide-react"; // Importing the Lucide React edit icon
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setCompany } from "@/Redux/companySlice";
import useGetAllCompanies from "@/customHooks/useGetAllCompanies";

const Companies = () => {
  useGetAllCompanies()
  const {companies}=useSelector((store)=>store.company)
  // Static job data

  
  
  const handleEdit = (id) => {
    console.log(`Editing job with ID: ${id}`);
    
  };

  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Button
        onClick={() => navigate("/admin/companies/create")}
        className="mt-3 mx-auto flex flex-end"
      >
        Add Company
      </Button>
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-left text-gray-600">Logo</th>
              <th className="py-2 px-4 text-left text-gray-600">Company</th>
              <th className="py-2 px-4 text-left text-gray-600">Date</th>
              <th className="py-2 px-4 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              companies.length <=0?<span>No companies registered</span>:(
                companies.map((company)=>{
                  return (
                    <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-left">
                      <img
                          src={company.logo}
                        alt={company.logo}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-2 px-4 text-left">{company?.name}</td>
                    <td className="py-2 px-4 text-left">Date</td>
                    <td className="py-2 px-4 text-left">
                      {/* Popover for Action */}
                      <Popover>
                        <PopoverTrigger>
                          <button className="text-blue-500 hover:text-blue-700">
                            <Pen />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2">
                          {/* Edit button inside the popover */}
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                            <LucideEdit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                  )

                })
              )
              
            }
           
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Companies;
