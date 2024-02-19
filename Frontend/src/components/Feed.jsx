import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { FaUserCircle } from "react-icons/fa";
import "../styles/feed.css";

const Feed = () => {
  const feeds = [
    {
      id: 1,
      username: 'Gandharv_K_2003',
      post: 'arrrrr mix ae re te, he bg ek cook ae he pani ghetl ani atta he testing',
      tags: ['GG', 'Gilbi', 'dhadi'],
    },
    {
      id: 2,
      username: 'Siddc.11',
      post: 'Tr namaskar mandali, kasa kay baki kasa sagl ayush... In feugiat elit quis justo ultricies viverra.',
      tags: ['kalakar', 'shant', 'sabhya'],
    },
    {
      id: 3,
      username: 'Madhukrishnan',
      post: 'aaighalya ho arr salya hoooo.',
      tags: ['haaa', 'okkkk', 'brrrr'],
    },
  ];

  return (
    <div className="feed-wrapper">
      {feeds.map((feed) => (
        <div key={feed.id} className="feed-container">
          <UserFeed feed={feed} />
        </div>
      ))}
    </div>
  );
};

const UserFeed = ({ feed }) => {
  return (
    <Card className="custom-card">
      <CardBody>
        <div className="username">
          <FaUserCircle className="user-profile-icon" />
          <span>{feed.username}</span>
        </div>
        <p>{feed.post}</p>
        <div className="tags">
          {feed.tags.map((tag, index) => (
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