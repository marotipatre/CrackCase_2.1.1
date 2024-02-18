export const getAllPosts = async (authToken) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/blog/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to fetch posts");
    }

    console.log("Posts fetched successfully!");
    return responseData;
  } catch (error) {
    console.error("Error while fetching posts:", error.message);
    throw error;
  }
};

export const getPost = async (postId, authToken) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/blog/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to fetch post");
    }

    console.log("Post fetched successfully!");
    return responseData;
  } catch (error) {
    console.error("Error while fetching post:", error.message);
    throw error;
  }
};

