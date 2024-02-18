import { Outlet } from "react-router-dom"
export default function Layout(){
    return(
        <div className="">
        <h1>header</h1>
        <Outlet/>
        <h1>footer</h1>
        </div>
    )
}