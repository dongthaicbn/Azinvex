import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Signal.scss';

class Signal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    return (
      <div>
        Signal
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
)(Signal);
