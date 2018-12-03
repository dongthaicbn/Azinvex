import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button } from 'antd';
import { register } from '../../reduxModules/auth/authAction';
import './Register.scss';

/* eslint-disable */
class Register extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.register( values );
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const valueConfirm = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!valueConfirm });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const formPassword = this.props.form;
    if (value && value !== formPassword.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const formConfirm = this.props.form;
    if (value && this.state.confirmDirty) {
      formConfirm.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-register">
        <div className="login-wrapper">
          <div className="login-form-container">
            <div className="row">
              <div className="col-5">
                <div className="login-form-header">
                  <span className="text-tit-small"> welcome to</span>
                  <span className="text-tit-big">Cộng Đồng Bắn Tín Hiệu FOREX</span>
                </div>
                <div className="login-form-content">
                  <Form onSubmit={this.handleSubmit}>
                    <span className="lab-text">Email</span>
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your E-mail!' }]
                      })(
                        <Input prefix={<Icon type="user"/>} placeholder="Username"/>
                      )}
                    </Form.Item>
                    <span className="lab-text">Password</span>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }]
                      })(
                        <Input prefix={<Icon type="lock"/>} type="password" placeholder="Password" />
                      )}
                    </Form.Item>
                    <span className="lab-text">Họ tên</span>
                    <Form.Item>
                      {getFieldDecorator('displayName', {
                        rules: [{ required: true, message: 'Please input name!' }]
                      })(
                        <Input />
                      )}
                    </Form.Item>
                    <span className="lab-text">Số điện thoại</span>
                    <Form.Item>
                      {getFieldDecorator('displayName', {
                        rules: [{ required: true, message: 'Please input phone number!' }]
                      })(
                        <Input />
                      )}
                    </Form.Item>
                    <Form.Item>
                      <div className="form-group">
                        <Button htmlType="submit" className="login-form-button">Đăng ký</Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <div className="col-7 bg-form-ic-wpman">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(
    state => ({
      loading: state.async.loading,
    }),
    {
      register
    }
  )
)(Form.create()(Register))
