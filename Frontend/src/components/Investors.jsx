import { useEffect, useState } from "react";
import axios from 'axios'
export default function Investors() {
    const [data,setData] = useState([])
    useEffect(()=>{
        ;(async()=>{
            await axios.get("https://randomuser.me/api/?page=1&results=4&seed=abc").then((res)=>{
                setData(res.data.results)
                console.log(res.data.results)
            }).catch((err)=>{
                console.log(err)
            })
        })()
    },[])
  return (
    <div style={{display:"flex", justifyContent:"space-evenly", margin:"2rem"}}>
    {data.map((item)=>
            <div className="card" style={{width: "18rem"}}>
            <img src={item.picture.large} class="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.name.first} {item.name.last}</h5>
              <p className="card-text">
                {item.email}<br/>
                {item.location.city},{item.location.state}<br/>{item.location.country}<br/>
                {item.location.postcode}
              </p>
              <a href="#" class="btn btn-primary">
                Get In Touch
              </a>
            </div>
          </div>
    )}
    </div>
  );
}