import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Card, Button, Icon, Modal, Form, Input, Upload, message } from 'antd';
import './ExpertDetail.scss';
import Post from './ExpertDetailComponent/Post';
import { addPost, listenPost, unlistenPost } from './../../reduxModules/expert/expertActions';


/*eslint-disable*/
class Posts extends Component {
  state = {
    isCreateNoticeModal: false,
    fileList: [],
    uploadResult: '',
    uploading: false
  };
  handleUpload = async () => {
    const { fileList } = this.state;
    const image = fileList[fileList.length - 1];
    const formData = new FormData();
    formData.append('photo', image);
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    };
    const url = 'https://api2.azinvex.com/upload';
    this.setState({
      uploading: true,
    });
    try {
      const data = await axios.post(url, formData, axiosConfig);
      this.setState({
        uploadResult: data.data.full,
        uploading: false
      });
      this.props.form.setFields( { "file" : {value : 'https://api2.azinvex.com/uploads/'+data.data.filename} } );
      message.success('upload successfully.');
    } catch (error) {
      console.log(error)
      this.setState({
        uploading: false
      });
      message.error('upload failed.');
    }

  }
  handleCreateNoticeModal = () => {
    this.setState({ isCreateNoticeModal: true });
  };
  handleCancelModal = () => {
    this.setState({ isCreateNoticeModal: false });
    this.props.form.resetFields()
  };
  handleCreateNotice = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isCreateNoticeModal: false });
        this.props.addPost(values);  
        this.props.form.resetFields()
        // console.log('values', values);
        // implement handle create notice
      }
    });
  };
  componentDidMount(){
    this.props.listenPost();
  }
  componentWillUnmount(){
    this.props.unlistenPost();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // const { expertDetail, expertPosts } = this.props;
    const { isCreateNoticeModal } = this.state;
    const { uploading, fileList } = this.state;
    const props = {
      multiple:false,
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    const { expertPosts } = this.props;
    return (
      <Card className="card-container">
       {this.props.currentUser.uid == this.props.expertDetail.id ? (        <Button type="primary" className="create-notice-btn" onClick={this.handleCreateNoticeModal}>
          <Icon type="twitter" theme="outlined" />
          Tạo thông báo mới
        </Button>) : null}

        <p className="header-card">User Timeline </p>
        <div className="post-container">
        {expertPosts.map((e,i) =>  <Post key={i} profileUser={this.props.profileUser} expertDetail={this.props.expertDetail} postId={e.id} header={e.title} date={moment(e.createdAt.seconds*1000).format('HH:mm DD/MM/YYYY')}>
    {e.photo && <img src={e.photo} className="image-container" /> }
            <p className="content-post-description">
             {e.content}
            </p>
          </Post>
        )}
         
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
                rules: [{ required: true, message: 'Hãy nhập nội dung!' }]
              })(<Input.TextArea rows={4} placeholder="Nội dung" className="text-area-content" />)}
            </Form.Item>
            <p className="text-title">Ảnh</p>
            <Form.Item>
              {getFieldDecorator('photo', {
                initialValue: ''
              })(<Input placeholder="Ảnh" />)}
            </Form.Item>
            <Form.Item>
            <Upload multiple={false} {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload' }
        </Button>
            </Form.Item>
          </Modal>
        </Form>
      </Card>
    );
  }
}

export default connect(
  state => ({
    expertPosts: state.firestore.ordered.expertPosts ? state.firestore.ordered.expertPosts : [],
    expertDetail: state.firestore.ordered.expertDetail[0],
    profileUser: state.firebase.profile,
    currentUser: state.firebase.auth
  }),
  {
    // action
    addPost,
    listenPost,
    unlistenPost
  }
)(Form.create()(Posts));
