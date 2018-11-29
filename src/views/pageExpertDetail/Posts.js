import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Icon, Modal, Form, Input, Upload, message } from 'antd';
import './ExpertDetail.scss';
import example from '../../assets/example.jpg';
import Post from './ExpertDetailComponent/Post';

/*eslint-disable*/
class Posts extends Component {
  state = {
    isCreateNoticeModal: false
  };
  handleCreateNoticeModal = () => {
    this.setState({ isCreateNoticeModal: true });
  };
  handleCancelModal = () => {
    this.setState({ isCreateNoticeModal: false });
  };
  handleCreateNotice = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isCreateNoticeModal: false });
        // console.log('values', values);
        // implement handle create notice
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    // const { expertDetail, expertPosts } = this.props;
    const { isCreateNoticeModal } = this.state;
    const props = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    const listComment = [1, 2, 3, 4, 5];
    return (
      <Card className="card-container">
        <Button type="primary" className="create-notice-btn" onClick={this.handleCreateNoticeModal}>
          <Icon type="twitter" theme="outlined" />
          Tạo thông báo mới
        </Button>
        <p className="header-card">User Timeline </p>
        <div className="post-container">
          <Post header="Hello World" date="16/10/2018" listComment={listComment}>
            <img src={example} className="image-container" />
            <p className="content-post-description">
              Description content for this post.
              Tất vớ là một xu hướng thời trang- Đã bao giờ bạn để ý tới “vũ khí” lợi hại này chưa?
            </p>
          </Post>
          <Post header="Hello World" date="16/10/2018" listComment={listComment}>
            <p className="content-post-description">
              Description content for this post.
              Tất vớ là một xu hướng thời trang- Đã bao giờ bạn để ý tới “vũ khí” lợi hại này chưa?
            </p>
          </Post>
          <Post header="Hello World" date="16/10/2018" listComment={listComment}>
            <p className="content-post-description">
              Description content for this post.
              Tất vớ là một xu hướng thời trang- Đã bao giờ bạn để ý tới “vũ khí” lợi hại này chưa?
            </p>
          </Post>
        </div>
        <Form onSubmit={this.handleCreateNotice}>
          <Modal
            title="GỬI THÔNG BÁO TỚI CHO NGƯỜI DÙNG"
            visible={isCreateNoticeModal}
            centered
            okText="Gửi"
            cancelText="Hủy bỏ"
            onOk={this.handleCreateNotice}
            onCancel={this.handleCancelModal}
          >
            <p className="text-title">Tiêu đề</p>
            <Form.Item>
              {getFieldDecorator('title', {
                initialValue: '',
                rules: [{ required: true, message: 'Hãy nhập tiêu đề' }]
              })(<Input placeholder="Tiêu đề" />)}
            </Form.Item>
            <p className="text-title">Nội dung</p>
            <Form.Item>
              {getFieldDecorator('content', {
                initialValue: '',
                rules: [{ required: true, message: 'Hãy nhập mô tả bản thân!' }]
              })(<Input.TextArea rows={4} placeholder="Mô tả bản thân" className="text-area-content" />)}
            </Form.Item>
            <p className="text-title">Ảnh</p>
            <Form.Item>
              <Upload.Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="cloud-upload" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </Modal>
        </Form>
      </Card>
    );
  }
}

export default connect(
  state => ({
    // expertPosts: state.firestore.ordered.expertPosts ? state.firestore.ordered.expertPosts : []
  }),
  {
    // action
  }
)(Form.create()(Posts));
