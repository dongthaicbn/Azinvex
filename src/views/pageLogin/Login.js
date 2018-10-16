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
      this.props.login({ username: values.userName, password: values.password });
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper">
        <div className="login-form-container">
          <Form onSubmit={this.handleSubmit}>
            <p><b>Username</b></p>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }]
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <p><b>Password</b></p>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }]
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="#/register">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <a href='#/register'>Register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    {
      login
    }
  )
)(Form.create()(Login))
