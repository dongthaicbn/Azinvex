export default {
  onBeforeChange: async () => {
    console.log('check SSO');
  },
  onAfterChange: async () => {
  }
};

// // import { checkSSO } from './utils/authSession';

// export default {
//   onBeforeChange: async (dispatch, getState, { action }) => {
//     // console.log('onBeforeChange: ', getState(), '   action: ', action);
//     // this will check if user still have a valid SSO
//     console.log('check SSO');
//     // checkSSO(dispatch, getState, action);
//   },
//   onAfterChange: async (dispatch, getState) => {
//   }
// };
