import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Account.scss';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    return (
      <div>
        Account
      </div>
    );
  }
}

export default connect(
  state => ({
    // state redux
  }),
  {
    // action
  }
)(Account);
