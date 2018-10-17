/* eslint-disable */
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './Loading.scss';

class LoadingComponent extends Component {

  render () {
    return (
      <div className="loading-container">
        <ReactLoading className="loading" type={'spin'} color={'#2397EE'} height={96} width={96} />
      </div>
    );
  }
}

export default LoadingComponent;
