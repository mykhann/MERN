import { setUser } from "@/Redux/authSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const OpenDialogue = ({ open, setOpen }) => {
   
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    file: null,
    skills: user?.profile.skills,
    bio:user?.profile.bio
  });

  const {loading}=((store)=>store.auth)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
       
        className="p-6 rounded-lg shadow-lg bg-white max-w-lg w-full"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="col-span-1 text-gray-700 font-medium"
              htmlFor="fullname"
            >
              Name
            </Label>
            <Input
              value={input.fullname}
              onChange={changeEventHandler}
              id="fullname"
              name="fullname"
              className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="col-span-1 text-gray-700 font-medium"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              value={input.email}
              onChange={changeEventHandler}
              id="email"
              name="email"
              type="email"
              className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="col-span-1 text-gray-700 font-medium"
              htmlFor="phoneNumber"
            >
              Phone No
            </Label>
            <Input
              value={input.phoneNumber}
              onChange={changeEventHandler}
              id="phoneNo"
              name="phoneNumber"
              type="tel"
              className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="col-span-1 text-gray-700 font-medium"
              htmlFor="bio"
            >
              Bio
            </Label>
            <Input
              value={input.bio}
              onChange={changeEventHandler}
              id="bio"
              name="bio"
              className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="col-span-1 text-gray-700 font-medium"
              htmlFor="skills"
            >
              Skills
            </Label>
            <Input
              value={input.skills}
              onChange={changeEventHandler}
              id="skills"
              name="skills"
              className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="col-span-1 text-gray-700 font-medium"
              htmlFor="file"
            >
              Resume
            </Label>
            <Input
              onChange={changeFileHandler}
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <DialogFooter>
            {loading ? (
              <Button disabled={true} className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-900"
              >
                Update
              </Button>
            )}
            
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OpenDialogue;
