import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Table, Button, Input, InputNumber, Form } from 'antd';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import { setExpert, unsetExpert } from '../../reduxModules/admin/adminActions';

import './User.scss';
/* eslint-disable */
const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: ''
    };
    this.columns = [
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
        editable: true,
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
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
              
                      <Button onClick={() => this.save(form, record)}
                      style={{ marginRight: 8 }} type="primary" >
                        Save
                  </Button>
                    )}
                  </EditableContext.Consumer>
                  <Button style={{ marginRight: 8 }} onClick={() => this.cancel(record.key)} type="primary" >
                  Cancel
              </Button>
                </span>
              ) : (
                <Button style={{ marginRight: 8 }} onClick={() => this.edit(record.key)} type="primary" >
                Edit
              </Button>
              )}
              {record.role === 'expert' ? (
            <Button onClick={() => this.props.unsetExpert(record.id)} type="primary" >
              Unset Expert
            </Button>
          ) : (
            <Button onClick={() => this.props.setExpert(record.id)} type="primary">
              Set Expert
            </Button>
          )}
            </div>
          );
        },
      }
    ];
  }
  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }
  cancel = () => {
    this.setState({ editingKey: '' });
  };
  save(form, key) {
    const { firestore } = this.props
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const { account } = row;
      const { id } = key;
      firestore.update({ collection: 'users', doc: id }, {account});
      this.setState({ editingKey: '' });
    });
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <div> <Table components={components} dataSource={this.props.users} bordered columns={columns} rowClassName="editable-row" /></div>
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
)(withFirestore(User));
