import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { setExpert, unsetExpert } from '../../reduxModules/admin/adminActions';
import './User.scss';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Tài khoản expert',
        dataIndex: 'account',
        key: 'account'
      },
      {
        title: 'Quyền',
        dataIndex: 'role',
        key: 'role'
      },
      {
        title: 'Thời gian tạo',
        dataIndex: 'createdAt',
        render: createAt =>
          moment(createAt.seconds * 1000).format('HH:mm DD/MM/YYYY'),
        key: 'createdAt'
      },
      {
        title: 'Hành động',
        dataIndex: 'action',
        render: (text, user) =>
          user.role === 'expert' ? (
            <Button onClick={() => this.props.unsetExpert(user.id)} type="primary" >
              Unset Expert
            </Button>
          ) : (
            <Button onClick={() => this.props.setExpert(user.id)} type="primary">
              Set Expert
            </Button>
          ),
        key: 'action'
      }
    ];
    return (
      <div> <Table dataSource={this.props.users} bordered columns={columns} /></div>
    );
  }
}

export default compose(
  connect(
    state => ({
      users: state.firestore.ordered.users
    }),
    {
      setExpert,
      unsetExpert
    }
  ),
  firestoreConnect(['users'])
)(User);
