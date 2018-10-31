/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExpertCard from './ExpertCard';
import './Dashboard.scss';

class TopUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    const { topExpert } = this.props;
    return (
      <div className="content-dashboard-container">
        <p className="header-text">Top Chuyên Gia FOREX</p>
        {topExpert && topExpert.map(item => (
          <ExpertCard expert={item} />
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    topExpert: state.firestore.ordered.topExpert
  }),
  {
    // action
  }
)(TopUsers);
