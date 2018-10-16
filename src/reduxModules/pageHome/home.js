import { SUCCESS, ERROR, PENDING } from '../../utils/constants/actionTypes';
import { FETCH_HOME_DATA } from './homeConstant';

const initialState = {
  homeData: [],
  isLoadingHome: false
};

const home = (state = initialState, action = {}) => {
  switch (action.type) {
    case PENDING:
      return {
        ...state,
        isLoadingHome: true
      };
    case FETCH_HOME_DATA + SUCCESS:
      return {
        ...state,
        homeData: action.payload,
        isLoadingHome: false
      };
    case ERROR:
      return {
        ...state,
        isLoadingHome: false
      };
    default:
      return state;
  }
};

export default home;
