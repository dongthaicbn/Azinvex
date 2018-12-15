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
import Forgot from './views/pageForgot/Forgot';
import Header from './views/components/Header/Header';
import Loading from './views/components/Loading/Loading';
import Register from './views/pageRegister/Register';
import Help from './views/pageHelp/Help';
import firbaseApp from './utils/redux/configureFirebase'

import Logo from './assets/logo.png';
import * as routes from './utils/constants/routes';

import { actionNavigateTo } from './reduxModules/common/routes';
const messaging = firbaseApp.messaging();
const firestore = firbaseApp.firestore();

const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isSettingTheme: false
    };
  }
componentDidMount(){
  // messaging
  //   .requestPermission()
  //   .then(() => {
  //     console.log("Notification permission granted.");
  //     messaging
  //       .getToken()
  //       .then(currentToken => {
  //         if (currentToken) {
  //           // saveToken(firebaseUser,currentToken)
  //           console.log("Token generated is ", currentToken);
  //         } else {
  //           console.log(
  //             "No Instance ID token available. Request permission to generate one."
  //           );
  //         }
  //       })
  //       .catch(err => {
  //         console.log("An error occurred while retrieving token. ", err);
  //       });
  //   })
  //   .catch(err => {
  //     console.log("Unable to get permission to notify.", err);
  //   });
}
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  handleTheme = () => {
    this.setState({ isSettingTheme: !this.state.isSettingTheme });
  }

  commonComponents = () => (
    <div className="app-container">
      <Layout>
        <Layout.Sider
          trigger={null}
          collapsible
          width={250}
          collapsed={this.state.collapsed}
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <div className="logo-img">
            <a alt="Home" href="/#/"> <img src={Logo} alt="" /> 
            {!this.state.collapsed && <span className="app-title">AZINVEX</span>} </a>
          </div>
          <Navigation collapsed={this.state.collapsed} />
        </Layout.Sider>
        <Layout>
          <Header profileUser={this.props.profileUser} collapsed={this.state.collapsed} toggle={this.toggle} />
          <Layout.Content className="content-container">
            <ScrollBar>
              <Routes />
            </ScrollBar>
          </Layout.Content>
        </Layout>
      </Layout>
      <div className="customizer border-left-blue-grey border-left-lighten-4 d-none d-sm-none d-md-block">
        <a className="customizer-close" onClick={this.handleTheme}><i className="ft-x font-medium-3" /></a>
        <a id="customizer-toggle-icon" className="customizer-toggle bg-danger">
          <i className="ft-settings font-medium-4 fa fa-spin white align-middle" />
        </a>
        <div data-ps-id="df6a5ce4-a175-9172-4402-dabd98fc9c0a" className="customizer-content p-3 ps-container ps-theme-dark">
          <h4 className="text-uppercase mb-0 text-bold-400">Theme Customizer</h4>
          <p>Customize & Preview in Real Time</p>
          <h6 className="text-center text-bold-500 mb-3 text-uppercase">Sidebar Color Options</h6>
          <div className="cz-bg-color">
            <div className="row p-1">
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="pomegranate" className="gradient-pomegranate d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="king-yna" className="gradient-king-yna d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="ibiza-sunset" className="gradient-ibiza-sunset d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="flickr" className="gradient-flickr d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="purple-bliss" className="gradient-purple-bliss d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="man-of-steel" className="gradient-man-of-steel d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="purple-love" className="gradient-purple-love d-block rounded-circle"/></div>
            </div>
            <div className="row p-1">
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="black" className="bg-black d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="white" className="bg-grey d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="primary" className="bg-primary d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="success" className="bg-success d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="warning" className="bg-warning d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="info" className="bg-info d-block rounded-circle"/></div>
              <div className="col"><span style={{ width: 20, height: 20 }} data-bg-color="danger" className="bg-danger d-block rounded-circle"/></div>
            </div>
          </div>

          <h6 className="text-center text-bold-500 mb-3 text-uppercase">Sidebar Bg Image</h6>
          <div className="cz-bg-image row">
            <div className="col mb-3"><img src="../app-assets/img/sidebar-bg/01.jpg" width="90" className="rounded"/></div>
            <div className="col mb-3"><img src="../app-assets/img/sidebar-bg/02.jpg" width="90" className="rounded"/></div>
            <div className="col mb-3"><img src="../app-assets/img/sidebar-bg/03.jpg" width="90" className="rounded"/></div>
            <div className="col mb-3"><img src="../app-assets/img/sidebar-bg/04.jpg" width="90" className="rounded"/></div>
            <div className="col mb-3"><img src="../app-assets/img/sidebar-bg/05.jpg" width="90" className="rounded"/></div>
            <div className="col mb-3"><img src="../app-assets/img/sidebar-bg/06.jpg" width="90" className="rounded"/></div>
          </div>

          <div className="togglebutton">
            <div className="switch"><span>Sidebar Bg Image</span>
              <div className="float-right">
                <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                  <input id="sidebar-bg-img" type="checkbox" checked="" className="custom-control-input cz-bg-image-display" />
                  <label htmlFor="sidebar-bg-img" className="custom-control-label" />
                </div>
              </div>
            </div>
          </div>



          <div className="togglebutton">
            <div className="switch"><span>Compact Menu</span>
              <div className="float-right">
                <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                  <input id="cz-compact-menu" type="checkbox" className="custom-control-input cz-compact-menu" />
                  <label htmlFor="cz-compact-menu" className="custom-control-label"></label>
                </div>
              </div>
            </div>
          </div>



          <div>
            <label htmlFor="cz-sidebar-width">Sidebar Width</label>
            <select id="cz-sidebar-width" className="custom-select cz-sidebar-width float-right">
              <option value="small">Small</option>
              <option value="medium" selected="">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );

  checkRole = (role, location) => {
    if((
      role === 'expert' &&
      (
        location.type === routes.ROUTE_DASHBOARD ||
        location.type === routes.ROUTE_EXPERTS
        || location.type === routes.ROUTE_SIGNAL
      )) || (
        role === 'member' &&
      (
        location.type === routes.ROUTE_ADMIN_USER || location.type === routes.ROUTE_SIGNAL_EXPERT || location.type === routes.ROUTE_ACCOUNT 
      ))
    ) {
      return true;
    }
    return false;
  };

  render() {
    const { location, isAuthenticated, role, isLoaded } = this.props;
    if (!isLoaded) {
      return <Loading />
    } else {
      if(isAuthenticated && (location.type === routes.ROUTE_FORGOT || location.type === routes.ROUTE_LOGIN || location.type === routes.ROUTE_REGISTER)) {
        this.props.actionNavigateTo(routes.ROUTE_HOME);
        return null;
      }
      switch (location.type) {
        case routes.ROUTE_LOGIN:
          return <LoginPage />;
        case routes.ROUTE_FORGOT:
          return <Forgot />;
        case routes.ROUTE_REGISTER:
          return <Register />;
        case routes.ROUTE_ERROR_403:
          // return <ErrorPage />;
          return <div>403 Error. You do not have Sufficient Permissions to Access This Page</div>;
        case routes.ROUTE_HOME:
          return <LandingPage />;
        case routes.ROUTE_HELP:
          return <Help />;
        case routes.ROUTE_SUPPORT:
          return this.commonComponents();
        case routes.ROUTE_DASHBOARD:
        case routes.ROUTE_EXPERTS:
        case routes.ROUTE_EXPERT_DETAIL:
        case routes.ROUTE_INFORMATION:
        case routes.ROUTE_ACCOUNT:
        case routes.ROUTE_CHANGEPASSWORD:
        case routes.ROUTE_MANAGESIGNAL:
        case routes.ROUTE_SIGNAL:
        case routes.ROUTE_SIGNAL_EXPERT:
        case routes.ROUTE_ADMIN_USER:
          // return this.commonComponents();
        {
          if (isAuthenticated) {
            if(!this.checkRole(role, location)) {
              return this.commonComponents();
            }
            this.props.actionNavigateTo(routes.ROUTE_ERROR_403);
          } else {
            this.props.actionNavigateTo(routes.ROUTE_LOGIN);
            return null;
          }
        }
        default:
          return <div>ErrorPage</div>;
      }
    }
  }
}

export default compose(
  connect(state => ({
    location: state.location,
    isLoaded: state.firebase.profile.isLoaded,
    isAuthenticated: !state.firebase.auth.isEmpty,
    role: state.firebase.profile.role,
    profileUser: state.firebase.profile,
  }),
  {
    actionNavigateTo
  })
)(App);

