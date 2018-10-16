import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    return (
      <div>
        Dashboard
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
)(Dashboard);
