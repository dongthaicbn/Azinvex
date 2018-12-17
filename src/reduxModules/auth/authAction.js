/* eslint-disable*/
import { toastr } from 'react-redux-toastr'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import * as Push from 'push.js';

export const register = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const { email, displayName, password, phone, prefix } = user
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
      information: { phone },
      photoURL: "/assets/user.png",
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    await firestore.set(`users/${createdUser.uid}`, { ...newUser })
    toastr.success('Success', 'Đăng ký thành công')
    dispatch(asyncActionFinish());
  } catch (error) {
    toastr.error('Error', error.message)
    dispatch(asyncActionError());
  }
};
export const monitorRefresh = user => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const messaging = firebase.messaging();
  messaging.onTokenRefresh(() => {
    messaging.getToken()
    .then(refreshedToken => {
      console.log('Token refreshed.');
      dispatch(saveToken(user, refreshedToken))
    })
    .catch( err => console.log(err, 'Unable to retrieve new token') )
  });
}

const saveToken = (user, token) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const currentTokens = user.fcmTokens || {}
  if (!currentTokens[token]) {
    const userRef = firestore.collection('users').doc(user.uid)
    const tokens = { ...currentTokens, [token]: true }
    userRef.update({ fcmTokens: tokens })
  }
}
export const getPermission = user => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const messaging = firebase.messaging();
  messaging
  .requestPermission()
  .then(() => {
    console.log("Notification permission granted.");
    messaging
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          dispatch(saveToken(user,currentToken));
          console.log("Token generated is ", currentToken);
        } else {
          console.log(
            "No Instance ID token available. Request permission to generate one."
          );
        }
      })
      .catch(err => {
        console.log("An error occurred while retrieving token. ", err);
      });
  })
  .catch(err => {
    console.log("Unable to get permission to notify.", err);
  });
}
export const receiveMessages = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const messaging = firebase.messaging();
  messaging.onMessage(payload => {
    console.log('Message received. ', payload);
  });
}


export const login = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  dispatch(asyncActionStart());
  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
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
export const forgot = email => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  dispatch(asyncActionStart());
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    toastr.success('Success', 'Đã gửi thông tin reset mật khẩu về mail của bạn!')
    window.location.href = '#/login';
    dispatch(asyncActionFinish());
  }).catch(function (error) {
    toastr.error('Error', error.message)
    dispatch(asyncActionError());
  });
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

export const deleteComment = (commandId) => {
  async (dispatch, getState, { getFirebase, getFirestore }) => {

  }
}
