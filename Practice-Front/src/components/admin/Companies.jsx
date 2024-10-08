import Navbar from "../shared/Navbar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Pen } from "lucide-react"; // Importing the Lucide React edit icon
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useGetAllCompanies from "@/customHooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { setSearchCompanyByText } from "@/Redux/companySlice";

const Companies = () => {
  const dispatch = useDispatch();
  useGetAllCompanies();
  
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company
  ); // Ensure companies is always an array
  const [input, setInput] = useState("");
  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  useEffect(() => {
    if (searchCompanyByText) {
      const filteredCompanies = companies.length > 0 &&
        companies.filter((company) =>
          company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        );
      setFilterCompany(filteredCompanies || []);
    } else {
      setFilterCompany(companies);
    }
  }, [companies, searchCompanyByText]);

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
          onClick={() => navigate("/admin/companies/create")}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400 transition duration-300 ease-in-out h-12"
        >
          Add Company
        </Button>
      </div>

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
            {filterCompany.length <= 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No companies registered
                </td>
              </tr>
            ) : (
              filterCompany.map((company) => (
                <tr className="border-b border-gray-200" key={company._id}>
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
                        <button
                          onClick={() => navigate(`/admin/companies/${company?._id}`)}
                          className="text-red-500 hover:translate-x-1 transition-shadow transform-gpu hover:text-red-700"
                        >
                          <Pen />
                        </button>
                      </PopoverTrigger>
                    </Popover>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Companies;
