import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Tabs } from 'antd';
import './ExpertDetail.scss';
import avatarUser from '../../assets/user.png';
import SignalRoom from './SignalRoom';
import Information from './Information';
import History from './History';
import Posts from './Posts';

const currentTime = new Date(Date.now());
const day = currentTime.getDate();
const month = currentTime.getMonth();
const year = currentTime.getFullYear();
const date = new Date(year, month, day);
/* eslint-disable */
class ExpertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // active: 'SIGNAL_ROOM'
    };
  }
  componentDidMount() {

    const { firestore, expertId, currentUser, profile} = this.props;
    firestore.get(
      {
        collection: 'users',
        doc: expertId,
        storeAs: 'expertDetail'
      },
    );
    firestore.setListener(
      {
        collection: 'signals',
        where: [['expert.id', '==', expertId], ['closeAt', '>=', date.getTime()]],
        storeAs: 'todayList'
      },
    )
    firestore.setListener(
      {
        collection: 'signals',
        where: [['expert.id', '==', expertId], ['status', '==', "pending"]],
        storeAs: 'pendingList'
      },
    )
    firestore.setListener(
      {
        collection: 'signals',
        where: [['expert.id', '==', expertId], ['status', '==', "active"]],
        storeAs: 'activeList'
      },
    )
  }
  componentWillUnmount(){
    const { firestore, expertId} = this.props
    firestore.unsetListener(
      {
        collection: 'signals',
        where: [['expert.username', '==', expertId], ['status', '==', "active"]]
      },
    )
    firestore.unsetListener(
      {
        collection: 'signals',
        where: [['expert.username', '==', expertId], ['closeAt', '>=', date.getTime()]]
      },
    )
    firestore.unsetListener(
      {
        collection: 'signals',
        where: [['expert.id', '==', expertId], ['status', '==', "pending"]]
      },
    )
  }
  render() {
    const {activeList, pendingList, todayList, expertDetail} = this.props;
    const avatarUrl = (expertDetail.photoURL && expertDetail.photoURL.includes('assets/user.png')) ? avatarUser : expertDetail.photoURL;
    const { expertId, currentUser, profile} = this.props;
    if(profile.role == "expert" && expertId !== currentUser.uid)  return(<div>401 Error. You do not have Sufficient Permissions to Access This Page</div>);
    return (
      <div>
        <div className="profile-container">
          <div className="card-img-profile" />
          <div className="profile-info">
            <img alt="avatar" src={avatarUrl || avatarUser} className="avatar-image" />
            <p className="title-profile">{expertDetail.displayName} </p>
            <p className="sub-profile">Chuyên gia Forex</p>
          </div>
        </div>
        <div className="expert-container">
          <Tabs>
            <Tabs.TabPane tab="Phòng tín hiệu" key="1"><SignalRoom activeList={activeList} pendingList={pendingList} todayList={todayList}/></Tabs.TabPane>
            <Tabs.TabPane tab="Thông tin" key="2"><Information expertDetail={expertDetail} /></Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử" key="3"><History expertDetail={expertDetail}  /></Tabs.TabPane>
            <Tabs.TabPane tab="Bài viết" key="4"><Posts /></Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let currentExpert = {};
  if (state.firestore.ordered.expertDetail && state.firestore.ordered.expertDetail[0]) {
    currentExpert = state.firestore.ordered.expertDetail[0];
  }
  return {
    expertId: state.location.payload.id,
    expertDetail: currentExpert,
    currentUser: state.firebase.auth,
    profile: state.firebase.profile,
    pendingList: state.firestore.ordered.pendingList ? state.firestore.ordered.pendingList : [],
    activeList: state.firestore.ordered.activeList ? state.firestore.ordered.activeList : [],
    todayList: state.firestore.ordered.todayList ? state.firestore.ordered.todayList : [],
  }
}

export default connect(mapStateToProps, null)(withFirestore(ExpertDetail))
