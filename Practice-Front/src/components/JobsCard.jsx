import React from 'react';
import PropTypes from 'prop-types'; // Optional, but recommended for type-checking
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const JobsCard = ( {job} ) => {

  const navigate=useNavigate()
  return (
    <div className="border border-gray-200 rounded-lg p-4 m-4 shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col">
      <div className="flex items-center mb-3">
        <img
          src={job.companyLogo || "https://via.placeholder.com/48"} // Use job.companyLogo if available
          alt="Company logo"
          className="w-12 h-12 object-cover rounded-full mr-4"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
          <span className="text-lg text-gray-600">{job.company.name}</span>
        </div>
      </div>
      <p className="text-gray-700 mb-3">{job.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{job.location || "Location not provided"}</span>
        <span className="text-sm font-semibold text-gray-800">{job.salary || "Salary not provided"}</span>
      </div>
    <div className='flex gap-2 my-2'>
    <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline' className='w-full'>Details</Button>
    
    <Button className='bg-red-500 hover:bg-red-700 w-full'>Save </Button>
    </div>
    </div>
  );
};




export default JobsCard;
