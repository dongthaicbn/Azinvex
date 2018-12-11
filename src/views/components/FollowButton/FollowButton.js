import React, { Component } from 'react';
import { Button } from 'antd';

/* eslint-disable */
class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowed: null,
      ticket: null
    };
  }

  async componentDidMount() {
    this.setState({
      isFollowed: await this.props.isFollowedSignal(this.props.ticket)
    });
  }
  follow(ticket) {
    const { followSignal } = this.props;
    followSignal(ticket);
    this.setState({ isFollowed: true });
  }
  unfollow(ticket) {
    const { unfollowSignal } = this.props;
    unfollowSignal(ticket);
    this.setState({ isFollowed: false });
  }
  render() {
    const { isFollowed } = this.state;
    const { ticket, t, signal } = this.props;
    return (
      <span>
        {!isFollowed ? (
          <Button
            loading={isFollowed == null}
            disabled={signal.status === 'closed'}
            onClick={() => this.follow(ticket)}
            type="primary"
            className="follow-btn"
          >
            {t('IDS_FOLLOW')}
          </Button>
        ) : (
          <Button
            loading={isFollowed === null}
            disabled={signal.status === 'closed'}
            onClick={() => this.unfollow(ticket)}
            type="default"
            className="follow-btn"
          >
            {t('IDS_UN_FOLLOW')}
          </Button>
        )}
      </span>
    );
  }
}
export default FollowButton;
