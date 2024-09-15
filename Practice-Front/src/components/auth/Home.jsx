import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Hero from "../Hero";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {user}=useSelector((store)=>store.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    if (user?.role === 'recruiter'){
      navigate("/admin/companies")
    }


  },[])
  return (
    <div>
      <Navbar />

      <Hero />
    </div>
  );
};

export default Home;
