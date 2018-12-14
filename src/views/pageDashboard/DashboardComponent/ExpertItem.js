import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { List, Avatar, Button, Icon } from 'antd';
import { follow, unfollow, isFollowed } from './../../../reduxModules/follow/followActions';
import '../Dashboard.scss';
import avatarUser from '../../../assets/user.png';
import localize from '../../../utils/hocs/localize';

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
    const { expert, t, index } = this.props;
    const { isFollowed } = this.state;
    const action = isFollowed !== null && !isFollowed ?
      <Button onClick={() => this.follow(expert)} type="primary" className="follow-btn">{t('IDS_FOLLOW')}</Button> :
      <Button onClick={() => this.unfollow(expert.id)} type="default" className="unfollow-btn">{t('IDS_UN_FOLLOW')}</Button>;
    return (
      <List.Item actions={[action]}>
        <List.Item.Meta
          avatar={<Avatar shape="square" size={48} src={expert.photoURL === '/assets/user.png' ? avatarUser : expert.photoURL}/>}
          title={
            <p className="account-name-text">
              {expert.displayName}
          {index < 3 && <span className="pro-expert">{index+1}</span>}
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

export default compose(
  connect(
    state => ({
      // state redux
    }),
    {
      follow,
      unfollow,
      isFollowed
    }
  ),
  localize
)(ExpertItem);
