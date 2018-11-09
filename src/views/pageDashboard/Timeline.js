import React, { Component } from 'react';
import moment from 'moment';
import { Table, Button } from 'antd';

/*eslint-disable*/

class Timeline extends Component {
  getCommand(signal) {
    const { command } = signal;
    switch (command) {
      case 0:
        return `Mở lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} tại ${signal.openPrice} với stoploss ${signal.stoploss} và takeprofit ${signal.takeprofit}`;
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
  }
  getTypeSignal(type) {
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
        break;
    }
    return;
  }
  render() {
    const columns = [
      {
        title: "Ticket",
        dataIndex: "ticket",
        key: "ticket"
      },
      {
        title: "Chuyên gia",
        dataIndex: "expert",
        render: expert => (
          <a href={`/#/expert/${expert.id}`}>{expert.displayName}</a>
        ),
        key: "expert"
      },
      {
        title: "Lệnh",
        dataIndex: "signal",
        render: (text, signal) => this.getCommand(signal),
        key: "signal"
      },
      {
        title: "Thời gian",
        dataIndex: "createAt",
        render: createAt => moment(createAt).format("HH:mm DD/MM/YYYY"),
        key: "createAt"
      }
    ];
    const { timelineContent, getNextEvents, loading, moreEvents } = this.props;
    return (
      <div className="content-dashboard-container">
        <p className="header-text">Thông Báo</p>
        <div className="table-container">
          <Table
            dataSource={timelineContent}
            bordered
            loading={loading}
            footer={() => (
              <Button
                disabled={!moreEvents}
                type="primary"
                className="detail-btn"
                onClick={() => getNextEvents()}
              >
                Tải thêm
              </Button>
            )}
            pagination={false}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}
export default Timeline;
