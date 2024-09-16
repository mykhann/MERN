import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompany from "@/customHooks/useGetCompany";

const CompanySetup = () => {
    const params=useParams()
    const companyId=params.id
    useGetCompany(companyId)
    const {company}=useSelector((store)=>store.company)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const navigate=useNavigate()
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async(e) => {
    e.preventDefault()

    const formData=new FormData();
    formData.append("name",input.name)
    formData.append("description",input.description)
    formData.append("website",input.website)
    formData.append("location",input.location)

    if (input.file){
        formData.append("file",input.file)
    }

    try {
        const res=await axios.put(`http://localhost:8000/api/v1/company/update/${companyId}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        if(res.data.success){
            toast.success(res.data.message)
            navigate("/admin/companies")
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        
    }
    
  }

  useEffect(()=>{
    setInput({
        name: company.name || '',
        description: company.description ||'',
        website: company.website || '',
        location: company.location || '',
        file:company.file || '',
    })

  },[company])
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button onClick={()=>navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label>Logo</Label>
            <Input type="file" name="image/*" onChange={changeFileHandler} />
          </div>
          <Button type='submit' className='w-full mt-8'>Update</Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
