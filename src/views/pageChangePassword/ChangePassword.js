import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import './ChangePassword.scss';

/* eslint-disable */
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleSubmit = e => {
    // implement change password
  };
  handleCancelEdit = () => {
    this.props.form.setFieldsValue({
      passOld: '',
      passNew: '',
      passConfirm: ''
    });
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
              {getFieldDecorator("passOld", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu cũ!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <p className="title-input-profile">
              <b>Mật khẩu mới</b>
            </p>
            <Form.Item>
              {getFieldDecorator("passNew", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu mới!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <p className="title-input-profile">
              <b>Nhập lại mật khẩu mới</b>
            </p>
            <Form.Item>
              {getFieldDecorator("passConfirm", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu mới!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              <Button
                onClick={this.handleCancelEdit}
                style={{ marginRight: 20, background: "#ebedf0" }}
              >
                Hủy bỏ
              </Button>
              <Button type="primary" htmlType="submit">
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
    // state redux
  }),
  {
    // action
  }
)(Form.create()(ChangePassword));
