import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button } from 'antd';
import './ExpertDetail.scss';

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
