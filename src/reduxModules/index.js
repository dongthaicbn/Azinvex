// Import your reducer here and add your reducer below
import system from './common/system';
import home from './pageHome/home';
import signal from './pageManageSignal/signalReducers';
import async from './async/asyncReducer';
import events from './pageDashboard/notificationReducers';
import expert from './expert/expertReducers';

const reducers = {
  system,
  home,
  signal,
  async,
  events,
  expert
};
export default reducers;
