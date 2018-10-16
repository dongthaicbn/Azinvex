import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Help.scss';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }
  render() {
    return (
      <div>
        Help
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
)(Help);
