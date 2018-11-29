import React from 'react';
import { connect } from 'react-redux';
import * as routes from './utils/constants/routes';
import Dashboard from './views/pageDashboard/Dashboard';
import Experts from './views/pageExperts/Experts';
import ExpertDetail from './views/pageExpertDetail/ExpertDetail';
import Information from './views/pageInformation/Information';
import Account from './views/pageAccount/Account';
import Signal from './views/pageSignal/Signal';
import SignalExpert from './views/pageSignalExpert/Signal';
import Support from './views/pageSupport/Support';
import User from './views/pageUser/User';
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
    case routes.ROUTE_SIGNAL:
      return <Signal />;
    case routes.ROUTE_SIGNAL_EXPERT:
      return <SignalExpert />;
    case routes.ROUTE_ADMIN_USER:
      return <User />;
    case routes.ROUTE_SUPPORT:
      return <Support />;
    default:
      return null;
  }
};

export default connect(state => ({ location: state.location }))(Routes);

