import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_CALL } from "@/utils/userApi";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/Redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const changeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.files?.[0] });
  };

  const formData = new FormData();
  formData.append("fullname", input.fullname);
  formData.append("email", input.email);
  formData.append("password", input.password);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("role", input.role);

  const submitEventHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_CALL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 bg-gray-100 mt-1 lg:px-8">
        <form
          onSubmit={submitEventHandler}
          className="w-full max-w-md border border-red-400 rounded-md p-6 bg-white shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          <div className="mb-4">
           
            <Input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Name"
              className="mt-2 w-full"
              value={input.fullname}
              onChange={changeInputHandler}
            />
          </div>
          <div className="mb-4">
            
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="mt-2 w-full"
              value={input.email}
              onChange={changeInputHandler}
            />
          </div>
          <div className="mb-4">
           
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              className="mt-2 w-full"
              value={input.phoneNumber}
              onChange={changeInputHandler}
            />
          </div>
          <div className="mb-4">
        
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="mt-2 w-full"
              value={input.password}
              onChange={changeInputHandler}
            />
          </div>
          <div className="mb-4">
            
            <RadioGroup className="flex gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeInputHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeInputHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mb-4">
           
            <Input
            
              type="file"
              id="profile"
              name="profile"
              accept="image/*"
              onChange={changeFileHandler}
              className="mt-2 w-full cursor-pointer"
            />
          </div>
          <div className="mb-4">
            {loading ? (
              <Button className="w-full bg-red-600 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-red-700 rounded-full hover:bg-red-900"
              >
                Signup
              </Button>
            )}
          </div>
          <span className="block text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
