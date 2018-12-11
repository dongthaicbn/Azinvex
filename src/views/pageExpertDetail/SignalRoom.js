import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { compose } from 'recompose';
import { Table, Button, Card, Icon, Input, Avatar, Modal } from 'antd';
import './ExpertDetail.scss';
import avatarUser from '../../assets/user.png';
import localize from '../../utils/hocs/localize';
import { followSignal, unfollowSignal, isFollowedSignal } from './../../reduxModules/follow/followActions';
import FollowButton from '../components/FollowButton/FollowButton';

/* eslint-disable */
class SignalRoom extends Component {
  state={
    visibleModal: false
  }
  capitalizeFirstLetter = string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };
  getSignalType = string => {
    switch (string) {
      case 'pending':
        return 'Lệnh Chờ';
      case 'cancelled':
        return 'Lệnh Đã Hủy';
      case 'closed':
        return 'Lệnh Đã Đóng';
      default:
        return 'Lệnh Đang Chạy';
    }
  };
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
  handleOkModal = ticket => {
    this.setState({ visibleModal: false });
  }
  handleCancelModal = () => {
    this.setState({ visibleModal: false });
  }
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
  getCommand = signal => {
    const { command } = signal;
    const { t } = this.props;
    switch (command) {
      case 0:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] ${t('IDS_ORDER_OPEN')} ${this.getTypeSignal(signal.type).toLowerCase()} ${signal.symbol} ${t('IDS_AT')} ${signal.openPrice} sl: ${signal.stoploss} tp: ${signal.takeprofit}`;
      case 1:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] ${t('IDS_ORDER_CLOSE')} ${t('IDS_AT')} ${signal.closePrice} ${t('IDS_PROFIT')} ${signal.profit} pips`;
      case 2:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] ${t('IDS_CANCELLED')} `;
      case 3:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] ${t('IDS_ORDER_ACTIVE')} ${t('IDS_AT')} ${signal.openPrice}`;
      case 4:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] ${t('IDS_MOVE')} stoploss ${signal.oldSL} -> ${signal.newSL}`;
      case 5:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] ${t('IDS_MOVE')} takeprofit  ${signal.oldTP} -> ${signal.newTP}`;
      case 6:
        return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] ${t('IDS_MOVE')} ${t('IDS_OPEN_PRICE').toLowerCase()} ${signal.oldOP} -> ${signal.newOP}`;
      default:
        break;
    }
  }
  detail(ticket){
      this.setState({ visibleModal: true });
      this.getSignalLog(ticket);
  }
  render() {
    const { visibleModal } = this.state;
    const { activeList, pendingList, todayList, t, signalLog } = this.props;
    const list = activeList.concat(pendingList).concat(todayList);
    const columns = [
      {
        title: <span>{t('IDS_TICKET')}</span>,
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: <span>{t('IDS_TYPE_COMMAND')}</span>,
        dataIndex: 'type',
        render: type => this.getTypeSignal(type),
        key: 'type'
      },
      {
        title: 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol'
      },
      {
        title: 'Stoploss',
        dataIndex: 'stoploss',
        key: 'stoploss'
      },
      {
        title: 'Takeprofit',
        dataIndex: 'takeprofit',
        key: 'takeprofit'
      },
      {
        title: <span>{t('IDS_STATUS')}</span>,
        dataIndex: 'signal',
        render: (text, signal) =>
          this.getSignalType(signal.status),
        key: 'signal'
      },
      {
        title: <span>{t('IDS_CREATE_TIME')}</span>,
        dataIndex: 'createAt',
        render: createAt => moment(createAt.seconds * 1000).format('HH:mm DD/MM/YYYY'),
        key: 'createdAt'
      },
      {
        title: <span>{t('IDS_OPEN_PRICE')}</span>,
        dataIndex: 'openPrice',
        key: 'openPrice'
      },
      {
        title: <span>{t('IDS_RESULT')}</span>,
        dataIndex: 'profit',
        render: profit =>profit !== undefined ? profit + " pips" : <img src="https://thumbs.gfycat.com/ImmaculateUnacceptableArizonaalligatorlizard-size_restricted.gif" alt="" height="40px" width="40px" />,
      },
      {
        title: t("IDS_ACTION"),
        dataIndex: 'signal',
        render: (text, signal) => <div><Button onClick={() => this.detail(signal.id)} type="primary" className="follow-btn">Chi tiết</Button> <FollowButton signal={signal} t={t} followSignal={this.props.followSignal} unfollowSignal={this.props.unfollowSignal} isFollowedSignal={this.props.isFollowedSignal}  ticket={signal.id} /></div>,
        key: 'follow'
      },
    ];
    const suffix = <Icon type="picture" theme="outlined" />;
    const fakeListChat = [
      { type: 'left', text: 'Hello' },
      { type: 'right', text: 'Ok' },
      { type: 'left', text: 'Hello' },
      { type: 'right', text: 'Ok' },
      { type: 'left', text: 'Hello' },
      { type: 'right', text: 'Ok' },
      { type: 'left', text: 'Hello' },
      { type: 'left', text: 'Hello' },
      { type: 'left', text: 'Hello' },
      { type: 'right', text: 'Ok' },
      { type: 'left', text: 'Hello' },
      { type: 'left', text: 'Hello' },
      { type: 'left', text: 'Hello' },
      { type: 'right', text: 'Ok' },
      { type: 'right', text: 'Ok' },
      { type: 'right', text: 'Ok' }
    ];
    return (
      <div>
        <p className="header-card">{t('IDS_SIGNAL')}</p>
        <Table
          dataSource={list}
          bordered
          rowKey="id"
          // loading={loading}
          // footer={() => <Button type="primary" className="detail-btn">Tải thêm</Button>}
          columns={columns}
        />
        <br />
        <p className="header-card">{t('IDS_CHAT')}</p>
        <div className="chat-container">
          <Card className="card-container chat-content-container common-scroll">
            {fakeListChat.map((item, index) => (
              item.type === 'left' ?
                <div className="chat-text-item" key={index}>
                  <Avatar
                    style={{ verticalAlign: 'middle' }}
                    size="large"
                    src={avatarUser}
                  />
                  <span className="chat-left-content">{item.text}</span>
                </div> :
                <div className="chat-text-item" key={index}>
                  <Avatar
                    style={{ verticalAlign: 'middle', float: 'right' }}
                    size="large"
                    src={avatarUser}
                  />
                  <span className="chat-right-content">{item.text}</span>
                </div>
            ))}
          </Card>
          <Button type="primary" style={{ float: 'right' }}>{t('IDS_SEND')}</Button>
          <Input
            style={{ float: 'left', width: 'calc(100% - 80px)' }}
            prefix={<Icon type="smile" theme="outlined" />}
            suffix={suffix}
          />
        </div>
        <Modal
          title={t('IDS_DETAIL_SIGNAL')}
          visible={visibleModal}
          centered
          onOk={this.handleOkModal}
          onCancel={this.handleCancelModal}
        >
          <ul>
            {signalLog.map(e => <li key={e.id}><b>{this.getCommand(e)}</b></li>)}
          </ul>
        </Modal>
      </div>
    );
  }
}

export default compose(connect(
  state => ({
    signalLog: state.firestore.ordered.signalLog ? state.firestore.ordered.signalLog : []
  }),
{
  followSignal, unfollowSignal, isFollowedSignal
}
),localize)(withFirestore(SignalRoom));
