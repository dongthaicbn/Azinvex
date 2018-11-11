import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirestore } from 'react-redux-firebase';
import moment from 'moment';
import { Form, Card, Button, Input, DatePicker, Table } from 'antd';
import './ExpertDetail.scss';
import { getSignalHistoryForDashboard } from './../../reduxModules/expert/expertActions';

/* eslint-disable */
class History extends Component {

  state = {
    isFilter:false,
    filterSignals: [],
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {}
}
  async componentDidMount(){
    const { expertId } = this.props
    console.log(expertId)
    let next = await this.props.getSignalHistoryForDashboard(null, expertId);
    console.log(next);
    if (next && next.docs && next.docs.length > 1) {
        this.setState({
            moreEvents: true,
            loadingInitial: false
        });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.closedSignals !== nextProps.closedSignals) {
        this.setState({
            loadedEvents: [...this.state.loadedEvents, ...nextProps.closedSignals]
        });
    }
}
  handleSubmit = e => {
    e.preventDefault();
    const { firestore, expertId } = this.props
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let {dateopened, datefixed, symbol} = values;
        let start, end;
        start = moment(dateopened).toDate();
        end = moment(datefixed).toDate();
        symbol = symbol.toUpperCase();
        if (!dateopened) start = new Date('1980-01-01');
        if (!datefixed) end = new Date(Date.now());
        start = start.getTime();
        end = end.getTime();
        console.log(start, end);
        if (symbol){
          const signalHistoryRef = firestore.collection('signals');
          const query = signalHistoryRef
          .where('expert.id', '==', expertId)
          .where('status', '==', 'closed')
          .where('symbol', '==', symbol)
          .where('startAt', '>', start)
          .where('startAt', '<', end)
      let querySnap = await query.get();
      let signalHistory = [];
      for (let i = 0; i < querySnap.docs.length; i++) {
          let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
          signalHistory.push(evt);
      }
      this.setState({ isFilter: true, filterSignals: signalHistory })
        }
        console.log('Received values of form: ', values);
      }
      else{
        const signalHistoryRef = firestore.collection('signals');
        const query = signalHistoryRef
            .where('expert.id', '==', expertId)
            .where('status', '==', 'closed')
            .where('startAt', '>', start)
            .where('startAt', '<', end)
        let querySnap = await query.get();
        let signalHistory = [];
        for (let i = 0; i < querySnap.docs.length; i++) {
            let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
            signalHistory.push(evt);
        }
        this.setState({ isFilter: true, filterSignals: signalHistory })
    }
    });
  }

  render() {
    const columns = [
      {
        title: 'Ticket',
        dataIndex: 'id',
        key: 'ticket'
      },
      {
        title: 'Cặp tiền',
        dataIndex: 'symbol',
        key: 'symbol'
      },
      {
        title: 'Giá mở cửa',
        dataIndex: 'openPrice',
        key: 'openPrice'
      },
      {
        title: 'Stop Loss',
        dataIndex: 'stoploss',
        key: 'stoploss'
      },
      {
        title: 'Take Profit',
        dataIndex: 'takeprofit',
        key: 'takeprofit'
      },
      {
        title: 'Thời gian mở',
        dataIndex: 'startAt',
        render: startAt => moment(startAt).format('HH:mm DD/MM/YYYY'),
        key: 'startAt'
      },
      {
        title: 'Giá đóng cửa',
        dataIndex: 'closePrice',
        key: 'closePrice'
      },
      {
        title: 'Thời gian đóng',
        dataIndex: 'closeAt',
        render: closeAt => moment(closeAt).format('HH:mm DD/MM/YYYY'),
        key: 'closeAt'
      },
      {
        title: 'Kết quả',
        dataIndex: 'profit',
        key: 'profit'
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
          <Form onSubmit={this.handleSubmit}>
        <Card className="card-container">
          <Button type="primary" className="detail-command-btn">
            Chi tiết lệnh
          </Button>
        
          <p className="header-card">Filter Lệnh</p>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="column-container">
              <p className="item-container">
                <p className="text-item"><a>Tổng số Pips: </a>9.30</p>
              </p>
              <p className="item-container">
                <p className="text-item"><a>FROM</a></p>
                <Form.Item>
              {getFieldDecorator('dateopened', {})(
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
                   {getFieldDecorator('datefixed', {})(
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
                   {getFieldDecorator('symbol', {})(
                <Input />
              )}
             </Form.Item>
              </p>
            </div>
          </div>
          <p className="group-btn">
            <span>
              <Button type="primary" htmlType="submit" className="login-form-button">Tìm kiếm</Button>
            </span>
              <span>
              <Button type="danger" className="reset-btn">Reset</Button>
            </span>
          </p>
      
        </Card>    </Form>
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
            dataSource={!this.state.isFilter ? this.state.loadedEvents : this.state.filterSignals}
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
const mapStateToProps = state => {
  return {
    expertId: state.location.payload.id,
    closedSignals: state.expert,
    loading: state.async.loading,
  }
}

export default compose(
  connect(
    mapStateToProps,
    {getSignalHistoryForDashboard}
  )
)(Form.create()(withFirestore(History)))
