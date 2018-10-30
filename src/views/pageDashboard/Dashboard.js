/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Table, List, Avatar  } from 'antd';
import { withFirestore } from 'react-redux-firebase';
import DashboardCard from './DashboardCard';

import './Dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
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
      }],
      listExpert: [
        {
          name: 'Đặng Hải Long',
          type: 'Follow'
        },
        {
          name: 'Nguyễn Nhật Trung',
          type: 'Unfollow'
        },
        {
          name: 'Brian Nguyen',
          type: 'Follow'
        },
        {
          name: 'JackieHup',
          type: 'Unfollow'
        }
      ]
    };
  }


  render() {
    const { topExpert } = this.props;
    const { data, listExpert } = this.state;
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
      },  {
        title: 'Stoploss',
        dataIndex: 'key'
      },  {
        title: 'Take Profit',
        dataIndex: 'key'
      }
    ];
    return (
      <div className="dashboard-container">
        <DashboardCard />
        <div className="content-dashboard-container">
          <p className="header-text">Top Chuyên Gia FOREX</p>
          {listExpert.map((item, index) => (
            <Card
              hoverable
              key={index}
              style={{ width: 'calc(25% - 20px)', padding: 20, display: 'inline-block', margin: '0 10px' }}
              cover={<img alt="avatar" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Card.Meta
                title={
                  <p>
                    <span>{item.name}</span>
                    <Button type="primary" className="follow-btn">{item.type}</Button>
                  </p>
                }
              />
            </Card>)
          )}
        </div>
        <div className="content-dashboard-container">
          <p className="header-text">Thông Báo</p>
          <div className="table-container">
            <Table columns={columns} dataSource={data} bordered />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    topExpert: state.firestore.ordered.topExpert
  }),
  {
    // action
  }
)(withFirestore(Dashboard));
