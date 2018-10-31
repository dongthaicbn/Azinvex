/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import { follow, unfollow, isFollowed } from './../../reduxModules/follow/followActions'
class ExpertCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowed: null
    };
  }
  follow = expert => {
    this.props.follow(expert);
    this.setState({ isFollowed: true })
  };
  unfollow = followedId => {
    this.props.unfollow(followedId);
    this.setState({ isFollowed: false })
  };
  async componentDidMount() {
    this.setState({ isFollowed: await this.props.isFollowed(this.props.expert.id) })
  }
  render() {
    const { expert } = this.props;
    const { isFollowed } = this.state;
    return (
      <Card
        hoverable
        style={{ width: 'calc(25% - 20px)', padding: 20, display: 'inline-block', margin: '0 10px' }}
        cover={<img alt="avatar" src={expert.photoURL} />}
      >
        <Card.Meta
          title={
            <p>
              <span>{expert.displayName}</span>
              <span style={{ float: 'right' }}>
                <Button type="primary" className="detail-btn" onClick={() => this.handleDetail(expert.id)}>Chi tiết</Button>
                {isFollowed !== null &&
                  !isFollowed ?
                  <Button onClick={() => this.follow(expert)} type="primary" className="follow-btn">Follow</Button> :
                  <Button onClick={() => this.unfollow(expert.id)} type="default" className="follow-btn">Unfollow</Button>
                }
              </span>
            </p>
          }
          description={
            <div>
              <p>
                <span className="description-text-left">Tỉ lệ thắng</span><span className="description-text-right">
                  {(expert.signalLoss + expert.signalWin) !== 0 ?
                    Math.round((expert.signalWin / (expert.signalLoss + expert.signalWin)) * 100) : 0
                  } %
                </span>
              </p>
              <p><span className="description-text-left">Số Pips đạt</span><span className="description-text-right">{expert.totalpips.toFixed(1)}</span></p>
            </div>
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
