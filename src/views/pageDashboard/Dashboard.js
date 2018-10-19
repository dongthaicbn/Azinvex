/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as Push from 'push.js'
// import firebase from 'app/config/firebase';

import DashboardCard from './DashboardCard';
// import TopUsers from './TopUsers';


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
      <div className="dashboard-container">
        <DashboardCard />
      </div>
    );
  }
}

export default connect(
  state => ({
  }),
  {
    // action
  }
)(Dashboard);
