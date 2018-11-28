import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button, Card, Icon, Input, Avatar } from 'antd';
import './ExpertDetail.scss';
import avatarUser from '../../assets/user.png';

/* eslint-disable */
class SignalRoom extends Component {

  capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    const {activeList, pendingList, todayList} = this.props;
    const list = activeList.concat(pendingList).concat(todayList);
    const columns = [
      {
        title: 'Ticket',
        dataIndex: 'id',
        key: 'id'
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
        title: 'Trạng thái',
        dataIndex: 'signal',
        render: (text, signal) =>
        signal.status == "pending" ? (signal.status === 'cancelled' ? 'Đã Hủy' : 'Lệnh Chờ' ) : 'Lệnh Đang Chạy',
        key: 'signal'
      },
      {
        title: 'Thời gian tạo',
        dataIndex: 'createAt',
        render: createAt => moment(createAt.seconds * 1000).format('HH:mm DD/MM/YYYY'),
        key: 'createdAt'
      },
      {
        title: 'Giá mở cửa',
        dataIndex: 'openPrice',
        key: 'openPrice'
      },
      {
        title: 'Kết quả',
        dataIndex: 'profit',
        render: profit =>profit ? profit + " pips" : <img src="https://thumbs.gfycat.com/ImmaculateUnacceptableArizonaalligatorlizard-size_restricted.gif" alt="" height="40px" width="40px" />,
      }
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
        <p className="header-card">Tín hiệu</p>
        <Table
          dataSource={list}
          bordered
          // loading={loading}
          // footer={() => <Button type="primary" className="detail-btn">Tải thêm</Button>}
          columns={columns}
        />
        <br />
        <p className="header-card">Chat</p>
        <div className="chat-container">
          <Card className="card-container chat-content-container">
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
          <Button type="primary" style={{ float: 'right' }}>Gửi</Button>
          <Input
            style={{ float: 'left', width: 'calc(100% - 80px)' }}
            prefix={<Icon type="smile" theme="outlined" />}
            suffix={suffix}
          />
        </div>
      </div>
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
)(SignalRoom);
