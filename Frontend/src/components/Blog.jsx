import React, { useState, useRef, useEffect } from "react";
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createBlogPost } from "../../controllers/CreateBlogController.js";
import Spinner from "../components/Spinner.jsx";
import CreateBlog from "./CreateBlog.jsx";
import AllPosts from "./AllPosts.jsx";
// import "tailwindcss/tailwind.css"; // Import Tailwind CSS

const Blog = () => {
  const [showAddPost,setShowAddPost] = useState(false)
  useEffect(()=>{
    setShowAddPost(false)
    console.log(showAddPost)
  },[])
  return (
  <>
  {!showAddPost ?  <><button onClick={()=>setShowAddPost((curr)=>!curr)}>Create Post</button> <AllPosts/> </>: <CreateBlog/>}
  </>
  )
};

export default Blog;
