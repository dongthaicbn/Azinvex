import React, { Component } from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Button, Upload, Modal } from 'antd';
import './Information.scss';


class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'default.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ],
      isEdit: false
    };
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handleSubmit = e => {
    this.setState({ isEdit: false });
  };
  handleChange = ({ fileList }) => {
    this.setState({ fileList: [fileList[fileList.length - 1]] });
  };
  handleCancelEdit = () => {
    const { profile } = this.props;
    this.setState({ isEdit: false });
    this.props.form.setFieldsValue({
      displayName: profile.displayName,
      email: profile.email,
      birthday: profile.information.birthday.seconds,
      phone: profile.information.phone,
      sex: profile.information.sex,
      address: profile.information.address,
      birthplace: profile.information.birthplace,
      experience: profile.information.experience,
      occupation: profile.information.occupation,
      website: profile.information.website
    });
  };
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { profile } = this.props;
    const {
      previewVisible,
      previewImage,
      fileList,
      isEdit
    } = this.state;
    const showUpload = {
      showPreviewIcon: true,
      showRemoveIcon: false
    };
    const props = {
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [file]
        }));
        return false;
      }
    };
    return (
      <div className="information-container">
        <p className="info-header">Thông tin cá nhân</p>
        {!isEdit && (
          <Button
            type="primary"
            onClick={() => this.setState({ isEdit: true })}
            style={{ marginLeft: 'calc(99% - 126px)', width: 106 }}
          >
            Chỉnh sửa
          </Button>
        )}
        {profile && profile.information &&
          <Form onSubmit={this.handleSubmit}>
            <div className="card-info-contain">
              <div className="clearfix avatar-img">
                <Upload
                  {...props}
                  listType="picture-card"
                  showUploadList={showUpload}
                  fileList={fileList}
                  onChange={this.handleChange}
                  onPreview={this.handlePreview}
                >
                  <span className="edit-icon">
                    <Icon type="edit" theme="outlined" />
                  </span>
                </Upload>
                <Modal
                  visible={previewVisible}
                  closable={false}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={previewImage}
                  />
                </Modal>
              </div>
              <p className="text-info-name" style={{ marginTop: 0 }}>{profile.displayName}</p>
              <p className="text-info">{profile.role}</p>
            </div>
            <div className="card-info-contain">
              <p className="title-input-profile">
                <span className="first-title">Họ và tên</span>
                &nbsp;
                <Tooltip title='Tên hiển thị trên hệ thống.'>
                  <Icon
                    type="info-circle"
                    theme="outlined"
                    className="info-icon"
                  />
                </Tooltip>
              </p>
              <Form.Item>
                {getFieldDecorator('displayName', {
                  initialValue: profile.displayName,
                  rules: [
                    {
                      required: true,
                      message: 'Hãy nhập tên hiển thị!',
                      whitespace: true
                    }
                  ]
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>E-mail</b></p>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: profile.email
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Ngày sinh</b></p>
              <Form.Item>
                {getFieldDecorator('birthday', {
                  initialValue: profile.information.birthday.seconds
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Số điện thoại</b></p>
              <Form.Item>
                {getFieldDecorator('phone', {
                  initialValue: profile.information.phone
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Giới tính</b></p>
              <Form.Item>
                {getFieldDecorator('sex', {
                  initialValue: profile.information.sex ? 'Nam' : 'Nữ'
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
            </div>
            <div className="end-card-info">
              <p className="title-input-profile"><b>Địa chỉ</b></p>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: profile.information.address
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Nghề nghiệp</b></p>
              <Form.Item>
                {getFieldDecorator('occupation', {
                  initialValue: profile.information.occupation
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Quê quán</b></p>
              <Form.Item>
                {getFieldDecorator('birthplace', {
                  initialValue: profile.information.birthplace
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile">
                <b>Kinh nghiệm giao dịch</b>
              </p>
              <Form.Item>
                {getFieldDecorator('experience', {
                  initialValue: profile.information.experience
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Website</b></p>
              <Form.Item>
                {getFieldDecorator('website', {
                  initialValue: profile.information.website
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              {isEdit && (
                <Form.Item>
                  <Button
                    onClick={this.handleCancelEdit}
                    style={{ marginRight: 20, background: '#ebedf0' }}
                  >
                    Hủy bỏ
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Form.Item>
              )}
            </div>
          </Form>
        }
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      profile: state.firebase.profile,
      isEmpty: state.firebase.profile.isEmpty
    }),
    {
      // action
    }
  ),
  branch(
    (props => props.isLoaded),
    renderNothing
  )
)(Form.create()(Information));
