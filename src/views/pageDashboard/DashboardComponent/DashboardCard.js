import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import '../Dashboard.scss';
import localize from '../../../utils/hocs/localize';

class DashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    const { statistics, t } = this.props;
    return (
      <div className="card-dashboard">
        <div className="card-item">
          <div className="card gradient-blackberry">
            <div className="card-body">
              <div className="card-block">
                <div className="media">
                  <div className="media-left">
                    <h3 className="value">{statistics.activeSignals}</h3>
                    <span className="title">{t('IDS_ACTIVE_COMMAND')}</span>
                  </div>
                  <div className="media-right">
                    <i className="icon-pie-chart font-large-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-item">
          <div className="card gradient-ibiza-sunset">
            <div className="card-body">
              <div className="card-block">
                <div className="media">
                  <div className="media-left">
                    <h3 className="value">{statistics.pips.toFixed(1)}</h3>
                    <span className="title">{t('IDS_TOTAL_PIPS')}</span>
                  </div>
                  <div className="media-right">
                    <i className="icon-bulb font-large-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-item">
          <div className="card gradient-green-tea">
            <div className="card-body">
              <div className="card-block">
                <div className="media">
                  <div className="media-left">
                    <h3 className="value">{statistics.users}</h3>
                    <span className="title">{t('IDS_ACTIVE_USER')}</span>
                  </div>
                  <div className="media-right">
                    <i className="icon-graph font-large-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-item">
          <div className="card gradient-pomegranate">
            <div className="card-body">
              <div className="card-block">
                <div className="media">
                  <div className="media-left">
                    <h3 className="value">{statistics.experts}</h3>
                    <span className="title">{t('IDS_EXPERT')}</span>
                  </div>
                  <div className="media-right">
                    <i className="icon-wallet font-large-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      statistics: state.firestore.ordered.statistics ? state.firestore.ordered.statistics[0] : {
        activeSignals: 0,
        experts: 0,
        pips: 0,
        users: 0
      }
    }),
    {
      // action
    }
  ),
  localize
)(DashboardCard);
