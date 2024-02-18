// Model Imports
const Blog = require("../../Models/UserModel/BlogModel");
const Profile = require("../../Models/UserModel/ProfileModel");

// Create A Blog Post
exports.createBlogPost = async (req, res) => {
  try {
    // Extract data from the request body
    const { title, category, content, tags, comments } = req.body;

    // Validate required fields
    if (!title || !category || !content) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Title, category, and content are required fields.",
      });
    }

    // Use the ObjectId of the authenticated user as the author
    const author = req.user.id; // Assuming userId is the ObjectId of the authenticated user

    // Set publishingTime to current timestamp
    const publishingTime = Date.now();

    // Create a new blog post
    const newBlogPost = await Blog.create({
      title,
      category,
      content,
      tags,
      author,
      comments,
      publishingTime,
    });

    // Return success response
    return res.status(201).json({
      status: "success",
      data: newBlogPost,
      message: "Blog post created successfully!",
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while creating the blog post.",
      error: error.message,
    });
  }
};
// View Blog Post By ID
exports.viewBlogPost = async (req, res) => {
  try {
    // Extract blog ID from request parameters
    const { id } = req.params;
    // If blog post not found, return 404 error
    if (!id) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "Blog id is required",
      });
    }

    // Find the blog post by ID
    const blogPost = await Blog.findById(id);

    // If blog post not found, return 404 error
    if (!blogPost) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "Blog post not found.",
      });
    }

    // Return the blog post
    return res.status(200).json({
      status: "success",
      data: blogPost,
      message: "Blog post fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while fetching the blog post.",
      error: error.message,
    });
  }
};
// View All my blog posts
exports.viewAllMyBlogPosts = async (req, res) => {
  try {
    // Extract user ID from request
    const authorId = req.user.id;

    // Find all blog posts authored by the user
    const myBlogPosts = await Blog.find({ author: authorId });

    // Return the blog posts
    return res.status(200).json({
      status: "success",
      data: myBlogPosts,
      message: "My blog posts fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching my blog posts:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while fetching my blog posts.",
      error: error.message,
    });
  }
};

// Update Blog Post By Id
exports.updateBlogPost = async (req, res) => {
  try {
    // Extract blog ID from request parameters
    const { id } = req.params;

    // Check if the blog ID is provided
    if (!id) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Blog ID is required for updating.",
      });
    }

    // Extract updated data from the request body
    const { title, category, content, tags, comments, publishingTime } =
      req.body;

    // Find the blog post by ID and update it
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      id,
      { title, category, content, tags, comments, publishingTime },
      { new: true, runValidators: true }
    );

    // If blog post not found, return 404 error
    if (!updatedBlogPost) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "Blog post not found.",
      });
    }

    // Return success response
    return res.status(200).json({
      status: "success",
      data: updatedBlogPost,
      message: "Blog post updated successfully!",
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while updating the blog post.",
      error: error.message,
    });
  }
};

// Delete Blog Post By ID
exports.deleteBlogPost = async (req, res) => {
  try {
    // Extract blog ID from request parameters
    const { id } = req.params;

    // Check if the blog ID is provided
    if (!id) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Blog ID is required for deletion.",
      });
    }

    // Find the blog post by ID and delete it
    const deletedBlogPost = await Blog.findByIdAndDelete(id);

    // If blog post not found, return 404 error
    if (!deletedBlogPost) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "Blog post not found.",
      });
    }

    // Return success response
    return res.status(200).json({
      status: "success",
      data: null,
      message: "Blog post deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while deleting the blog post.",
      error: error.message,
    });
  }
};

const mongoose = require("mongoose");

// Get Feed
exports.getFeed = async (req, res) => {
  try {
    // Extract user ID from request
    const userId = req.user.id;
    console.log("User ID:", userId);

    // Fetch user's profile to access interests, pastExperiences, and skills
    const userProfile = await Profile.findOne({ user: userId });
    console.log("User Profile:", userProfile);

    // Extract user's interests, past experiences, and skills
    const userInterests = userProfile.interests;
    const userPastExperiences = userProfile.pastExperiences.map(
      (exp) => exp.jobTitle
    );

    const userSkills = userProfile.skills;

    // Find relevant blog posts based on user's interests, past experiences, skills, tags, content, and category
    const relevantBlogPosts = await Blog.find({
      $or: [
        { category: { $in: userInterests } },
        { "pastExperiences.jobTitle": { $in: userPastExperiences } },
        { tags: { $in: userSkills } },
        { tags: { $in: userInterests } },
        { content: { $regex: new RegExp(req.query.search, "i") } },
        { title: { $regex: new RegExp(req.query.search, "i") } },
        { category: { $regex: new RegExp(req.query.search, "i") } },
      ],
    }).sort({ createdAt: -1 });

    console.log("Relevant Blog Posts:", relevantBlogPosts);

    // Find all other blog posts that do not match the above criteria
    const otherBlogPosts = await Blog.find({
      _id: { $nin: relevantBlogPosts.map((post) => post._id) }, // Exclude relevant blog posts
    }).sort({ createdAt: -1 });

    console.log("Other Blog Posts:", otherBlogPosts);

    // Combine relevant and other blog posts into a single feed array
    const feed = [...relevantBlogPosts, ...otherBlogPosts];

    // Return the feed
    return res.status(200).json({
      status: "success",
      data: feed,
      message: "Feed fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while fetching the feed.",
      error: error.message,
    });
  }
};
