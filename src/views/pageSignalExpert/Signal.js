import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, List, Avatar, Button, Modal, Icon } from 'antd';
import moment from 'moment';
import { withFirestore } from 'react-redux-firebase';
import './Signal.scss';
import { listenExperts, unlistenExperts } from './../../reduxModules/expert/expertActions';

class Signal extends Component {
  state={
    selectedExpert: undefined,
    visibleModal: false
  }
  componentDidMount() {
    this.props.listenExperts();
  }
  componentWillUnmount() {
    this.props.unlistenExperts();
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
  isSelected = expertId => this.state.selectedExpert === expertId;

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
  capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
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
    firestore.get({
      collection: 'signals',
      doc: ticket,
      orderBy: 'createAt',
      subcollections: [{ collection: 'logs' }],
      storeAs: 'signalLog'
    });
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
  render() {
    const { visibleModal } = this.state;
    const { activeSignals, pendingSignals, signalLog } = this.props;
    const list = activeSignals.concat(pendingSignals);
    const columns = [
      {
        title: 'Ticket',
        dataIndex: 'id',
        width: 100,
        fixed: 'left',
        render: id => <strong>{id}</strong>,
        key: 'id'
      },
      {
        title: 'Loại lệnh',
        dataIndex: 'type',
        width: 180,
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
        width: 100,
        className: 'aaa',
        render: symbol => <strong style={{ color: '#42b0e3' }}>{symbol}</strong>,
        key: 'symbol'
      },
      {
        title: 'Giá mở cửa ',
        width: 120,
        dataIndex: 'openPrice',
        key: 'openPrice'
      },
      {
        title: 'Thời gian vào',
        width: 160,
        dataIndex: 'startAt',
        render: startAt => moment(startAt).format('HH:mm DD/MM/YYYY'),
        key: 'startAt'
      },
      {
        title: 'Chốt lời',
        width: 120,
        dataIndex: 'takeprofit',
        render: takeprofit => <strong style={{ color: 'green' }}>{takeprofit}</strong>,
        key: 'takeprofit'
      },
      {
        title: 'Cắt lỗ',
        width: 120,
        dataIndex: 'stoploss',
        render: stoploss => <strong style={{ color: 'red' }}>{stoploss}</strong>,
        key: 'stoploss'
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: 100,
        fixed: 'right',
        key: 'status',
        align: 'center',
        render: status => (
          status === 'pending' ? <img src="https://i.gifer.com/7plk.gif" alt="" height="40px" width="40px" /> : <img src="https://thumbs.gfycat.com/ImmaculateUnacceptableArizonaalligatorlizard-size_restricted.gif" alt="" height="40px" width="40px" />
        )
      }
    ];
    return (
      <div>
        <div className="manage-left-container">
          <p className="header-manage-box">Danh sách chuyên gia</p>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={this.props.experts}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <Button
                    disabled={this.isSelected(item.id)}
                    onClick={() => this.selectExpert(item.id)}
                  >
                    {this.isSelected(item.id) ? 'Đang xem' : 'Xem'}
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.photoURL} />}
                  title={<a href={`/#/expert/${item.id}`}>{item.displayName}</a>}
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
            scroll={{ x: 1000, y: 800 }}
            onRow={record => ({
                onClick: () => {
                  this.setState({ visibleModal: true });
                  this.getSignalLog(record.id);
                }
              })
            }
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
            {signalLog.map(e => <li key={e.id}><b>{this.getCommand(e)}</b></li>)}
          </ul>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    experts: state.firestore.ordered.experts,
    activeSignals: state.firestore.ordered.selectedActiveSignals
      ? state.firestore.ordered.selectedActiveSignals
      : [],
    pendingSignals: state.firestore.ordered.selectedPendingSignals
      ? state.firestore.ordered.selectedPendingSignals
      : [],
    signalLog: state.firestore.ordered.signalLog
      ? state.firestore.ordered.signalLog
      : []
  }),
  {
    listenExperts,
    unlistenExperts
  }
)(withFirestore(Signal));
