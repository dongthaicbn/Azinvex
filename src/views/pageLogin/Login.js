import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login } from '../../reduxModules/auth/authAction';
import './Login.scss';
import localize from '../../utils/hocs/localize';
/* eslint-disable */
class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => { 
      if (!err) {
        this.props.login({ email: values.email, password: values.password });
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { t } = this.props;
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
                        rules: [{ required: true, message: t('IDS_REQ_EMAIL_MESS') }]
                      })(
                        <Input prefix={<Icon type="user"/>} placeholder="Email"/>
                      )}
                    </Form.Item>
                    <span className="lab-text">Password</span>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: t('IDS_REQ_PASSWORD_MESS') }]
                      })(
                        <Input prefix={<Icon type="lock"/>} type="password" placeholder="Password" />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                      })(
                        <Checkbox>Ghi nhớ</Checkbox>
                      )}
                      <a className="login-form-forgot" href="#/forgot"><span>Quên mật khẩu ?</span></a>
                      <div className="form-group">
                        <Button htmlType="submit" className="login-form-button">Đăng nhập</Button>
                      </div>
                    </Form.Item>
                  </Form>
                  <div className="register-btn">
                    <button className="stroke-btn-40" onClick={() => window.location.href = '#/register'}>Đăng ký</button>
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
  localize,
  connect(
    state => ({
      loading: state.async.loading,
    }),
    {
      login
    }
  )
)(Form.create()(Login))
