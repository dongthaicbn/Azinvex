/* eslint-disable */
import React, { Component } from 'react';
import moment from 'moment';
import { Table, Button } from 'antd';
const { Column, ColumnGroup  } = Table;

class Timeline extends Component {
  render() {
    const columns = [
      {
        title: 'Ticket',
        dataIndex: 'age'
      }, {
        title: 'Name',
        dataIndex: 'name'
      }, {
        title: 'TP/SL',
        dataIndex: 'phone'
      }, {
        title: 'Close Price',
        dataIndex: 'address'
      }, {
        title: 'Date',
        dataIndex: 'tel'
      }, {
        title: 'Profit',
        dataIndex: 'key'
      }, {
        title: 'Stoploss',
        dataIndex: 'key'
      }, {
        title: 'Take Profit',
        dataIndex: 'key'
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
          >
            <Column
              title="Ticket"
              dataIndex="ticket"
              key="ticket"
            />
            <Column
              title="Chuyên gia"
              dataIndex="expert"
              key="expert"
              render={expert => <a href={"/#/expert/" + expert.id}>{expert.displayName}</a>}
            />
            <Column
              title="Lệnh"
              key="signal"
              render={signal => signal.type === 1 ? `Mở lệnh ${signal.typeSignal ? 'SELL' : 'BUY'} ${signal.symbol} tại ${signal.openPrice}` : (signal.type === 2 ? 'Sửa lệnh' : `Đóng lệnh ${signal.typeSignal ? 'SELL' : 'BUY'} ${signal.symbol} tại ${signal.closePrice} lợi nhuận ${signal.profit} pips`) }
            />
            <Column
              title="Thời gian"
              dataIndex="createdAt"
              key="createdAt"
              render={createdAt => moment(createdAt.seconds * 1000).format('HH:mm DD/MM/YYYY')}
            />
            <Column
              title="Chốt lời"
              dataIndex="takeprofit"
              key="takeprofit"
            />
            <Column
              title="Cắt lỗ"
              dataIndex="stoploss"
              key="stoploss"
            />
          </Table>
      </div>
    </div>
    );
  }
}
export default Timeline;
