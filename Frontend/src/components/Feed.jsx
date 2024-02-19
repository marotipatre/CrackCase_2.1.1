import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { FaDonate } from "react-icons/fa";
import "../styles/fundraising.css"; // Assuming you have a separate CSS file for fundraising styles

const Feed = () => {
  const fundraisingPosts = [
    {
      id: 1,
      username: 'Masala WAllet',
      post: 'Seeking funding opportunities for our startup',
      tags: ['funding', 'seed fund'],
    },
    {
      id: 2,
      username: 'Ola',
      post: 'We have curated ',
      tags: ['Bootstrap', 'Angel round'],
    },
    {
      id: 3,
      username: 'Community-X',
      post: 'Let\'s come together to provide education to underprivileged children.',
      tags: ['Angel round', 'intial funding'],
    },
  ];

  return (
    <div className="fundraising-wrapper">
      {fundraisingPosts.map((post) => (
        <div key={post.id} className="fundraising-container">
          <FundraisingPost post={post} />
        </div>
      ))}
    </div>
  );
};

const FundraisingPost = ({ post }) => {
  return (
    <Card className="custom-card">
      <CardBody>
        <div className="username">
          <FaDonate className="donate-icon" />
          <span>{post.username}</span>
        </div>
        <p>{post.post}</p>
        <div className="tags">
          {post.tags.map((tag, index) => (
            <Badge className="tag" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Feed;
