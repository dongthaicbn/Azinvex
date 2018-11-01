import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'antd';
import './ExpertDetail.scss';

/* eslint-disable */
class Posts extends Component {
  render() {
    return (
      <Card className="card-container">
        <Button type="primary" className="create-notice-btn">
          <Icon type="twitter" theme="outlined" />
          Tạo thông báo mới
        </Button>
        <p className="header-card">User Timeline </p>
      </Card>
    );
  }
}

export default connect(
  state => ({
    // state redux
  }),
  {
    // action
  }
)(Posts);
