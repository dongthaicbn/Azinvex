import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button } from 'antd';
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
  }

  handleConfirmBlur = e => {
    const valueConfirm = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!valueConfirm });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const formPassword = this.props.form;
    if (value && value !== formPassword.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const formConfirm = this.props.form;
    if (value && this.state.confirmDirty) {
      formConfirm.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const prefixSelector = getFieldDecorator('prefix', {
    //   initialValue: '84'
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Select.Option value="84">+84</Select.Option>
    //   </Select>
    // );
    return (
      <div className="register-wrapper">
        <div className="register-form-container">
          <h3>Azinvex</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <p><b>Email<span style={{ color: 'red' }}>*</span></b></p>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!'
                }, {
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </Form.Item>
            <p><b>Password<span style={{ color: 'red' }}>*</span></b></p>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!'
                }, {
                  validator: this.validateToNextPassword
                }]
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <p><b>Confirm Password<span style={{ color: 'red' }}>*</span></b></p>
            <Form.Item>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!'
                }, {
                  validator: this.compareToFirstPassword
                }]
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <p>
              <b>
                <span>Họ tên<span style={{ color: 'red' }}>*</span>&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              </b>
            </p>
            <Form.Item>
              {getFieldDecorator('displayName', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
              })(
                <Input />
              )}
            </Form.Item>
            <p><b>Phone Number<span style={{ color: 'red' }}>*</span></b></p>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }]
              })(
                // addonBefore={prefixSelector}
                <Input style={{ width: '100%' }} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked'
              })(
                <Checkbox>I have read the <a>agreement</a></Checkbox>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Register</Button>
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
      register
    }
  )
)(Form.create()(Register))
