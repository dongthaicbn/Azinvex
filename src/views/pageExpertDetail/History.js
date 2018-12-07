import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirestore } from 'react-redux-firebase';
import moment from 'moment';
import { Form, Card, Button, Input, DatePicker, Table, Modal } from 'antd';
import './ExpertDetail.scss';
import { getSignalHistory } from './../../reduxModules/expert/expertActions';

/* eslint-disable */
class History extends Component {

  state = {
    isFilter:false,
    filterSignals: [],
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {},
    visibleModal: false
}
  async componentDidMount(){
    const { expertId } = this.props
    let next = await this.props.getSignalHistory(null, expertId);
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
        let { dateopened, datefixed, symbol } = values;
        let start, end;
        start = moment(dateopened).toDate();
        end = moment(datefixed).toDate();
        if (!dateopened) start = new Date('1980-01-01');
        if (!datefixed) end = new Date(Date.now());
        start = start.getTime();
        end = end.getTime();
        console.log('Received values of form: ', values);
        if (symbol) {
          symbol = symbol.toUpperCase();
          const signalHistoryRef = firestore.collection('signals');
          const query = signalHistoryRef
            .where('expert.id', '==', expertId)
            .where('status', '==', 'closed')
            .where('symbol', '==', symbol)
            .where('startAt', '>', start)
            .where('startAt', '<', end)
            .orderBy('startAt', 'desc')
          let querySnap = await query.get();
          let signalHistory = [];
          for (let i = 0; i < querySnap.docs.length; i++) {
            let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
            signalHistory.push(evt);
          }
          this.setState({ isFilter: true, filterSignals: signalHistory })
        }
        

      else {
          const signalHistoryRef = firestore.collection('signals');
          const query = signalHistoryRef
            .where('expert.id', '==', expertId)
            .where('status', '==', 'closed')
            .where('startAt', '>', start)
            .where('startAt', '<', end)
            .orderBy('startAt', 'desc')
          let querySnap = await query.get();
          let signalHistory = [];
          for (let i = 0; i < querySnap.docs.length; i++) {
            let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
            signalHistory.push(evt);
          }
          this.setState({ isFilter: true, filterSignals: signalHistory })
        }
      }
    });
  }
  reset = () => {
    this.setState({ isFilter: false, filterSignals: [] })
  }
  getNextEvents = async () => {
    const { closedSignals, expertId } = this.props;
    let lastEvent = closedSignals && closedSignals[closedSignals.length - 1];
    let next = await this.props.getSignalHistory(lastEvent, expertId);
    if (next && next.docs && next.docs.length <= 1) {
        this.setState({
            moreEvents: false
        });
    }
};
getSignalLog = ticket => {
  const { firestore } = this.props;
  firestore.get(
    {
      collection: 'signals',
      doc: ticket,
      orderBy: 'createAt',
      subcollections: [{ collection: 'logs' }],
      storeAs: 'signalLog'
    }
  );
}
getTypeSignal = type => {
  switch (type) {
    case '0':
      return 'Buy';
    case '1':
      return 'Sell';
    case '2':
      return 'Buy Limit';
    case '3':
      return 'Sell Limit';
    case '4':
      return 'Buy Stop';
    case '5':
      return 'Sell Stop';
    default:
      return true;
  }
};
getCommand(signal) {
  const { command } = signal;
  switch (command) {
    case 0:
      return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Mở lệnh ${this.getTypeSignal(signal.type)} ${signal.symbol} tại ${signal.openPrice} với stoploss ${signal.stoploss} và takeprofit ${signal.takeprofit}`;
    case 1:
      return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Đóng lệnh tại ${signal.closePrice} lợi nhuận ${signal.profit} pips`;
    case 2:
      return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Hủy lệnh `;
    case 3:
      return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Đã khớp lệnh tại ${signal.openPrice}`;
    case 4:
      return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Dời stoploss ${signal.oldSL} -> ${signal.newSL}`;
    case 5:
      return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Dời takeprofit  ${signal.oldTP} -> ${signal.newTP}`;
    case 6:
      return `[${moment(signal.createAt).format('HH:mm DD/MM/YYYY')}] Thay đổi giá mở cửa ${signal.oldOP} -> ${signal.newOP}`;
    default:
      break;
  }
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
        render: profit => profit + ' pips',
        key: 'profit'
      }
    ];
    const { getFieldDecorator } = this.props.form;
    const { visibleModal } = this.state
    const { signalLog } = this.props
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Card className="card-container">
            <p className="header-card">Filter tín hiệu</p>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="column-container">
                <div className="item-container">
                  <p className="text-item"><a>Tổng số Pips: </a>{this.props.expertDetail.totalpips.toFixed(1)}</p>
                </div>
                <div className="item-container">
                  <p className="text-item"><a>Từ ngày</a></p>
                  <Form.Item>
                {getFieldDecorator('dateopened', {})(
                  <DatePicker />
                )}
              </Form.Item>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="column-container">
                <div className="item-container">
                  <p className="text-item"><a>Số lệnh thắng: </a>{this.props.expertDetail.signalWin}</p>
                </div>
                <div className="item-container">
                  <p className="text-item"><a>Đến ngày</a></p>
                  <Form.Item>
                     {getFieldDecorator('datefixed', {})(
                  <DatePicker />
                )}
              </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="column-container">
                <div className="item-container">
                  <p className="text-item"><a>Số lệnh thua: </a> {this.props.expertDetail.signalLoss}</p>
                </div>
                <div className="item-container">
                  <p className="text-item"><a>Cặp tiền</a></p>
                  <Form.Item>
                     {getFieldDecorator('symbol', {})(
                  <Input />
                )}
               </Form.Item>
                </div>
              </div>
            </div>
            <div className="group-btn">
              <span>
                <Button type="primary" htmlType="submit" className="login-form-button">Tìm kiếm</Button>
              </span>
                <span>
                <Button onClick={()=>this.reset()} type="danger" className="reset-btn">Reset</Button>
              </span>
            </div>

          </Card>
        </Form>
        <Card className="card-container">
          {/* <Button type="primary" className="detail-command-btn">
            Form Actions On Top And Bottom Right
          </Button> */}
          <p className="header-card">Danh sách tín hiệu</p>
          {/* <p>
            To add form actions on top and bottom of the form add a div with.form-actions class to start and end the form. Add.right class to align the form action buttons to right.
          </p> */}
          <br />
          <Table
            dataSource={!this.state.isFilter ? this.state.loadedEvents : this.state.filterSignals}
            bordered
            loading={this.props.loading}
            footer={() => <Button disabled={!this.state.moreEvents} onClick={()=>this.getNextEvents()} type="primary" className="detail-btn">Tải thêm</Button>}
            pagination={false}
            columns={columns}
            onRow={record => {
              return {
                onClick: () => {
                  this.setState({ visibleModal: true });
                  this.getSignalLog(record.id);
                }
              };
            }}
          />
        </Card>
        <Modal
          title="CHI TIẾT TÍN HIỆU"
          visible={visibleModal}
          centered
          onOk={this.handleOkModal}
          onCancel={this.handleCancelModal}
        >
          <ul>
            {signalLog.map(e => <li key={e.id}><b>{this.getCommand(e)}</b></li>)}
          </ul>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    expertId: state.location.payload.id,
    closedSignals: state.expert,
    loading: state.async.loading,
    signalLog: state.firestore.ordered.signalLog ? state.firestore.ordered.signalLog : []
  }
}

export default compose(
  connect(
    mapStateToProps,
    {getSignalHistory}
  )
)(Form.create()(withFirestore(History)))
