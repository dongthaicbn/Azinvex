// Import your reducer here and add your reducer below
import system from './common/system';
import home from './pageHome/home';
import signal from './pageManageSignal/signalReducers';
import async from './async/asyncReducer';
import events from './pageDashboard/notificationReducers';

const reducers = {
  system,
  home,
  signal,
  async,
  events
};
export default reducers;
