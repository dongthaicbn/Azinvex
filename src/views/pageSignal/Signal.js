import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, List, Avatar } from 'antd';
import './Signal.scss';

/*eslint-disable*/
class Signal extends Component {
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
          name: 'Đặng Hải Long'
        },
        {
          name: 'Nguyễn Nhật Trung'
        },
        {
          name: 'Brian Nguyen'
        },
        {
          name: 'JackieHup'
        }
      ]
    };
  }
  render() {
    const { data, listExpert } = this.state;
    const columns = [{
      title: 'Ticket',
      dataIndex: 'name'
    }, {
      title: 'Lệnh',
      dataIndex: 'age'
    }, {
      title: 'TP/SL',
      dataIndex: 'phone'
    }, {
      title: 'Thời Gian Vào',
      dataIndex: 'address'
    }, {
      title: 'Trạng Thái',
      dataIndex: 'tel'
    }, {
      title: 'Kết quả',
      dataIndex: 'key'
    }];
    return (
      <div>
        <div className="manage-left-container">
          <p className="header-manage-box">Danh sách chuyên gia</p>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={listExpert}
            renderItem={item => (
              <List.Item actions={[<a>View</a>]}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.name}</a>}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="manage-right-container">
          <p className="header-manage-box">Danh sách tín hiệu</p>
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
)(Signal);
