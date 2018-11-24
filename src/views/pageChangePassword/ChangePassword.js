import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Form, Input, Button } from 'antd';
import { toastr } from 'react-redux-toastr';
import { updatePassword } from '../../reduxModules/auth/authAction';

import './ChangePassword.scss';

/* eslint-disable */
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  reauthenticate = (currentPassword) => {
    const { firebase } = this.props;
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        this.reauthenticate(values.currentPassword).then(async () => {
          await this.props.updatePassword({ password: values.password });
          this.props.form.resetFields()
        }).catch(() => {
          this.props.form.setFieldsValue({
            currentPassword: '',
          });
          toastr.error('Error', "Mật khẩu cũ không chính xác"); });
    })
  };
  handleCancelEdit = () => {
    this.props.form.resetFields()
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="information-container">
        <p className="info-header">Thay đổi mật khẩu</p>
        <div className="change-password-container">
          <Form onSubmit={this.handleSubmit}>
            <p className="title-input-profile">
              <b>Mật khẩu cũ</b>
            </p>
            <Form.Item>
              {getFieldDecorator("currentPassword", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu cũ!"
                  }
                ]
              })(<Input type="password" />)}
            </Form.Item>
            <p className="title-input-profile">
              <b>Mật khẩu mới</b>
            </p>
            <Form.Item>
              {getFieldDecorator("password", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu mới!"
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải dài hơn 6 ký tự!"
                  },
                  {
                    validator: this.validateToNextPassword,
                  }
                ]
              })(<Input type="password"  />)}
            </Form.Item>
            <p className="title-input-profile">
              <b>Nhập lại mật khẩu mới</b>
            </p>
            <Form.Item>
              {getFieldDecorator("confirm", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập lại mật khẩu!"
                  },
                  {
                    validator: this.compareToFirstPassword,
                  }
                ]
              })(<Input type="password"  />)}
            </Form.Item>
            <Form.Item>
              <Button
                loading={this.props.loading}
                onClick={this.handleCancelEdit}
                style={{ marginRight: 20, background: "#ebedf0" }}
              >
                Hủy bỏ
              </Button>
              <Button loading={this.props.loading} type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.async.loading,
  }),
  {
    updatePassword
  }
)(Form.create()(withFirebase(ChangePassword)));
