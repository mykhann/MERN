import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/Redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">
            <Link to="/">
              Job <span className="text-[#F83002]">Portal</span>
            </Link>
          </h1>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-12">
          <ul className="hidden md:flex font-medium items-center gap-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex gap-2 md:gap-3">
              <Link to="/login">
                <Button variant="outline" className="text-sm md:text-base">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-600 hover:bg-red-900 text-sm md:text-base">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile.profilePhoto} alt="@shacn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-red-400 p-4 rounded-lg text-white">
                <div className="flex items-center gap-3 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile.profilePhoto}
                      alt="@shacn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm">{user?.profile.bio || "No Bio"}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Link to="/profile">
                    {" "}
                    {user && user.role === "student" ? (
                      <Button variant="link" className="text-white">
                        {/* Button content here */}
                      </Button>
                    ) : null}
                  </Link>
                </div>
                <div className="mt-2">
                  <Button
                    className="text-red-600 font-bold w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
