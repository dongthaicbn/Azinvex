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
      <div className="top-users">
        {/*<div className="gradient-indigo-dark-blue">
          <div className="header">
            <h4 className="title">TOP CHUYÊN GIA FOREX</h4>
          </div>
          <div className="card-body">
            <div className="card-block">
              {topExpert && topExpert.map((expertItem, index) => {
                  return (<ExpertCard key={index} expert={expertItem} />);
              })}
            </div>
          </div>
        </div>*/}
        aaa
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
)(TopUsers);
