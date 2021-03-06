import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import { Form, Input, Button } from 'antd';
import { toastr } from 'react-redux-toastr';
import { updatePassword } from '../../reduxModules/auth/authAction';
import localize from '../../utils/hocs/localize';
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
    const { t } = this.props;
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(t('IDS_RETYPE_PASSWORD_SAME'));
    } else {
      callback();
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.reauthenticate(values.currentPassword).then(async () => {
          await this.props.updatePassword({ password: values.password });
          this.props.form.resetFields()
        }).catch(() => {
          this.props.form.setFieldsValue({
            currentPassword: '',
          });
          toastr.error('Error', "Mật khẩu cũ không chính xác");
        });
      }
    })
  };
  handleCancelEdit = () => {
    this.props.form.resetFields()
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { t } = this.props;
    return (
      <div className="information-container">
        <p className="info-header">{t('IDS_CHANGE_PASSWORD')}</p>
        <div className="change-password-container">
          <Form onSubmit={this.handleSubmit}>
            <p className="title-input-profile">
              <b>{t('IDS_CURRENT_PASSWORD')}</b>
            </p>
            <Form.Item>
              {getFieldDecorator("currentPassword", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    // message: "Hãy nhập mật khẩu cũ!"
                  }
                ]
              })(<Input type="password" />)}
            </Form.Item>
            <p className="title-input-profile">
              <b>{t('IDS_NEW_PASSWORD')}</b>
            </p>
            <Form.Item>
              {getFieldDecorator("password", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    // message: "Hãy nhập mật khẩu mới!"
                  },
                  {
                    min: 6,
                    message: t('IDS_LENGTH_PASSWORD')
                  },
                  {
                    validator: this.validateToNextPassword,
                  }
                ]
              })(<Input type="password"  />)}
            </Form.Item>
            <p className="title-input-profile">
              <b>{t('IDS_RETYPE_NEW_PASSWORD')}</b>
            </p>
            <Form.Item>
              {getFieldDecorator("confirm", {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    // message: "Hãy nhập lại mật khẩu!"
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
                {t('IDS_CANCEL')}
              </Button>
              <Button loading={this.props.loading} type="primary" htmlType="submit">
                {t('IDS_UPDATE')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default compose(connect(
  state => ({
    loading: state.async.loading,
  }),
  {
    updatePassword
  }
), localize)(Form.create()(withFirebase(ChangePassword)));
