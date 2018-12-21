/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { compose } from 'recompose';
import 'antd/dist/antd.css';
import './App.scss';
import Routes from './Routes';
import Navigation from './views/components/Navigation/Navigation';
import NavigationMobile from './views/components/Navigation/NavigationMobile';
import ScrollBar from './views/components/ScrollBar/ScrollBar';
import LandingPage from './views/pageLanding/Landing';
import LoginPage from './views/pageLogin/Login';
import Forgot from './views/pageForgot/Forgot';
import Header from './views/components/Header/Header';
import Loading from './views/components/Loading/Loading';
import Register from './views/pageRegister/Register';
import Help from './views/pageHelp/Help';
import SideBarSetting from './views/components/SideBarSetting/SideBarSetting';
import firbaseApp from './utils/redux/configureFirebase'
import { getPermission, monitorRefresh, receiveMessages } from './reduxModules/auth/authAction'

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
      isSettingTheme: false,
      imgName: '04',
      bgColor: {
        backgroundColor: 'black'
      }
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
  };
  handleTheme = () => {
    this.setState({ isSettingTheme: !this.state.isSettingTheme });
  };
  // handleChangeBGImage = imageSelect => { this.setState({ imgName: imageSelect }) };
  // handleChangeBGColor = colorSelect => { this.setState({ bgColor: colorSelect }) };

  commonComponents = () => (
    <div className="app-container">
      <Layout>
        <Layout.Sider
          trigger={null}
          collapsible
          width={250}
          collapsed={this.state.collapsed}
          style={{
            height: '100vh',
            backgroundImage: 'url("../app-assets/img/sidebar-bg/04.jpg")',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          <Navigation collapsed={this.state.collapsed} bgColor={this.state.bgColor} />
        </Layout.Sider>
        <NavigationMobile collapsed={this.state.collapsed} toggle={this.toggle} bgColor={this.state.bgColor} />
        <Layout>
          <Header profileUser={this.props.profileUser} collapsed={this.state.collapsed} toggle={this.toggle} />
          <Layout.Content className="content-container">
            <ScrollBar>
              <div style={{ padding: '24px 16px' }}>
                <Routes />
              </div>
            </ScrollBar>
          </Layout.Content>
        </Layout>
      </Layout>
      <div className="customizer border-left-blue-grey border-left-lighten-4 d-none d-sm-none d-md-block">
        <a id="customizer-toggle-icon" className="customizer-toggle bg-danger" onClick={this.handleTheme}>
          {/*<i className="ft-settings font-medium-4 fa fa-spin white align-middle" />*/}
          <i className="ft-bell font-medium-4 white align-middle"/>
        </a>
        {this.state.isSettingTheme &&
          <SideBarSetting
            handleClose={this.handleTheme}
          />
        }
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
              this.props.getPermission(this.props.currentUser);
              this.props.monitorRefresh(this.props.currentUser);
              this.props.receiveMessages();
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
    currentUser: state.firebase.auth
  }),
  {
    actionNavigateTo,
    getPermission,
    monitorRefresh,
    receiveMessages
  })
)(App);

