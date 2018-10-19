/*eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import $ from 'jquery';
import { Layout } from 'antd';
import ScrollBar from '../components/ScrollBar/ScrollBar';

import HeaderLanDing from './HeaderLading'
import './Landing.scss';

const { Header, Content } = Layout;
class Landing extends Component {

  render() {
    const { profileUser, isAuthenticated } = this.props;
    return (
      <Layout>
        <Header className="header-landing">
          <HeaderLanDing/>
        </Header>
        <Content>
          <ScrollBar>
            content
          </ScrollBar>
        </Content>
      </Layout>
    )
  }
}

export default compose(
  connect(
    state => ({
      isAuthenticated: !state.firebase.auth.isEmpty,
      profileUser: state.firebase.profile
    })
  )
)(Landing);
