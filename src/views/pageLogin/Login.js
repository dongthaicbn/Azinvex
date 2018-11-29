import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login } from '../../reduxModules/auth/authAction';
import './Login.scss';
/* eslint-disable */
class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => { 
      if (!err) {
        this.props.login({ username: values.userName, password: values.password });
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
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
                    <span className="lab-text">Username</span>
                    <Form.Item>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }]
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
                    <Form.Item>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                      })(
                        <Checkbox>Remember me</Checkbox>
                      )}
                      <a className="login-form-forgot" href="#/register"><span>Forgot password</span></a>
                      <div className="form-group">
                        <Button htmlType="submit" className="login-form-button">Đăng nhập</Button>
                      </div>
                      <div >
                        <button className="stroke-btn-40">Đăng ký</button>
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
    );
  }
}

export default compose(
  connect(
    state => ({
      loading: state.async.loading,
    }),
    {
      login
    }
  )
)(Form.create()(Login))
