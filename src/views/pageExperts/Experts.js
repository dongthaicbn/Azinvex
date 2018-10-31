import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpertCard from './ExpertCard';
import { listenExperts, unlistenExperts } from './../../reduxModules/expert/expertActions';
import './Experts.scss';

/* eslint-disable */
class Experts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listExpert: [
        {
          name: 'Đặng Hải Long',
          type: 'Follow'
        },
        {
          name: 'Nguyễn Nhật Trung',
          type: 'Unfollow'
        },
        {
          name: 'Brian Nguyen',
          type: 'Follow'
        },
        {
          name: 'JackieHup',
          type: 'Unfollow'
        }
      ]
    };
  }
  componentDidMount(){
    this.props.listenExperts();
  }
  componentWillUnmount(){
    this.props.unlistenExperts();
  }
  handleDetail = id => {
    window.location.href = `#/expert/${id}`;
  };
  render() {
    const { experts } = this.props;
    return (
      <div className="expert-container">
        <div className="content-container">
          <p className="header-text">Danh Sách Chuyên Gia</p>
          <p className="sub-header-text">Tổng Hợp Những Chuyên gia forex hàng đầu từ khắp mọi nơi</p>
          {experts && experts.map(expert => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    experts: state.firestore.ordered.experts
  }),
  {
    listenExperts,
    unlistenExperts
  }
)(Experts);
