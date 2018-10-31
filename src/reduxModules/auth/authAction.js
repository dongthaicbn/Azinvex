/* eslint-disable*/
import cookie from 'js-cookie';
import api from '../../utils/api';
import store from '../../utils/redux/configureStore';

export const register = user => async dispatch => {
  try {
    const data = await api({
      method: 'post',
      url: '/users/register',
      data: user
    });
    console.log('Register Success!');
  } catch (error) {
    console.log('Register Fail!');
  }
};

export const login = user => async (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.auth().signInWithEmailAndPassword(user.username, user.password)
  .then(firebaseUser => {
    console.log('login susscess', firebaseUser)
    window.location.href = '#/';
   })
  .catch(error => {
    console.log('login fail', error)
  })
};
