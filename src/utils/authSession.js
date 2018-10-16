import cookie from 'js-cookie';
import { redirect, NOT_FOUND } from 'redux-first-router';
import { SSO_TOKEN } from './constants/storages';
import {
  ROUTE_LOGIN,
  ROUTE_LOGOUT,
  ROUTE_TIMEOUT,
  ROUTE_ERROR_400,
  ROUTE_ERROR_403,
  ROUTE_ERROR_404,
  ROUTE_ERROR_500,
  ROUTE_ERROR_502,
  ROUTE_ERROR_503
} from './constants/routes';
/**
 * SSO Validator
 *
 * @param thunk dispatch
 * @param functon getState
 * @param functon action
 * @see checkSSO check if user SSO is still valid
 */
export const checkSSO = async (dispatch, getState, action) => {
  let allowed = false;
  if (cookie.get(SSO_TOKEN)) {
    allowed = true;
  } else {
    allowed = false;
  }

  if (action.type !== ROUTE_LOGIN
    && action.type !== ROUTE_LOGOUT
    && action.type !== ROUTE_TIMEOUT
    && action.type !== NOT_FOUND
    && action.type !== ROUTE_ERROR_400
    && action.type !== ROUTE_ERROR_403
    && action.type !== ROUTE_ERROR_404
    && action.type !== ROUTE_ERROR_500
    && action.type !== ROUTE_ERROR_502
    && action.type !== ROUTE_ERROR_503
  ) {
    if (!allowed) {
      dispatch(redirect({ type: ROUTE_LOGIN }));
    }
  } else if (action.type === ROUTE_LOGIN || action.type === ROUTE_LOGOUT) {
    // if (allowed) {
    //   dispatch(redirect({ type: ROUTE_HOME }));
    // }
  }
};
