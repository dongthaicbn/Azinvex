import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Button, Icon } from 'antd';
import { follow, unfollow, isFollowed } from './../../../reduxModules/follow/followActions';
import '../Dashboard.scss';
import avatarUser from '../../../assets/user.png';

/*eslint-disable*/

class ExpertItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowed: null
    };
  }
  async componentDidMount() {
    this.setState({ isFollowed: await this.props.isFollowed(this.props.expert.id) });
  }
  follow = expert => {
    this.props.follow(expert);
    this.setState({ isFollowed: true });
  };
  unfollow = followedId => {
    this.props.unfollow(followedId);
    this.setState({ isFollowed: false });
  };
  render() {
    const { expert } = this.props;
    const { isFollowed } = this.state;

    const action = isFollowed !== null && !isFollowed ?
      <Button onClick={() => this.follow(expert)} type="primary" className="follow-btn">Follow</Button> :
      <Button onClick={() => this.unfollow(expert.id)} type="default" className="unfollow-btn">Unfollow</Button>;
    return (
      <List.Item actions={[action]}>
        <List.Item.Meta
          avatar={<Avatar shape="square" size={48} src={expert.photoURL === '/assets/user.png' ? avatarUser : expert.photoURL}/>}
          title={
            <p className="account-name-text">
              {expert.displayName}
              <span className="pro-expert">PRO</span>
              </p>
          }
          description={
            <p>
              <Icon type="user" />&nbsp;{expert.followedCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Icon type="bar-chart" />&nbsp;{expert.totalpips.toFixed(1)} pips&nbsp;
            </p>
          }
        />
      </List.Item>
    );
  }
}

export default connect(
  state => ({
    // state redux
  }),
  {
    follow,
    unfollow,
    isFollowed
  }
)(ExpertItem);
