import { SET_SHOW_TOAST, HIDE_TOAST } from '../../utils/constants/actionTypes';

const initialState = {
  isShowToast: false,
  typeToast: '',
  messageToast: ''
};

const system = (state = initialState, action = {}) => {
  switch (action.type) {
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
