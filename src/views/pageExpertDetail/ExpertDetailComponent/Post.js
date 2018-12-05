import React, { Component } from 'react';
import { Card, Input, Icon, Form, Button } from 'antd';
import { withFirestore } from 'react-redux-firebase';
import firebase from './../../../utils/redux/configureFirebase';

import '../ExpertDetail.scss';
import avatarUser from '../../../assets/user.png';


/*eslint-disable*/
const Search = Input.Search;
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listComment: []
    };
  }
  componentDidMount(){
    const { postId, expertDetail} = this.props
    const db = firebase.firestore();
    db.collection("users").doc(expertDetail.id).collection('posts').doc(postId).collection('comments')
      .onSnapshot((querySnap) => {
        let events = [];
        if (!querySnap.empty){
          for (let i = 0; i < querySnap.docs.length; i++) {
            let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
            events.push(evt);
          }
        }
        this.setState({listComment: events})
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => { 
      if (!err) {
        const { firestore, expertDetail, profileUser } = this.props;
        const {comment} = values;
        await firestore.add(
          {
            collection: 'users',
            doc: expertDetail.id,
            subcollections: [{ collection: 'posts', doc: this.props.postId }, { collection: 'comments' }]
          },
          { user: { photoURL: profileUser.photoURL, displayName: profileUser.displayName }, createdAt: firestore.FieldValue.serverTimestamp(), comment }
        );
        this.props.form.resetFields();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { header, date, children } = this.props;
    const { listComment} = this.state;
    return (
      <Card className="card-dashboard-container">
        <p className="header-post">{header}</p>
        <p className="date-post">{date}</p>

        <div className="content-post">
          {children}
          <p className="comment-header">Bình luận</p>
          <div className="list-comment common-scroll">
            {listComment.map((item, index) => (
              <div className="post-user-information" key={index}>
                <img src={item.user.photoURL} className="avatar-user-post" />
                <div className="comment-item">
                  <p className="user-name-text">{item.user.displayName}</p>
                  <span>{item.comment}</span>
                </div>
              </div>
            ))}
          </div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('comment', {
                rules: [{ required: true, message: 'Please write your comment!' }]
              })(
                <Input addonAfter={<Icon type="arrow-right" />} placeholder="Write comment" />
              )}
            </Form.Item>
          </Form>
     
 
         
  
        </div>
      </Card>
    );
  }
}

export default withFirestore(Form.create()(Post));
