import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, List, Avatar, Button, Modal } from 'antd';
import moment from 'moment';
import { withFirestore } from 'react-redux-firebase';
import './Signal.scss';
import { listenFollowedExpert, unlistenFollowedExpert } from './../../reduxModules/follow/followActions';

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
  render() {
    const { itemSignalActive, visibleModal } = this.state;
    const { activeSignals, pendingSignals } = this.props;
    const list = activeSignals.concat(pendingSignals);
    const columns = [
      {
        title: 'Ticket',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Loại lệnh',
        dataIndex: 'type',
        key: 'type',
        render: type => this.getTypeSignal(type)
      },
      {
        title: 'Cặp tiền',
        dataIndex: 'symbol',
        key: 'symbol'
      },
      {
        title: 'Giá mở cửa ',
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
        key: 'takeprofit'
      },
      {
        title: 'Cắt lỗ',
        dataIndex: 'stoploss',
        key: 'stoploss'
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: status => status === 'pending' ? 'Lệnh Chờ' : 'Lệnh Đang Chạy'
      }
    ];
    return (
      <div>
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
                  avatar={<Avatar src={item.photoURL} />}
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
            onRow={record => {
              return {
                onClick: () => {
                  this.setState({ visibleModal: true, itemSignalActive: { ...record } });
                }
              };
            }}
          />
        </div>
        <Modal
          title="CHI TIẾT TÍN HIỆU"
          visible={visibleModal}
          centered
          onOk={this.handleOkModal}
          onCancel={this.handleCancelModal}
        >
          <p>{itemSignalActive.id}</p>
          <p>{itemSignalActive.signal}</p>
          <p>{itemSignalActive.signal}</p>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    followedExperts: state.firestore.ordered.followedExperts,
    activeSignals: state.firestore.ordered.selectedActiveSignals ? state.firestore.ordered.selectedActiveSignals : [],
    pendingSignals: state.firestore.ordered.selectedPendingSignals ? state.firestore.ordered.selectedPendingSignals : []
  }),
  {
    listenFollowedExpert,
    unlistenFollowedExpert
  }
)(withFirestore(Signal));
