import { createReducer } from './../../utils/helpers/reducerUtil';
import { FETCH_SIGNAL_HISTORY } from './expertContants';

const initialState = [];

export const fetchSignalHistory = (state, payload) => {
  return payload.signalHistory;
};

export default createReducer(initialState, {
  [FETCH_SIGNAL_HISTORY]: fetchSignalHistory
});
