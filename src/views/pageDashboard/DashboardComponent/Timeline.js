import React, { Component } from 'react';
import moment from 'moment';
import { compose } from 'recompose';
import { Table, Button } from 'antd';
import localize from '../../../utils/hocs/localize';

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
  getCommand = signal => {
    const { command } = signal;
    const { t } = this.props;
    switch (command) {
      case 0:
        return `${t('IDS_ORDER_OPEN')} ${this.getTypeSignal(signal.type)} ${signal.symbol} ${t('IDS_AT')} ${signal.openPrice} sl: ${signal.stoploss} tp: ${signal.takeprofit}`;
      case 1:
        return `${t('IDS_ORDER_CLOSE')} ${this.getTypeSignal(signal.type)} ${signal.symbol}  ${t('IDS_AT')} ${signal.closePrice} ${t('IDS_PROFIT')} ${signal.profit} pips`;
      case 2:
        return `${t('IDS_CANCELLED')} ${this.getTypeSignal(signal.type)} ${signal.symbol}`;
      case 3:
        return `${t('IDS_ORDER')} ${this.getTypeSignal(signal.type)} ${signal.symbol}  ${t('IDS_ORDER_ACTIVE')} ${t('IDS_AT')} ${signal.openPrice}`;
      case 4:
        return `${t('IDS_ORDER')} ${this.getTypeSignal(signal.type)} ${signal.symbol} ${t('IDS_MOVE')} stoploss ${signal.oldSL} -> ${signal.newSL}`;
      case 5:
        return `${t('IDS_ORDER')} ${this.getTypeSignal(signal.type)} ${signal.symbol}  ${t('IDS_MOVE')} takeprofit  ${signal.oldTP} -> ${signal.newTP}`;
      case 6:
        return `${t('IDS_ORDER')} ${this.getTypeSignal(signal.type)} ${signal.symbol}  ${t('IDS_MOVE')} ${t('IDS_OPEN_PRICE').toLowerCase()} ${signal.oldOP} -> ${signal.newOP}`;
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
    const { timelineContent, getNextEvents, loading, moreEvents, t } = this.props;
    const columns = [
      {
        title: <span>{t('IDS_TICKET')}</span>,
        dataIndex: "ticket",
        class: "aaa",
        key: "ticket"
      },
      {
        title: <span>{t('IDS_EXPERT')}</span>,
        dataIndex: "expert",
        render: expert => (
          <a href={`/#/expert/${expert.id}`}>{expert.displayName}</a>
        ),
        key: "expert"
      },
      {
        title: <span>{t('IDS_COMMANDS')}</span>,
        dataIndex: "signal",
        render: (text, signal) => <span style={{fontWeight: "bold"}}>{this.getCommand(signal)}</span>,
        key: "signal"
      },
      {
        title: <span>{t('IDS_TIME')}</span>,
        dataIndex: "createAt",
        render: createAt => moment(createAt).format("HH:mm DD/MM/YYYY"),
        key: "createAt"
      }
    ];
    return (
      <div className="content-dashboard-container">
        <p className="header-text">{t('IDS_NOTICE')}</p>
        <div className="table-container">
          <Table
            dataSource={timelineContent}
            bordered
            rowKey="ticket"
            loading={loading}
            footer={() => (
              <Button
                disabled={!moreEvents}
                type="primary"
                className="detail-btn"
                onClick={() => getNextEvents()}
              >
                {t('IDS_LOAD_MORE')}
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
export default compose(localize)(Timeline);
