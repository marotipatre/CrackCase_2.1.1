import React, { useEffect, useState } from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { FaHeart } from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import { getPost } from "../../controllers/PostController";
import Spinner from "./Spinner";
import { formatDateTime } from "../utils/dateConversion.js";

const Post = () => {
  const location = useLocation();

  const postID = location.state?.postId;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      setLoading(true); // Set loading to true before making the API call

      try {
        const response = await getPost(postID, token);
        setPost([response.data]);
        console.log(response.data, "data");
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false); // Set loading back to false after the API call completes
      }
    };
    fetchData();
  }, []);
  return (
    <div style={styles.wrapper}>
      {post == null && "Loading"}
      {post &&
        post?.map((p) => (
          <div key={p._id} style={styles.postContainer}>
            <UserPost post={p} />
            <Comments comments={p.comments} />
          </div>
        ))}
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    minHeight: "calc(100vh - 56px)",
  },
  postContainer: {
    maxWidth: "800px",
    width: "100%",
    marginBottom: "2rem",
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    marginBottom: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    animation: "fadeInUp 0.5s ease",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  createdAt: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    fontSize: "0.8rem",
    color: "#777",
  },
  likeCount: {
    position: "absolute",
    bottom: "0.5rem",
    left: "0.5rem",
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    color: "#777",
  },
  heartIcon: {
    marginRight: "0.5rem",
    color: "red",
  },
};

const UserPost = ({ post }) => {
  return (
    <Card style={{ ...styles.card, ...styles.postContainer }}>
      <CardBody>
        <span style={styles.createdAt}>{formatDateTime(post.createdAt)}</span>
        <h2 className="mb-3">{post.title}</h2>
        <div className="mb-3">
          {post.tags.map((tag, index) => (
            <Badge color="success" className="me-2" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
        <p>
          <strong>Category:</strong> {post.category}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div style={styles.likeCount}>
          <FaHeart style={styles.heartIcon} />
          {post.likeCount}
        </div>
      </CardBody>
    </Card>
  );
};

const Comments = ({ comments }) => {
  return (
    <div>
      <Card style={styles.card}>
        <CardBody>
          <h3>Comments</h3>
          <hr style={{ margin: "2rem 0" }} />
          {comments.map((comment) => (
            <div key={comment.id} className="mb-2">
              <strong>{comment.author}:</strong> {comment.text}
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default Post;
