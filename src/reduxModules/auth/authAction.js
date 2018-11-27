/* eslint-disable*/
import { toastr } from 'react-redux-toastr'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';

export const register = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const {email, displayName, password, phone, prefix} = user
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch(asyncActionStart());
  try {
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    let createdUser = firebase.auth().currentUser;
    await createdUser.updateProfile({ displayName })
    // create a new profile in firestore
    let newUser = {
      displayName, email, 
      role: "member",
      followerCount: 0,
      followedCount: 0,
      account: 0,
      totalpips: 0,
      signalWin: 0,
      signalLoss: 0,
      information:{phone},
      photoURL: "/assets/user.png",
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    await firestore.set(`users/${createdUser.uid}`, {...newUser})
    toastr.success('Success', 'Đăng ký thành công')
    dispatch(asyncActionFinish());
  } catch (error) {
    toastr.error('Error', error.message)
    dispatch(asyncActionError());
  }
};

export const login = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  dispatch(asyncActionStart());
  firebase.auth().signInWithEmailAndPassword(user.username, user.password)
  .then(firebaseUser => {
    toastr.success('Success', 'Đăng nhập thành công')
    window.location.href = '#/';
    dispatch(asyncActionFinish());
   })
  .catch(error => {
    toastr.error('Error', error.message)
    dispatch(asyncActionError());
  })
  
};

export const updatePassword = (creds) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    dispatch(asyncActionStart());
    try {
      await user.updatePassword(creds.password);
      toastr.success('Success', 'Cập nhật mật khẩu thành công')
      dispatch(asyncActionFinish());
    } catch (error) {
      toastr.error('Error', error.message)
      dispatch(asyncActionError());
    }
  }