import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_CALL } from "@/utils/userApi";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/Redux/authSlice";
import { setUser } from "@/Redux/authSlice";

const Login = () => {
  const {user}=useSelector((store)=>store.auth)
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeInputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const submitEventHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_CALL}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user))
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
    if (user){
      navigate("/");
    }

  },[])
  return (
    <div>
      <Navbar />
      <div className=" bg-gray-100 mx-auto mt-1">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <form
          onSubmit={submitEventHandler}
          className="w-full max-w-md border border-red-400 rounded-md p-6 bg-white shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          
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
                Login
              </Button>
            )}
          </div>

          <div className="text-center mt-2">
            <span>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-800 font-semibold">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
