import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
    function HandleSubmit(e){
        e.preventDefault()
        console.log(email,password)
        ;(async ()=>{
            await axios.post('http://localhost:5000/api/v1/user/signin',{email,password}).then((res)=>{
                console.log("response ",res.data)
                localStorage.setItem("CrackCasetoken",res.data.token)
                navigate('/')
            }).catch((err)=>{
                console.log("something went wrong in login.jsx",err.response.data.message);
            })
        })()
    }
    return (
        <form onSubmit={(e)=>HandleSubmit(e)}>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">submit</button>
        </form>
    )
}