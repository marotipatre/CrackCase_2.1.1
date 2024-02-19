import React, { useState, useRef } from "react";
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createBlogPost } from "../../controllers/CreateBlogController.js";
import Spinner from "../components/Spinner.jsx";
import "../styles/blog.css";

export default function CreateBlog(){
    const editor = useRef(null);
    const [post, setPost] = useState({
      title: "",
      content: "",
      category: "", // Changed to a single category field
      tags: "",
    });
    const [loading, setLoading] = useState(false);
  
    const fieldChanged = (event) => {
      const { name, value } = event.target;
      setPost({ ...post, [name]: value });
    };
  
    const createPost = async (event) => {
      event.preventDefault();
      if (post.title.trim() === "") {
        toast.error("Post title is required!!");
        return;
      }
      if (post.content.trim() === "") {
        toast.error("Post content is required!!");
        return;
      }
      if (post.category === "") {
        toast.error("Select a category!!");
        return;
      }
  
      // Prepare the data to be sent to the backend
      const postData = {
        title: post.title,
        content: post.content,
        category: post.category,
        tags: post.tags.split(","),
      };
  
      try {
        setLoading(true);
        // Call the createBlogPost controller to send the data to the backend
        const response = await createBlogPost(postData, sessionStorage.getItem("token"));
  
        // Handle success
        alert(response.message);
        console.log("Blog post created successfully:", response);
        toast.success("Post Created!!");
  
        // Reset form fields
        setPost({
          title: "",
          content: "",
          category: "",
          tags: "",
        });
      } catch (error) {
        // Handle error
        alert(error.message);
        console.error("Error creating blog post:", error.message);
        toast.error("Failed to create post");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 flex justify-center items-center">
      <div className="custom-card">
        <div className="custom-card-body">
          <h3 className="text-xl font-semibold mb-4">Write Here!</h3>
          <form onSubmit={createPost}>
            <div className="my-3">
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                className="custom-input"
                name="title"
                value={post.title}
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                id="category"
                placeholder="Enter category"
                className="custom-input"
                name="category"
                value={post.category}
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <textarea
                id="content"
                placeholder="Enter content"
                className="custom-textarea"
                name="content"
                value={post.content}
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                id="tags"
                placeholder="Enter tags (comma-separated)"
                className="custom-input"
                name="tags"
                value={post.tags}
                onChange={fieldChanged}
              />
            </div>

            <div className="custom-button-container">
              <button
                type="submit"
                disabled={loading}
                className="custom-button"
              >
                Create Post
              </button>
              <button
                type="button"
                className="custom-button"
                onClick={() =>
                  setPost({ title: "", content: "", category: "", tags: "" })
                }
              >
                Reset Content
              </button>
              {loading && <Spinner />}
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  };