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

export const login = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
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

export const updatePassword = (creds) =>
  async (dispatch, getState, { getFirebase, getFirestore })  => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(creds.password);
      toastr.success('Success', 'Your password has been updated')
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      })
    }
  }
