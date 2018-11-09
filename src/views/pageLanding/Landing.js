/*eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import $ from 'jquery';
import { Layout } from 'antd';

import './Landing.scss';
import MenuLanding from './LandingComponent/MenuLanding';
import HeaderContent from './LandingComponent/HeaderContent';
import MainContent from './LandingComponent/MainContent';
import Footer from './LandingComponent/Footer';

class Landing extends Component {
  componentDidMount() {
    if ($('.navbar-color-on-scroll').length !== 0) {
      $(window).on('scroll', this.checkScrollForTransparentNavbar);
    }
  }

  checkScrollForTransparentNavbar = () => {
    if ($(document).scrollTop() > 300) {
      $('.navbar-color-on-scroll').removeClass('navbar-transparent');
    } else {
      $('.navbar-color-on-scroll').addClass('navbar-transparent');
    }
  };

  render() {
    const { profileUser, isAuthenticated } = this.props;
    return (
      <Layout>
        <MenuLanding profileUser={profileUser} isAuthenticated={isAuthenticated} />
        <HeaderContent />
        <MainContent />
        <Footer />
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
