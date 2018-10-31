
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import { follow, unfollow, isFollowed } from './../../reduxModules/follow/followActions'
import './Dashboard.scss';
import { Link } from 'react-router-dom'
class ExpertCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowed: null
    };
  }
  follow = expert => {
    this.props.follow(expert)
    this.setState({ isFollowed: true })
  }
  unfollow = followedId => {
    this.props.unfollow(followedId)
    this.setState({ isFollowed: false })
  }
  async componentDidMount(){
    this.setState({ isFollowed: await this.props.isFollowed(this.props.expert.id) })
  }
  render() {
    const { expert } = this.props;
    return (
     
      <Card
        hoverable
        key={expert.id}
        style={{ width: 'calc(25% - 20px)', padding: 20, display: 'inline-block', margin: '0 10px' }}
        cover={<img alt="avatar" src={expert.photoURL} />}
      >
        <Card.Meta
          title={
            <p>
              <span> <a href={"/#/expert/" + expert.id}>{expert.displayName}</a> </span>
              {this.state.isFollowed !== null ? (!this.state.isFollowed ? <Button onClick={() => this.follow(expert)} type="primary" className="follow-btn">Follow</Button> : <Button onClick={() => this.unfollow(expert.id)} type="default" className="follow-btn">Unfollow</Button>):null}
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
