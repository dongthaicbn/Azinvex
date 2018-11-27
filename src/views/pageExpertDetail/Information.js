import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import './ExpertDetail.scss';

/* eslint-disable */
class Information extends Component {

  render() {
    const { expertDetail } = this.props;
    return (
      <Card className="card-container">
        <p className="header-card">Personal Information</p>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <p className="item-container">
              <p className="text-item"><a>Birthday</a></p>
              <p className="sub-text-item">{expertDetail.information && new Date(expertDetail.birthday).toLocaleDateString('en-GB')}</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Birthplace</a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.birthplace}</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Lives in</a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.address}</p>
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <p className="item-container">
              <p className="text-item"><a>Gender</a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.sex == 0 ? "Nữ":"Nam"}</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Email</a></p>
              <p className="sub-text-item">{expertDetail.email}</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Website</a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.website}</p>
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <p className="item-container">
              <p className="text-item"><a>Phone</a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.phone}</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Occupation</a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.occupation}</p>
            </p>
            <p className="item-container">
              <p className="text-item"><a>Joined</a></p>
              <p className="sub-text-item">{new Date(expertDetail.createdAt.seconds * 1000).toLocaleDateString('en-GB')}</p>
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
