import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { forgot } from '../../reduxModules/auth/authAction';
import './Forgot.scss';
/* eslint-disable */
class Forgot extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => { 
      if (!err) {
        this.props.forgot(values.email);
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
                    <span className="lab-text">Email</span>
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }]
                      })(
                        <Input prefix={<Icon type="user"/>} placeholder="Email"/>
                      )}
                    </Form.Item>
                    
                    <Form.Item>
                      <div className="form-group">
                        <Button htmlType="submit" className="login-form-button">Submit</Button>
                      </div>
                    </Form.Item>
                  </Form>
                  <div className="register-btn">
                    <button className="stroke-btn-40" onClick={() => window.location.href = '#/login'}>Đăng nhập</button>
                  </div>
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
      forgot
    }
  )
)(Form.create()(Forgot))
