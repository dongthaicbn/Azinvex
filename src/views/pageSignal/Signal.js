/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, List, Avatar, Button, Modal, Icon } from 'antd';
import moment from 'moment';
import { withFirestore } from 'react-redux-firebase';
import './Signal.scss';
import { listenFollowedExpert, unlistenFollowedExpert } from './../../reduxModules/follow/followActions';
import { followSignal, unfollowSignal, isFollowedSignal } from './../../reduxModules/follow/followActions';

import avatarDefault from '../../assets/user.png';

class Signal extends Component {
  state={
    selectedExpert: undefined,
    itemSignalActive: {},
    visibleModal: false
  }
  componentDidMount() {
    this.props.listenFollowedExpert();
  }
  componentWillUnmount() {
    this.props.unlistenFollowedExpert();
    const { firestore } = this.props;
    firestore.unsetListener({
      collection: 'signals',
      where: [['expert.id', '==', this.state.selectedExpert], ['status', '==', 'active']],
      storeAs: 'activeSignals'
    });
    firestore.unsetListener({
      collection: 'signals',
      where: [['expert.id', '==', this.state.selectedExpert], ['status', '==', 'pending']],
      storeAs: 'pendingSignals'
    });
  }
  isSelected = expertId => {
    return this.state.selectedExpert === expertId;
  }
  selectExpert = async expertId => {
    const { firestore } = this.props;
    if (this.state.selectedExpert) {
      firestore.unsetListener({
        collection: 'signals',
        where: [['expert.id', '==', this.state.selectedExpert], ['status', '==', 'active']],
        storeAs: 'selectedActiveSignals'
      });
      firestore.unsetListener({
        collection: 'signals',
        where: [['expert.id', '==', this.state.selectedExpert], ['status', '==', 'pending']],
        storeAs: 'selectedPendingSignals'
      });
    }
    firestore.setListener({
      collection: 'signals',
      where: [['expert.id', '==', expertId], ['status', '==', 'active']],
      storeAs: 'selectedActiveSignals'
    });
    firestore.setListener({
      collection: 'signals',
      where: [['expert.id', '==', expertId], ['status', '==', 'pending']],
      storeAs: 'selectedPendingSignals'
    });
    this.setState({ selectedExpert: expertId });
  }
  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  handleOkModal = () => {
    this.setState({ visibleModal: false });
  }
  handleCancelModal = () => {
    this.setState({ visibleModal: false });
  }
  getTypeSignal = type => {
    switch (type) {
      case '0':
        return 'Buy';
      case '1':
        return 'Sell';
      case '2':
        return 'Buy Limit';
      case '3':
        return 'Sell Limit';
      case '4':
        return 'Buy Stop';
      case '5':
        return 'Sell Stop';
      default:
        return true;
    }
  };
  getTypeSignalClass = type => {
    switch (type) {
      case '0':
        return 'button-green';
      case '1':
        return 'button-red';
      case '2':
        return 'button-blue';
      case '3':
        return 'button-orange';
      case '4':
        return 'button-purple';
      case '5':
        return 'button-yellow';
      default:
        return true;
    }
  };
  getSignalLog = ticket => {
    const { firestore } = this.props;
    firestore.get(
      {
        collection: 'signals',
        doc: ticket,
        orderBy: 'createAt',
        subcollections: [{ collection: 'logs' }],
        storeAs: 'signalLog'
      }
    );
  }
  getCommand(signal) {
    const { command } = signal;
    switch (command) {
      case 0:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Mở lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} tại ${signal.openPrice} với stoploss ${signal.stoploss} và takeprofit ${signal.takeprofit}`;
      case 1:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Đóng lệnh tại ${signal.closePrice} lợi nhuận ${signal.profit} pips`;
      case 2:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Hủy lệnh `;
      case 3:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Đã khớp lệnh tại ${signal.openPrice}`;
      case 4:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Dời stoploss ${signal.oldSL} -> ${signal.newSL}`;
      case 5:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Dời takeprofit  ${signal.oldTP} -> ${signal.newTP}`;
      case 6:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Thay đổi giá mở cửa ${signal.oldOP} -> ${signal.newOP}`;
      default:
        break;
    }
  }
  detail(ticket) {
    this.setState({ visibleModal: true });
    this.getSignalLog(ticket);
  }
  render() {
    const { itemSignalActive, visibleModal } = this.state;
    const { activeSignals, pendingSignals, signalLog } = this.props;
    const list = activeSignals.concat(pendingSignals);
    const columns = [
      {
        title: 'Ticket',
        dataIndex: 'id',
        render: id => <strong>{id}</strong>,
        key: 'id'
      },
      {
        title: 'Loại lệnh',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render: type => (
          <button className={`button ${this.getTypeSignalClass(type)}`}>
            <Icon type="rise" className="fa" />
            <strong>{this.getTypeSignal(type)}</strong>
          </button>
        )
      },
      {
        title: 'Cặp tiền',
        dataIndex: 'symbol',
        key: 'symbol',
        render: symbol => <strong style={{ color: '#42b0e3' }}>{symbol}</strong>
      },
      {
        title: 'Giá mở cửa',
        dataIndex: 'openPrice',
        key: 'openPrice'
      },
      {
        title: 'Thời gian vào',
        dataIndex: 'startAt',
        render: startAt => moment(startAt).format('HH:mm DD/MM/YYYY'),
        key: 'startAt'
      },
      {
        title: 'Chốt lời',
        dataIndex: 'takeprofit',
        render: takeprofit => <strong style={{ color: 'green' }}>{takeprofit}</strong>,
        key: 'takeprofit'
      },
      {
        title: 'Cắt lỗ',
        dataIndex: 'stoploss',
        key: 'stoploss',
        render: stoploss => <strong style={{ color: 'red' }}>{stoploss}</strong>
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        render: status => (status === 'pending' ?
          <img src="https://i.gifer.com/7plk.gif" alt="" height="40px" width="40px" /> :
          <img src="https://thumbs.gfycat.com/ImmaculateUnacceptableArizonaalligatorlizard-size_restricted.gif" alt="" height="40px" width="40px" />
        )
      },
      {
        title: <span>Hành động</span>,
        dataIndex: 'id',
        render: ticket => <div><Button onClick={() => this.detail(ticket)} type="primary" className="follow-btn">Chi tiết</Button> <FollowButton followSignal={this.props.followSignal} unfollowSignal={this.props.unfollowSignal} isFollowedSignal={this.props.isFollowedSignal}  ticket={ticket} /></div>,
        key: 'follow'
      },
    ];
    return (
      <div className="signal-container">
        <div className="manage-left-container">
          <p className="header-manage-box">Danh sách chuyên gia</p>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={this.props.followedExperts}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <Button
                    disabled={this.isSelected(item.followedId)}
                    onClick={() => this.selectExpert(item.followedId)}
                  >
                    {this.isSelected(item.followedId) ? 'Đang xem' : 'Xem'}
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar shape="square" size="large" src={item.photoURL === '/assets/user.png' ? avatarDefault : item.photoURL} />}
                  title={<a href={`/#/expert/${item.followedId}`}>{item.displayName}</a>}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="manage-right-container">
          <p className="header-manage-box">Danh sách tín hiệu</p>
          <Table
            dataSource={list}
            bordered
            columns={columns}
  
          />
        </div>
        <Modal
          title="CHI TIẾT TÍN HIỆU"
          visible={visibleModal}
          centered
          onOk={this.handleOkModal}
          onCancel={this.handleCancelModal}
        >
          <ul>
            {signalLog.map(e => <li><b>{this.getCommand(e)}</b></li>)}
          </ul>
        </Modal>
      </div>
    );
  }
}
class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowed: false,
      ticket: null
    };
  }

  async componentDidMount() {
    this.setState({ isFollowed: await this.props.isFollowedSignal(this.props.ticket) });
  }
  follow(ticket) {
    const { followSignal } = this.props;
    followSignal(ticket);
    this.setState({ isFollowed: true })
  }
  unfollow(ticket) {
    const { unfollowSignal } = this.props;
    unfollowSignal(ticket)
    this.setState({ isFollowed: false })
  }
  render() {
    const { isFollowed } = this.state;
    const { ticket } = this.props;
    return (
      <span>
        {
          !isFollowed ?
          <Button onClick={() => this.follow(ticket)} type="primary" className="follow-btn">Theo dõi</Button> :
          <Button onClick={() => this.unfollow(ticket)} type="default" className="follow-btn">Bỏ theo dõi</Button>
        }
      </span>
    )
  }
}
export default connect(
  state => ({
    followedExperts: state.firestore.ordered.followedExperts,
    activeSignals: state.firestore.ordered.selectedActiveSignals ? state.firestore.ordered.selectedActiveSignals : [],
    pendingSignals: state.firestore.ordered.selectedPendingSignals ? state.firestore.ordered.selectedPendingSignals : [],
    signalLog: state.firestore.ordered.signalLog ? state.firestore.ordered.signalLog : []
  }),
  {
    listenFollowedExpert,
    unlistenFollowedExpert,
    followSignal,
    unfollowSignal,
    isFollowedSignal
  }
)(withFirestore(Signal));
