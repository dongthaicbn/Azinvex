/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ExpertCard from './ExpertCard';
import '../Dashboard.scss';
import localize from '../../../utils/hocs/localize';

class TopUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    const { topExpert, t } = this.props;
    return (
      <div className="content-dashboard-container">
        <p className="header-text">{t('IDS_TOP_FOREX_EXPERT')}</p>
        {topExpert && topExpert.map((item, index) => (
          <ExpertCard expert={item} key={index} />
        ))}
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      topExpert: state.firestore.ordered.topExpert
    }),
    {
      // action
    }
  ),
  localize
)(TopUsers);
