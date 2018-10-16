import { SET_LANGUAGE_ON_MOUNT, SET_SHOW_TOAST, HIDE_TOAST } from '../../utils/constants/actionTypes';

const TOAST_DURATION = 3000;
let timeoutToast = null;

export const actionSetLanguageOnMount = (languageCode, languageTrans) => ({
  type: SET_LANGUAGE_ON_MOUNT,
  payload: {
    languageCode,
    languageTrans
  }
});

export const actionShowToast = (typeToast, messageToast) => dispatch => {
  dispatch({ type: SET_SHOW_TOAST, payload: { typeToast, messageToast } });
  if (timeoutToast) clearTimeout(timeoutToast);
  timeoutToast = setTimeout(() => dispatch(actionHideToast()), TOAST_DURATION);
};

export const actionHideToast = () => ({
  type: HIDE_TOAST
});
