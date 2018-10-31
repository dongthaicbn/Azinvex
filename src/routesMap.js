import combineThunks from './utils/redux/combineThunks';
// import { actionFetchHomeData } from './reduxModules/pageHome/homeAction';

const routesMap = {
  '@route/HOME': {
    path: '/',
    thunk: combineThunks(
      // actionFetchHomeData()
    )
  },
  '@route/REGISTER': {
    path: '/register',
    thunk: combineThunks()
  },
  '@route/DASHBOARD': {
    path: '/dashboard',
    thunk: combineThunks()
  },
  '@route/EXPERTS': {
    path: '/experts',
    thunk: combineThunks()
  },
  '@route/EXPERT/DETAIL': {
    path: '/expert/:id',
    thunk: combineThunks()
  },
  '@route/INFORMATION': {
    path: '/information',
    thunk: combineThunks()
  },
  '@route/ACCOUNT': {
    path: '/account',
    thunk: combineThunks()
  },
  '@route/CHANGEPASSWORD': {
    path: '/changepassword',
    thunk: combineThunks()
  },
  '@route/MANAGESIGNAL': {
    path: '/managesignal',
    thunk: combineThunks()
  },
  '@route/SIGNAL': {
    path: '/signals',
    thunk: combineThunks()
  },
  '@route/ADMIN/USER': {
    path: '/admin/user',
    thunk: combineThunks()
  },
  '@route/HELP': {
    path: '/help',
    thunk: combineThunks()
  },
  '@route/SUPPORT': {
    path: '/support',
    thunk: combineThunks()
  },
  '@route/LOGIN': {
    path: '/login',
    thunk: combineThunks()
  },
  '@route/ERROR_403': '/error403'
};
export default routesMap;
