import { setAllCompanies } from '@/Redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchAllCompanies=async()=>{
            try {
                const res = await axios.get("http://localhost:8000/api/v1/company/get", {
                    withCredentials: true
                });
                
                if (res.data.success){
                    dispatch(setAllCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllCompanies()

    },[dispatch])
  


}

export default useGetAllCompanies