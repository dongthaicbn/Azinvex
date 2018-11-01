import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import './ExpertDetail.scss';

/* eslint-disable */
class Information extends Component {
  render() {
    return (
      <Card className="card-container">
        <p className="header-card">Personal Information</p>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <p className="item-container">
              <p className="text-item"><a>Birthday</a></p>
              <p className="sub-text-item">Invalid Date</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Birthplace</a></p>
              <p className="sub-text-item">Ninh Bình</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Lives in</a></p>
              <p className="sub-text-item">256/6 Độc Lập p.Tân Thành q.Tân Phú, TP.HCM</p>
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <p className="item-container">
              <p className="text-item"><a>Gender</a></p>
              <p className="sub-text-item">Nam</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Email</a></p>
              <p className="sub-text-item">nhattrung.nguyen1990@gmail.com</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Website</a></p>
              <p className="sub-text-item">https://www.myfxbook.com/members/azinvex</p>
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <p className="item-container">
              <p className="text-item"><a>Phone</a></p>
              <p className="sub-text-item">0908745745</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Occupation</a></p>
              <p className="sub-text-item">PHP Developer</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Joined</a></p>
              <p className="sub-text-item">abc</p>
            </p>
          </div>
        </div>
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
)(Information);
