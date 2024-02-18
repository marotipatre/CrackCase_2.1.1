import React, { useState, useRef } from "react";
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createBlogPost } from "../../controllers/CreateBlogController.js";
import Spinner from "../components/Spinner.jsx";
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
        <Card className="max-w-md w-full rounded-md overflow-hidden shadow-md bg-white">
          <CardBody className="p-6">
            <h3 className="text-xl font-semibold mb-4">Write Here!</h3>
            <Form onSubmit={(e)=>createPost(e)}>
              <div className="my-3">
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400 mb-4"
                  name="title"
                  value={post.title}
                  onChange={fieldChanged}
                />
              </div>
              <div className="my-3">
                <Input
                  type="text"
                  id="category"
                  placeholder="Enter category"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400 mb-4"
                  name="category"
                  value={post.category}
                  onChange={fieldChanged}
                />
              </div>
              <div className="my-3">
                <Input
                  type="text"
                  id="category"
                  placeholder="Enter content"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400 mb-4"
                  name="content"
                  onChange={fieldChanged}
                />
              </div>
              <div className="my-3">
                <Input
                  type="text"
                  id="tags"
                  placeholder="Enter tags (comma-separated)"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400 mb-4"
                  name="tags"
                  value={post.tags}
                  onChange={fieldChanged}
                />
              </div>
  
              <Container className="text-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Create Post
                </Button>
  
                <Button
                  className="ms-2"
                  color="danger"
                  onClick={() =>
                    setPost({
                      title: "",
                      content: "",
                      category: "",
                      tags: "",
                    })
                  }
                >
                  Reset Content
                </Button>
  
                {loading && (
                  <div className="flex justify-center w-full my-3">
                    <Spinner />
                  </div>
                )}
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };