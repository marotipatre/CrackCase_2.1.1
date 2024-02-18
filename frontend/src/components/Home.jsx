import { useEffect, useState } from 'react'
import '../home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Home(){
    const [error,setError] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        (async (req, res) => {
            try {
              const jwtToken = localStorage.getItem("CrackCasetoken") || " ";
              console.log(jwtToken)
              axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
              await axios.get("http://localhost:5000/api/v1/user").then((res)=>{
                console.log(res)
              }).catch((err)=>{
                navigate('/login')
              });
            } catch (error) {
              console.error("Error fetching class data:", error);
            }
          })();
    },[])
    return (
    <h1 className='text'>
        {error}
        <h2 className='second'>second</h2>
    </h1>
    )
}