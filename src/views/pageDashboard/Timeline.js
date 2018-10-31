import React, { Component } from 'react';
import moment from 'moment';
import { Table, Button } from 'antd';

/*eslint-disable*/

class Timeline extends Component {
  render() {
    const columns = [
      {
        title: 'Ticket',
        dataIndex: 'ticket',
        key: 'ticket'
      },
      {
        title: 'Chuyên gia',
        dataIndex: 'expert',
        render: expert => <a href={`/#/expert/${expert.id}`}>{expert.displayName}</a>,
        key: 'expert'
      },
      {
        title: 'Lệnh',
        dataIndex: 'signal',
        render: (text, signal) =>
          signal.type === 1 ?
            `Mở lệnh ${signal.typeSignal ? 'SELL' : 'BUY'} ${signal.symbol} tại ${signal.openPrice}` :
            signal.type === 2 ? 'Sửa lệnh' :
              `Đóng lệnh ${signal.typeSignal ? 'SELL' : 'BUY'} ${signal.symbol} tại ${signal.closePrice} lợi nhuận ${signal.profit} pips`,
        key: 'signal'
      },
      {
        title: 'Thời gian',
        dataIndex: 'createdAt',
        render: createdAt => moment(createdAt.seconds * 1000).format('HH:mm DD/MM/YYYY'),
        key: 'createdAt'
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
      }
    ];
    const {
      timelineContent,
      getNextEvents,
      loading,
      moreEvents
    } = this.props;
    return (
    <div className="content-dashboard-container">
      <p className="header-text">Thông Báo</p>
      <div className="table-container">
        <Table
          dataSource={timelineContent}
          bordered
          loading={loading}
          footer={() => <Button disabled={!moreEvents} type="primary" className="detail-btn" onClick={() => getNextEvents()}>Tải thêm</Button>}
          pagination={false}
          columns={columns}
        />
      </div>
    </div>
    );
  }
}
export default Timeline;
