import React, { Component } from 'react';
import { Card, Input, Icon } from 'antd';
import '../ExpertDetail.scss';
import avatarUser from '../../../assets/user.png';

/*eslint-disable*/

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { header, date, children, listComment } = this.props;
    return (
      <Card className="card-dashboard-container">
        <p className="header-post">{header}</p>
        <p className="date-post">{date}</p>

        <div className="content-post">
          {children}
          <p className="comment-header">Bình luận</p>
          <div className="list-comment common-scroll">
            {listComment.map((item, index) => (
              <div className="post-user-information" key={index}>
                <img src={avatarUser} className="avatar-user-post" />
                <div className="comment-item">
                  <p className="user-name-text">Username</p>
                  <span>Hello world</span>
                </div>
              </div>
            ))}
          </div>
          <Input addonAfter={<Icon type="arrow-right" />} placeholder="Write comment" />
        </div>
      </Card>
    );
  }
}

export default Post;
