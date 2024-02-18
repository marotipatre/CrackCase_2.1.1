import { useState } from "react";
import axios from "axios";
export default function SignUp(){
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [bio,setBio] = useState("");
    function HandleSubmit(e){
        e.preventDefault()
        ;(async ()=>{
            await axios.post("http://localhost:5000/api/v1/user/signup",{firstname,lastname,email,password,bio}).then(()=>{
                console.log("user registered ")
            }).catch((err)=>{
                console.log("error in signup.jsx",err.response.data.message)
            })
        })()
    }
    return (
        <form onSubmit={(e)=>HandleSubmit(e)}>
            <input type="text" placeholder="firstname" onChange={(e)=>setFirstname(e.target.value)}/>
            <input type="text" placeholder="lastname" onChange={(e)=>setLastname(e.target.value)}/>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="text" placeholder="bio" onChange={(e)=>setBio(e.target.value)}/>
            <button type="submit">submit</button>
        </form>
    )
}