import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { FaUserCircle } from "react-icons/fa";

const Feed = () => {
  const feeds = [
    {
      id: 1,
      username: "Gandharv_K_2003",
      post: "arrrrr mix ae re te, he bg ek cook ae he pani ghetl ani atta he testing",
      tags: ["GG", "Gilbi", "dhadi"],
    },
    {
      id: 2,
      username: "Siddc.11",
      post: "Tr namaskar mandali, kasa kay baki kasa sagl ayush... In feugiat elit quis justo ultricies viverra.",
      tags: ["kalakar", "shant", "sabhya"],
    },
    {
        id: 3,
        username: "Madhukrishnan",
        post: "aaighalya ho arr salya hoooo.",
        tags: ["haaa", "okkkk", "brrrr"],
      },
  ];

  return (
    <div style={styles.wrapper}>
      {feeds.map((feed) => (
        <div key={feed.id} style={styles.feedContainer}>
          <UserFeed feed={feed} />
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
  feedContainer: {
    maxWidth: "800px",
    width: "100%",
    marginBottom: "0.5rem",
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
  username: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  userProfileIcon: {
    marginRight: "0.5rem",
    fontSize: "1.5rem",
    color: "#777",
  },
};

const UserFeed = ({ feed }) => {
  return (
    <Card style={styles.card}>
      <CardBody>
        <div style={styles.username}>
          <FaUserCircle style={styles.userProfileIcon} />
          <span>{feed.username}</span>
        </div>
        <p>{feed.post}</p>
        <div className="mb-3">
          {feed.tags.map((tag, index) => (
            <Badge color="success" className="me-2" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Feed;
