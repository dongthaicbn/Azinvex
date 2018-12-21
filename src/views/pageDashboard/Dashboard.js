import React, { Component } from 'react';

import { compose } from 'recompose';
import { Layout, List } from 'antd';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import DashboardCard from './DashboardComponent/DashboardCard';
import Timeline from './DashboardComponent/Timeline';
import Post from './DashboardComponent/Post';
import { getTopUser, getStatistics, unsetTopUser } from './../../reduxModules/pageDashboard/dashboardActions';
import { getEventsForDashboard } from './../../reduxModules/pageDashboard/notificationActions';
import firebase from './../../utils/redux/configureFirebase';
import './Dashboard.scss';
import isEmpty from '../../utils/helpers/isEmpty';
import ExpertItem from './DashboardComponent/ExpertItem';
import example from '../../assets/example.jpg';
import avatarUser from '../../assets/user.png';
import localize from '../../utils/hocs/localize';
/*eslint-disable*/

class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      moreEvents: false,
      loadedEvents: []
      // loadingInitial: true,
      // contextRef: {}
    };
  }
  getCommand = signal => {
    const { command } = signal;
    switch (command) {
      case 0:
        return `Mở lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} tại ${signal.openPrice} stoploss ${signal.stoploss} takeprofit ${signal.takeprofit}`;
      case 1:
        return `Đóng lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} tại ${signal.closePrice} lợi nhuận ${signal.profit} pips`;
      case 2:
        return `Hủy lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol}`;
      case 3:
        return `Đã khớp lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} tại ${signal.openPrice}`;
      case 4:
        return `Lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} dời stoploss ${signal.oldSL} -> ${signal.newSL}`;
      case 5:
        return `Lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} dời takeprofit  ${signal.oldTP} -> ${signal.newTP}`;
      case 6:
        return `Lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} thay đổi giá mở cửa ${signal.oldOP} -> ${signal.newOP}`;
      default:
        break;
    }
  };
  getTitle = command => {
    switch (command) {
      case 0:
        return `Mở lệnh`;
      case 1:
        return `Đóng lệnh`;
      case 2:
        return `Hủy lệnh`;
      case 3:
        return `Đã khớp lệnh`;
      case 4:
        return `Thay đổi stoploss`;
      case 5:
        return `Thay đổi takeprofit`;
      case 6:
        return `Thay đổi giá mở cửa`;
      default:
        break;
    }
  };
  getTypeSignal = type => {
    switch (type) {
      case "0":
        return "Buy";
      case "1":
        return "Sell";
      case "2":
        return "Buy Limit";
      case "3":
        return "Sell Limit";
      case "4":
        return "Buy Stop";
      case "5":
        return "Sell Stop";
      default:
        return;
    }
  };
  async componentDidMount() {
    const db = firebase.firestore();
    this.props.getTopUser();
    this.props.getStatistics();
    let next = await this.props.getEventsForDashboard();
    db.collection("notifications")
      .where('uid', '==', this.props.currentUser.uid)
      .orderBy('createAt', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        if (!this.state.loadedEvents[0] && snapshot.docs[0]) {
          const newArr = this.state.loadedEvents;
          newArr.unshift(snapshot.docs[0].data());
          this.setState({ loadedEvents: newArr });
        } else if (this.state.loadedEvents[0] && snapshot.docs[0] && snapshot.docs[0].id !== this.state.loadedEvents[0].id) {
          const newArr = this.state.loadedEvents;
          newArr.unshift(snapshot.docs[0].data());
          this.setState({ loadedEvents: newArr });
        }
      });
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true
        // loadingInitial: false
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.timelineContent !== nextProps.timelineContent) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.timelineContent]
      });
    }
  }
  componentWillUnmount() {
    this.props.unsetTopUser();
  }
  getNextEvents = async () => {
    const { timelineContent } = this.props;
    const lastEvent = timelineContent && timelineContent[timelineContent.length - 1];
    const next = await this.props.getEventsForDashboard(lastEvent);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };
  render() {
    const { loading, topExpert, t } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    return (
      <div className="dashboard-container">
        <Layout>
          <Layout.Content>
            <DashboardCard />
            {/* <div className="post-container">
              <div className="card">
                <div className="card-body">
                  <div className="card-img">
                    <img className="card-img-top img-fluid" src="../app-assets/img/photos/14.jpg" alt="Card image cap"/>
                      <h4 className="card-title">Card title</h4>
                      <a className="btn btn-floating halfway-fab bg-warning"><i className="ft-plus" /></a>
                  </div>
                  <div className="card-block">
                    Description content for this post.
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="card-img">
                    <img className="card-img-top img-fluid" src="../app-assets/img/photos/17.jpg" alt="Card image cap"/>
                      <h4 className="card-title">Card title</h4>
                      <a className="btn btn-floating halfway-fab bg-warning"><i className="ft-plus" /></a>
                  </div>
                  <div className="card-block">
                    Description content for this post.
                  </div>
                </div>
              </div>
            </div> */}

            {/*just only show for mobile*/}
            <div className="top-user-mobile">
              <div className="top-expert-header">{t('IDS_TOP_EXPERTS')}</div>
              {!isEmpty(topExpert) &&
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={topExpert}
                renderItem={(item,index) => <ExpertItem index={index} expert={item} />}
              />
              }
            </div>

            <Timeline
              loading={loading}
              moreEvents={moreEvents}
              timelineContent={loadedEvents}
              getNextEvents={this.getNextEvents}
            />
          </Layout.Content>

          <Layout.Sider className="side-bar-right-container">
            <div className="top-expert-header">{t('IDS_TOP_EXPERTS')}</div>
            {!isEmpty(topExpert) &&
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={topExpert}
                renderItem={(item,index) => <ExpertItem index={index} expert={item} />}
              />
            }
          </Layout.Sider>
        </Layout>
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      topExpert: state.firestore.ordered.topExpert,
      currentUser: state.firebase.auth,
      loading: state.async.loading,
      timelineContent: state.events
    }),
    {
      getTopUser,
      getStatistics,
      getEventsForDashboard,
      unsetTopUser
    }
  ),
  localize
)(withFirestore(Dashboard));
