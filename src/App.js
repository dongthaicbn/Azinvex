/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { compose } from 'recompose';
import 'antd/dist/antd.css';
import './App.scss';
import Routes from './Routes';
import Navigation from './views/components/Navigation/Navigation';
import ScrollBar from './views/components/ScrollBar/ScrollBar';
import LandingPage from './views/pageLanding/Landing';
import LoginPage from './views/pageLogin/Login';
import Header from './views/components/Header/Header';

import Logo from './assets/logo.png';
import * as routes from './utils/constants/routes';

import { actionNavigateTo } from './reduxModules/common/routes';

const { Sider, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  commonComponents = () => (
    <div className="app-container">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <div className="logo-img">
            <img src={Logo} alt="" />
            {!this.state.collapsed && <span className="app-title">AZINVEX</span>}
          </div>
          <Navigation collapsed={this.state.collapsed} />
        </Sider>
        <Layout>
          <Header collapsed={this.state.collapsed} toggle={this.toggle} />
          <Content className="content-container">
            <ScrollBar>
              <Routes />
            </ScrollBar>
          </Content>
        </Layout>
      </Layout>
    </div>
  );

  checkRole = (role, location) => {
    if((role === 'expert' && (location.type === routes.ROUTE_DASHBOARD || location.type === routes.ROUTE_EXPERTS ))
    || (role === 'member' && (location.type === routes.ROUTE_MANAGESIGNAL ))) {
      return true;
    }
    return false;
  };

  render() {
    const { location, isAuthenticated, role, isInitializing } = this.props;
    if (isInitializing) {
      return <div>loading...</div>
    }
    // if(isAuthenticated && location.type === routes.ROUTE_HOME) {
    //   this.props.actionNavigateTo(location.prev.type);
    //   return null;
    // }
    switch (location.type) {
      case routes.ROUTE_LOGIN:
        return <LoginPage />;
      case routes.ROUTE_REGISTER:
        // return <RegisterPage />;
        return <div>RegisterPage</div>;
      case routes.ROUTE_ERROR_403:
        // return <ErrorPage />;
        return <div>Not asscess role</div>;
      case routes.ROUTE_HOME:
        return <LandingPage />;
      case routes.ROUTE_DASHBOARD:
      case routes.ROUTE_EXPERTS:
      case routes.ROUTE_INFORMATION:
      case routes.ROUTE_CHANGEPASSWORD:
      case routes.ROUTE_MANAGESIGNAL:
      case routes.ROUTE_SIGNAL:
      case routes.ROUTE_ADMIN_USER:
      case routes.ROUTE_HELP:
      case routes.ROUTE_SUPPORT:
      {
        if (isAuthenticated) {
          if(!this.checkRole(role, location)) {
            return this.commonComponents();
          }
          this.props.actionNavigateTo(routes.ROUTE_ERROR_403);
        } else {
          this.props.actionNavigateTo(routes.ROUTE_HOME);
          return null;
        }
      }
      default:
        return <div>ErrorPage</div>;
    }
  }
}

export default compose(
  connect(state => ({
    location: state.location,
    isAuthenticated: !state.firebase.auth.isEmpty,
    role: state.firebase.profile.role,
    isInitializing: state.firebase.isInitializing
  }),
  {
    actionNavigateTo
  })
)(App);

