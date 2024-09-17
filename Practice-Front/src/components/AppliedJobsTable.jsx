import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs } from "@/Redux/jobSlice";

const jobs = [1, 2, 3, 4];

const AppliedJobsTable = () => {
  const { appliedJobs = [] } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          "http://localhost:8000/api/v1/application/get"
        );
        dispatch(setAppliedJobs(res.data.application));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
  return (
    <div className="mt-2">
      <Table>
        <TableCaption>List of you applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.map((job, index) => {
            return (
              <TableRow key={index}>
                <TableCell>17-07-2024</TableCell>
                <TableCell>{job?.job?.title}</TableCell>
                <TableCell>{job?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      job?.status === "rejected"
                        ? "bg-red-500 text-white"
                        : job?.status === "pending"
                        ? "bg-gray-500 text-white"
                        : job?.status === "accepted"
                        ? "bg-green-500 text-white"
                        : ""
                    }`}
                  >
                    {job?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
