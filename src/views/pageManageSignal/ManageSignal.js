import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { connect } from 'react-redux';
import { Form, Input, Button, Table, Radio, Divider, InputNumber } from 'antd';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';
import { createSignal, updateSignal, selectSignal, closeSignal } from './../../reduxModules/pageManageSignal/signalActions';
import './ManageSignal.scss';

const { Column, ColumnGroup } = Table;
class ManageSignal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  componentDidMount() {
    const { firestore, currentUser } = this.props;
    firestore.setListener(
      {
        collection: 'signals',
        where: [['expert.id', '==', currentUser.uid], ['status', '==', 'active']],
        storeAs: 'myActiveSignals'
      }
    );
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (this.props.selectedSignal) {
        this.props.updateSignal(this.props.selectedSignal.id, values);
      } else {
        this.props.createSignal(values);
      }
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      myActiveSignals,
      selectedSignal,
      selectSignal,
      closeSignal,
      loading
    } = this.props;
    return (
      <div>
        <div className="manage-left-container">
          <p className="header-manage-box">Quản lý tín hiệu</p>
          <Form onSubmit={this.handleSubmit}>
            <p className="title-input">Cặp tiền</p>
            <Form.Item>
              {getFieldDecorator('symbol', {
                initialValue: selectedSignal ? selectedSignal.symbol : '',
                rules: [
                  {
                    required: true,
                    message: 'Cần nhập cặp tiền!',
                    whitespace: true
                  }
                ]
              })(<Input disabled={selectedSignal} />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('type', {
                initialValue: 0,
                rules: [{ required: true, message: 'Please select your type signal!' }],
                required: true
              })(
                <Radio.Group disabled={selectedSignal} buttonStyle="solid">
                  <Radio.Button value="0">BUY</Radio.Button>
                  <Radio.Button value="1">SELL</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
          <Form onSubmit={this.handleSubmit}>
            <p className="title-input">Cắt lỗ</p>
            <Form.Item>
              {getFieldDecorator('stoploss', {
                initialValue: selectedSignal ? selectedSignal.stoploss : 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    min: 0
                  }
                ]
              })(<InputNumber />)}
            </Form.Item>
            <p className="title-input">Chốt lời</p>
            <Form.Item>
              {getFieldDecorator('takeprofit', {
                initialValue: selectedSignal ? selectedSignal.takeprofit : 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    min: 0
                  }
                ]
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                {!selectedSignal ? 'Bắn tín hiệu' : 'Cập nhật'}
              </Button>
              <Divider type="vertical" />
              {selectedSignal && <Button onClick={() => selectSignal(null)} loading={loading} type="danger"> Hủy </Button>}
            </Form.Item>
          </Form>
        </div>
        <div className="manage-right-container">
          <p className="header-manage-box">Các lệnh đang chạy</p>
          <Table dataSource={myActiveSignals} bordered>
            <Column
              title="Ticket"
              dataIndex="ticket"
              key="ticket"
            />
            <Column
              title="Lệnh"
              key="symbol"
              render={signal => signal.typeSignal ? 'SELL ' + signal.symbol : 'BUY ' + signal.symbol}
            />
            <Column
              title="Mở lệnh lúc"
              dataIndex="startAt"
              key="startAt"
              render={startAt => moment(startAt.seconds * 1000).format('HH:mm DD/MM')}
            />
            <Column
              title="Mở tại"
              dataIndex="openPrice"
              key="openPrice"
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
            <Column
              title="Action"
              key="action"
              render={record => (
                <span>
                  <button className="ant-btn ant-btn-primary" onClick={() => selectSignal(record)}>Sửa</button>
                  <Divider type="vertical" />
                  <button className="ant-btn ant-btn-primary" onClick={() => closeSignal(record.id)} >Đóng</button>
                </span>
              )}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default compose(connect(
  state => ({
    currentUser: state.firebase.auth,
    selectedSignal: state.signal.selectedSignal ? state.signal.selectedSignal : null,
    loading: state.async.loading,
    myActiveSignals: state.firestore.ordered.myActiveSignals ? state.firestore.ordered.myActiveSignals : []
  }),
  {
    createSignal,
    updateSignal,
    selectSignal,
    closeSignal
  })
)(Form.create()(withFirestore(ManageSignal)));
