import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Button, Input, DatePicker, Table } from 'antd';
import './ExpertDetail.scss';

/* eslint-disable */
class History extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const columns = [
      {
        title: 'Ticket',
        dataIndex: 'ticket',
        key: 'ticket'
      },
      {
        title: 'Cặp tiền',
        dataIndex: 'ticket',
        key: 'ticket'
      },
      {
        title: 'Giá mở cửa',
        dataIndex: 'takeprofit',
        key: 'takeprofit'
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
        title: 'Giá đóng cửa',
        dataIndex: 'takeprofit',
        key: 'takeprofit'
      },
      {
        title: 'Thời gian đóng',
        dataIndex: 'createdAt',
        render: createdAt => moment(createdAt.seconds * 1000).format('HH:mm DD/MM/YYYY'),
        key: 'createdAt'
      },
      {
        title: 'Kết quả',
        dataIndex: 'stoploss',
        key: 'stoploss'
      }
    ];
    return (
      <div>
        <Card className="card-container">
          <Button type="primary" className="detail-command-btn">
            Chi tiết lệnh
          </Button>
          <Form onSubmit={this.handleSubmit}>
          <p className="header-card">Filter Lệnh</p>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="column-container">
              <p className="item-container">
                <p className="text-item"><a>Tổng số Pips: </a>9.30</p>
              </p>
              <p className="item-container">
                <p className="text-item"><a>FROM</a></p>
                <Form.Item>
              {getFieldDecorator('dateopened', null)(
                <DatePicker />
              )}
            </Form.Item>
              
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="column-container">
              <p className="item-container">
                <p className="text-item"><a>Số lệnh thắng: </a>1</p>
              </p>
              <p className="item-container">
                <p className="text-item"><a>TO</a></p>
                <Form.Item>
                   {getFieldDecorator('datefixed', null)(
                <DatePicker />
              )}
            </Form.Item>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="column-container">
              <p className="item-container">
                <p className="text-item"><a>Số lệnh thua: </a> 0</p>
              </p>
              <p className="item-container">
                <p className="text-item"><a>Cặp tiền</a></p>
                <Form.Item>
                   {getFieldDecorator('symbol', null)(
                <Input />
              )}
             </Form.Item>
              </p>
            </div>
          </div>
          <p className="group-btn">
            <span>
              <Button type="submit">Tìm kiếm</Button>
            </span>
              <span>
              <Button type="primary" className="reset-btn">Reset</Button>
            </span>
          </p>
          </Form>
        </Card>
        <Card className="card-container">
          <Button type="primary" className="detail-command-btn">
            Form Actions On Top And Bottom Right
          </Button>
          <p className="header-card">Timesheet</p>
          <p>
            To add form actions on top and bottom of the form add a div with.form-actions class to start and end the form. Add.right class to align the form action buttons to right.
          </p>
          <br />
          <Table
            dataSource={[]}
            bordered
            // loading={loading}
            footer={() => <Button type="primary" className="detail-btn">Tải thêm</Button>}
            pagination={false}
            columns={columns}
          />
        </Card>
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
)(History);
