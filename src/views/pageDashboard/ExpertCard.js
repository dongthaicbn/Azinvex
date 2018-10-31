import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import { follow, unfollow, isFollowed } from './../../reduxModules/follow/followActions';
import './Dashboard.scss';
import avatarUser from '../../assets/user.png';

/*eslint-disable*/

class ExpertCard extends Component {
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
    return (
      <Card
        hoverable
        key={expert.id}
        style={{
          width: 'calc(25% - 20px)',
          padding: 20,
          display: 'inline-block',
          margin: '0 10px'
        }}
        cover={<img alt="avatar" src={expert.photoURL === '/assets/user.png' ? avatarUser : expert.photoURL} className="avatar-image" />}
      >
        <Card.Meta
          title={
            <p>
              <span> <a href={`/#/expert/${expert.id}`}>{expert.displayName}</a> </span>
              {isFollowed !== null &&
                !isFollowed ?
                <Button onClick={() => this.follow(expert)} type="primary" className="follow-btn">Follow</Button> :
                <Button onClick={() => this.unfollow(expert.id)} type="default" className="follow-btn">Unfollow</Button>
              }
            </p>
          }
        />
      </Card>
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
)(ExpertCard);
