/* eslint-disable */
import React, { Component } from 'react';
import * as Push from 'push.js'
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import DashboardCard from './DashboardCard';
import TopUsers from './TopUsers';
import Timeline from './Timeline';
import { getTopUser, getStatistics } from './../../reduxModules/pageDashboard/dashboardActions';
import { getEventsForDashboard } from './../../reduxModules/pageDashboard/notificationActions';
import firebase from './../../utils/redux/configureFirebase';
import './Dashboard.scss';

class Dashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {}
  }
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.timelineContent !== nextProps.timelineContent) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.timelineContent]
      });
    }
  }
  async componentDidMount() {
    const db = firebase.firestore();
    this.props.getTopUser();
    this.props.getStatistics();
    Push.Permission.request(function () {
      console.log("GRANTED")
    }, function () {
      console.log("DENIED")
    });
    let next = await this.props.getEventsForDashboard();
    db.collection("notifications")
      .where('uid', '==', this.props.currentUser.uid)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        if (snapshot.docs[0] && snapshot.docs[0].id !== this.state.loadedEvents[0].id) {
          const signal = snapshot.docs[0].data();
          const type = signal.type === 1 ? `Tín hiệu mới` : (signal.type === 2 ? `Thay đổi lệnh ${signal.ticket}` : `Đóng lệnh ${signal.ticket}`)
          let body = '';
          if (signal.type === 1) body = `${signal.typeSignal ? "BUY" : "SELL"} ${signal.symbol} NOW`
          if (signal.type === 2) body = `Cắt lỗ tại: ${signal.stoploss},  Chốt lời tại: ${signal.takeprofit} `
          if (signal.type === 3) body = `Đóng lệnh tại: ${signal.closePrice}, Lợi nhuận: ${signal.profit}`
          Push.create(type, {
            body: body,
            icon: '/icon.png',
            timeout: 4000,
            onClick: function () {
              window.focus();
              this.close();
            }
          });
          let newArr = this.state.loadedEvents;
          newArr.unshift(snapshot.docs[0].data())
          this.setState({ loadedEvents: newArr })
        }
      })
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }
  getNextEvents = async () => {
    const { timelineContent } = this.props;
    let lastEvent = timelineContent && timelineContent[timelineContent.length - 1];
    let next = await this.props.getEventsForDashboard(lastEvent);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };
  render() {
    const { loading } = this.props
    const { moreEvents, loadedEvents } = this.state;
    return (
      <div className="dashboard-container">
        <DashboardCard />
        <TopUsers />
        <Timeline loading={loading}
          moreEvents={moreEvents}
          timelineContent={loadedEvents}
          getNextEvents={this.getNextEvents} />
      </div>
    );
  }
}

export default connect(
  state => ({
    topExpert: state.firestore.ordered.topExpert,
    currentUser: state.firebase.auth,
    loading: state.async.loading,
    timelineContent: state.events,
  }),
  {
    getTopUser,
    getStatistics,
    getEventsForDashboard
  }
)(withFirestore(Dashboard));
