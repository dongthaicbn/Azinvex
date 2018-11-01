import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import './ExpertDetail.scss';
import avatarUser from '../../assets/user.png';
import SignalRoom from './SignalRoom';
import Information from './Information';
import History from './History';
import Posts from './Posts';

/* eslint-disable */
class ExpertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // active: 'SIGNAL_ROOM'
    };
  }
  render() {
    return (
      <div>
        <div className="profile-container">
          <div className="card-img-profile" />
          <div className="profile-info">
            <img alt="avatar" src={avatarUser} className="avatar-image" />
            <p className="title-profile">Nguyễn Nhật Trung</p>
            <p className="sub-profile">Chuyên gia Forex</p>
          </div>
        </div>
        <div className="expert-container">
          <Tabs>
            <Tabs.TabPane tab="Phòng tín hiệu" key="1"><SignalRoom /></Tabs.TabPane>
            <Tabs.TabPane tab="Thông tin" key="2"><Information /></Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử" key="3"><History /></Tabs.TabPane>
            <Tabs.TabPane tab="Bài viết" key="4"><Posts /></Tabs.TabPane>
          </Tabs>
        </div>
      </div>
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
)(ExpertDetail);
