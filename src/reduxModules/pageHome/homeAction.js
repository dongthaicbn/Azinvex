import { CancelToken } from 'axios';
import api from '../../utils/api';
import { SUCCESS, ERROR, PENDING } from '../../utils/constants/actionTypes';
import { FETCH_HOME_DATA } from './homeConstant';

const source = CancelToken.source();

export const actionFetchHomeData = () => async dispatch => {
  try {
    dispatch({ type: PENDING });
    const data = await api({
      method: 'get',
      url: '/posts',
      cancelToken: source.token
    });
    console.log('data:', data);
    dispatch({ type: FETCH_HOME_DATA + SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};
