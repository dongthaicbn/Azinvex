import cookie from 'js-cookie';
import { SET_SHOW_TOAST, HIDE_TOAST, SET_LANGUAGE_ON_MOUNT } from '../../utils/constants/actionTypes';
import { DEFAULT_LANGUAGE_CODE, DEFAULT_LANGUAGE_TRANS } from '../../utils/constants/locale';
import { LANGUAGE_CODE, LANGUAGE_TRANS } from '../../utils/constants/storages';

const initialState = {
  languageCode: cookie.get(LANGUAGE_CODE) || DEFAULT_LANGUAGE_CODE,
  languageTrans: cookie.get(LANGUAGE_TRANS) || DEFAULT_LANGUAGE_TRANS,
  isShowToast: false,
  typeToast: '',
  messageToast: ''
};

const system = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LANGUAGE_ON_MOUNT:
      cookie.set(LANGUAGE_TRANS, action.payload.languageTrans);
      cookie.set(LANGUAGE_CODE, action.payload.languageCode);
      return {
        ...state,
        languageCode: action.payload.languageCode,
        languageTrans: action.payload.languageTrans,
        isLoading: false
      };
    case SET_SHOW_TOAST:
      return {
        ...state,
        isShowToast: true,
        typeToast: action.payload.typeToast,
        messageToast: action.payload.messageToast
      };
    case HIDE_TOAST:
      return initialState;
    default:
      return state;
  }
};


export default system;
