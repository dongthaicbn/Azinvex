/* eslint-disable*/
import { toastr } from 'react-redux-toastr'
import api from '../../utils/api';

export const register = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const {email, displayName, password, phone, prefix} = user
  const firebase = getFirebase();
  const firestore = getFirestore();
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
      information:{phone},
      photoURL: "/assets/user.png",
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    await firestore.set(`users/${createdUser.uid}`, {...newUser})
  } catch (error) {
    console.log(error)
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
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(creds.password);
      toastr.success('Success', 'Cập nhật mật khẩu thành công')
    } catch (error) {
      toastr.error('Error', error.message)
    }
  }