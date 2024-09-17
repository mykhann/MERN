import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { User, Mail, Briefcase, Phone, Edit3, Pen } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "../../src/components/ui/badge";
import { Label } from "./ui/label";
import Navbar from "./shared/Navbar";
import OpenDialogue from "./OpenDialogue";
import AppliedJobsTable from "./AppliedJobsTable";


const UserProfile = () => {
  const { user } = useSelector((store)=>store.auth)
  const isResume=user?.profile.resume

  const skills = ["Node.js", "Express"];

  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="rounded-md max-w-4xl mx-auto p-6 bg-gray-200">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100">
        <div className="relative p-6 bg-white shadow-lg rounded-2xl transform transition-transform 3d-effect">
          <div className="absolute top-4 right-4">
            <Button variant="outline" className="text-right">
              <Pen onClick={() => setOpen(true)} />
            </Button>
          </div>

          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg transform transition-transform hover:scale-110">
              <AvatarImage src={user?.profile.profilePhoto} alt={user?.fullname} />
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {user?.fullname}
              </h1>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">
              Profile Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="text-gray-500" />
                <span className="font-medium text-gray-600">Name:</span>
                <span>{user?.fullname}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-500" />
                <span className="font-medium text-gray-600">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-500" />
                <span className="font-medium text-gray-600">Phone No:</span>
                <span>{user?.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="text-gray-500" />
                <span className="font-medium text-gray-600">Role:</span>
                <span>{user?.role}</span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-bold">Skills</h1>
            {skills.length !== 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap 1.5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume ? (
              <a
                className="cursor-pointer text-blue-500 w-full hover:underline"
                href={isResume}
                target="_blank"
                value={isResume}
                rel="noopener noreferrer"
              >
                {isResume}
                
              </a>
            ) : (
              <span className="font-bold text-md">NA</span>
            )}
          </div>
        </div>

        <OpenDialogue open={open} setOpen={setOpen} />
        <AppliedJobsTable/>
      </div>
    </>
  );
};

export default UserProfile;
