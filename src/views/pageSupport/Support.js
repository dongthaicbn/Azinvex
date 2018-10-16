import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Support.scss';

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    return (
      <div>
        Support
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
)(Support);
