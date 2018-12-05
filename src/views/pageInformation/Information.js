/*eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { compose, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Button, Upload, Modal, DatePicker, Radio } from 'antd';
import { withFirestore } from 'react-redux-firebase';
import './Information.scss';
import avatarUser from '../../assets/user.png';
import ReactLoading from 'react-loading';

const dateFormat = 'DD/MM/YYYY';
class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      uploading: false,
      fileList: [
        {
          uid: '-1',
          name: 'default.png',
          status: 'done',
          url: props.profile.photoURL === '/assets/user.png' ? avatarUser : props.profile.photoURL
        }
      ],
      isEdit: false
    };
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handleSubmit = e => {
    const { currentUser, firestore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let { birthday,website, ...updatedUser } = values;
      if(!values.website) website = 'https://signal.azinvex.com'
      const newData = { ...updatedUser, birthday: moment(values.birthday).toDate().getTime(), updatedAt: firestore.FieldValue.serverTimestamp(), website };
      firestore.update({ collection: 'users', doc: currentUser.uid }, newData);
    });
    this.setState({ isEdit: false });
  };
  handleChange = async ({ fileList }) => {
    const { firestore, currentUser } = this.props;
    this.setState({ fileList: [fileList[fileList.length - 1]] });
    const image = fileList[fileList.length - 1].originFileObj;
    const formData = new FormData();
    formData.append('photo', image);
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    };
    const url = 'https://api.congtruyendich.com/upload';
    this.setState({
      uploading: true,
    });
    try {
      const data = await axios.post(url, formData, axiosConfig);
      firestore.update({ collection: 'users', doc: currentUser.uid }, { photoURL: data.data.full });
      this.setState({
        uploading: false,
      });
    } catch (error) {
      this.setState({
        uploading: false,
      });
      console.log(error);
    }

  };
  handleCancelEdit = () => {
    const { profile } = this.props;
    this.setState({ isEdit: false });
    this.props.form.setFieldsValue({
      displayName: profile.displayName,
      email: profile.email,
      birthday: moment(profile.birthday),
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
    const { uploading } = this.state;
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
        {profile &&
          <Form onSubmit={this.handleSubmit}>
            <div className="card-info-contain">
              <div className="clearfix avatar-img">
                <Upload
                  {...props}
                  listType="picture-card"
                  showUploadList={showUpload}
                  multiple={false}
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
               {uploading && <ReactLoading className="loading" type={'spin'} color={'#2397EE'} height={50} width={50} /> }
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
                })(<Input disabled />)}
              </Form.Item>
              <p className="title-input-profile"><b>E-mail</b></p>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: profile.email
                })(<Input disabled />)}
              </Form.Item>
              <p className="title-input-profile"><b>Ngày sinh</b></p>
              <Form.Item>
                {getFieldDecorator('birthday', {
                initialValue: profile.birthday ? moment(profile.birthday) : moment('1/1/1960')
                })(<DatePicker format={dateFormat} disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Số điện thoại</b></p>
              <Form.Item>
              {getFieldDecorator('information.phone', {
                initialValue: profile.information ? profile.information.phone : ''
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Giới tính</b></p>
              <Form.Item>
                {getFieldDecorator('information.sex', {
                  initialValue: 0
                })(
                <Radio.Group disabled={!isEdit}>
                    <Radio.Button value="0">Nam</Radio.Button>
                    <Radio.Button value="1">Nữ</Radio.Button>
                </Radio.Group>
                )}
              </Form.Item>
            </div>
            <div className="end-card-info">
              <p className="title-input-profile"><b>Địa chỉ</b></p>
              <Form.Item>
              {getFieldDecorator('information.address', {
                initialValue: profile.information ? profile.information.address : ''
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Nghề nghiệp</b></p>
              <Form.Item>
              {getFieldDecorator('information.occupation', {
                initialValue: profile.information ? profile.information.occupation : ''
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Quê quán</b></p>
              <Form.Item>
              {getFieldDecorator('information.birthplace', {
                initialValue: profile.information ? profile.information.birthplace : ''
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile">
                <b>Kinh nghiệm giao dịch</b>
              </p>
              <Form.Item>
              {getFieldDecorator('information.experience', {
                initialValue: profile.information ? profile.information.experience : ''
                })(<Input disabled={!isEdit} />)}
              </Form.Item>
              <p className="title-input-profile"><b>Website</b></p>
              <Form.Item>
              {getFieldDecorator('information.website', {
                initialValue: profile.information ? profile.information.website : ''
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
      currentUser: state.firebase.auth,
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
)(Form.create()(withFirestore(Information)));
