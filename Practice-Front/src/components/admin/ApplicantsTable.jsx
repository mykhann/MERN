import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const shortlistingstatus = ["Accepted", "Rejected"];

const statusHandler=async(status,id)=>{

  try {
    axios.defaults.withCredentials=true
    const res=await axios.post(`http://localhost:8000/api/v1/application/status/${id}/update`,{status})
    if (res.data.success){
      toast.success(res.data.message)
    }
    
  } catch (error) {
    toast.error(error.response.data.message)
    
  }

}

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.applicant);
  //
  return (
    <div>
      <Table>
        <TableCaption>List of you recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead className="text-right">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants.applications.map((item) => (
              <tr key={item._id}>
                <TableCell className="text-red-600 font-bold">
                  {item.applicant?.fullname}
                </TableCell>
                <TableCell className='text-red-600 font-bold' >{item.applicant?.email}</TableCell>
                <TableCell className="text-blue-500 font-bold">
                  {item.applicant?.phoneNumber}
                </TableCell>
                <a target="_blank" href={item.applicant?.profile?.resume}>
                  <TableCell className="text-blue-600 font-bold hover:text-blue-800">
                    {item.applicant?.profile?.resumeOriginalName}{" "}
                  </TableCell>
                </a>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingstatus.map((status, index) => {
                        return (
                          <div onClick={()=>statusHandler(status,item._id)} key={index}>
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
