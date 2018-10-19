import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';

class DashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    const { statistics } = this.props;
    return (
      <div className="card-dashboard">
        <div className="card-item">
          <div className="card gradient-blackberry">
            <div className="card-body">
              <div className="card-block">
                <div className="media">
                  <div className="media-left">
                    <h3 className="value">{statistics.activeSignals}</h3>
                    <span className="title">Lệnh Đang Hoạt Động</span>
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
                    <h3 className="value">{statistics.pips.toFixed(2)}</h3>
                    <span className="title">Tổng Số Pips</span>
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
                    <span className="title">Người Dùng Hoạt Động</span>
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
                    <span className="title">Chuyên Gia</span>
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

export default connect(
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
)(DashboardCard);
