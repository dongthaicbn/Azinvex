import React from 'react';
import { connect } from 'react-redux';
import * as routes from './utils/constants/routes';
import Dashboard from './views/pageDashboard/Dashboard';
import Experts from './views/pageExperts/Experts';
import ExpertDetail from './views/pageExpertDetail/ExpertDetail';
import Information from './views/pageInformation/Information';
import Account from './views/pageAccount/Account';
import Signal from './views/pageSignal/Signal';
import ManageSignal from './views/pageManageSignal/ManageSignal';
import Help from './views/pageHelp/Help';
import Support from './views/pageSupport/Support';
import User from './views/pageUser/User';
import Login from './views/pageLogin/Login';
import Register from './views/pageRegister/Register';
import ChangePassword from './views/pageChangePassword/ChangePassword';

const Routes = ({ location }) => {
  switch (location.type) {
    case routes.ROUTE_DASHBOARD:
      return <Dashboard />;
    case routes.ROUTE_EXPERTS:
      return <Experts />;
    case routes.ROUTE_EXPERT_DETAIL:
      return <ExpertDetail />;
    case routes.ROUTE_INFORMATION:
      return <Information />;
    case routes.ROUTE_ACCOUNT:
      return <Account />;
    case routes.ROUTE_CHANGEPASSWORD:
      return <ChangePassword />;
    case routes.ROUTE_MANAGESIGNAL:
      return <ManageSignal />;
    case routes.ROUTE_SIGNAL:
      return <Signal />;
    case routes.ROUTE_ADMIN_USER:
      return <User />;
    case routes.ROUTE_HELP:
      return <Help />;
    case routes.ROUTE_SUPPORT:
      return <Support />;
    case routes.ROUTE_LOGIN:
      return <Login />;
    case routes.ROUTE_REGISTER:
      return <Register />;
    default:
      return null;
  }
};

export default connect(state => ({ location: state.location }))(Routes);

