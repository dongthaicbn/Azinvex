import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Account.scss';
/* eslint-disable */
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    const style = {
      width: "100%",
      height: "700px",
      border: "none"
    };
    return (
      <div>
        <iframe
          src="http://trade.mql5.com/trade?lang=en&servers=Exness-Real,Exness-Real2,Exness-Real3,Exness-Real4,Exness-Real5,Exness-Real6,Exness-Real7,Exness-Real8,Exness-Real9,Exness-Real11,Exness-Trial,Exness-Trial2,Exness-MT5Real,Exness-MT5Trial&save_password=off&login=&trade_server=&"
          allowfullscreen="allowfullscreen"
          style={style}></iframe>
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
