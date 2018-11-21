import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import '../Dashboard.scss';
import chatIcon from '../../../assets/icon/chat.png';

/*eslint-disable*/

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { header, children } = this.props;
    return (
      <Card className="card-dashboard-container">
        <p className="header-post">{header}</p>
        <div className="content-post">
          {children}
        </div>
        <div className="footer-post">
          <Icon type="like" />&nbsp;5
          <span className="right-footer">
            <img src={chatIcon} />&nbsp;10
          </span>
        </div>
      </Card>
    );
  }
}

export default Post;
