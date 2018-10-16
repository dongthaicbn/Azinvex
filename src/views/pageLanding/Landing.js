/*eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import $ from 'jquery';
import Footer from './LandingComponent/Footer';
import MenuLanding from './LandingComponent/MenuLanding';
import HeaderContent from './LandingComponent/HeaderContent';
import MainContent from './LandingComponent/MainContent';
import './Landing.scss';

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
  }

  render() {
    // const { profileUser, isAuthenticated } = this.props;
    return (
      <div className="landing-page sidebar-collapse">
        <MenuLanding
          profileUser={{role: 'expert'}}
          isAuthenticated={false}
          firebase={this.props.firebase}
        />
        <HeaderContent />
        <MainContent />
        <Footer />
      </div>
    )
  }
}

export default Landing;
