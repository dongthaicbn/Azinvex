import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';
import './ManageSignal.scss';

class ManageSignal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park'
    }, {
      key: '2',
      name: 'Jim Green',
      tel: '0571-22098333',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park'
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park'
    }, {
      key: '4',
      name: 'Jim Red',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park'
    }, {
      key: '5',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park'
    }];
    const columns = [{
      title: 'Lệnh',
      dataIndex: 'name'
    }, {
      title: 'Cặp Tiền',
      dataIndex: 'age'
    }, {
      title: 'TL/TP',
      dataIndex: 'phone'
    }, {
      title: 'Thời Gian Vào',
      dataIndex: 'address'
    }, {
      title: 'Trạng Thái',
      dataIndex: 'tel'
    }, {
      title: 'Hành Động',
      dataIndex: 'key'
    }];
    return (
      <div>
        <div className="manage-left-container">
          <p className="header-manage-box">Quan ly tin hieu</p>
          <Form onSubmit={this.handleSubmit}>
            <p className="title-input">Cặp tiền</p>
            <Form.Item>
              {getFieldDecorator('currency', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Cần nhập cặp tiền!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                BUY
              </Button>
              <Button type="primary" htmlType="submit" className="sell-btn">
                SELL
              </Button>
            </Form.Item>
          </Form>
          <Form onSubmit={this.handleSubmit}>
            <p className="title-input">STOP LOSS</p>
            <Form.Item>
              {getFieldDecorator('stopLoss', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Cần nhập stop loss!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <p className="title-input">TAKE PROFIT</p>
            <Form.Item>
              {getFieldDecorator('takeProfit', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Cần nhập take profit!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Bắn tín hiệu
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="manage-right-container">
          <p className="header-manage-box">Các lệnh đang chạy</p>
          <Table columns={columns} dataSource={data} bordered />
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
)(Form.create()(ManageSignal));
