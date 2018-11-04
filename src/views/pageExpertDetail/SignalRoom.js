import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button, Card, Icon, Input, Avatar } from 'antd';
import './ExpertDetail.scss';
import avatarUser from '../../assets/user.png';

/* eslint-disable */
class SignalRoom extends Component {
  render() {
    const columns = [
      {
        title: 'Cặp tiền',
        dataIndex: 'ticket',
        key: 'ticket'
      },
      {
        title: 'Stoploss',
        dataIndex: 'expert',
        render: expert => <a href={`/#/expert/${expert.id}`}>{expert.displayName}</a>,
        key: 'expert'
      },
      {
        title: 'Take Profit',
        dataIndex: 'signal',
        render: (text, signal) =>
          signal.type === 1 ?
            `Mở lệnh ${signal.typeSignal ? 'SELL' : 'BUY'} ${signal.symbol} tại ${signal.openPrice}` :
            signal.type === 2 ? 'Sửa lệnh' :
              `Đóng lệnh ${signal.typeSignal ? 'SELL' : 'BUY'} ${signal.symbol} tại ${signal.closePrice} lợi nhuận ${signal.profit} pips`,
        key: 'signal'
      },
      {
        title: 'Thời gian mở',
        dataIndex: 'createdAt',
        render: createdAt => moment(createdAt.seconds * 1000).format('HH:mm DD/MM/YYYY'),
        key: 'createdAt'
      },
      {
        title: 'Giá mở cửa',
        dataIndex: 'takeprofit',
        key: 'takeprofit'
      },
      {
        title: 'Kết quả',
        dataIndex: 'stoploss',
        key: 'stoploss'
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
          dataSource={[]}
          bordered
          // loading={loading}
          footer={() => <Button type="primary" className="detail-btn">Tải thêm</Button>}
          pagination={false}
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
