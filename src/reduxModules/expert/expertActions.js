import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { FETCH_SIGNAL_HISTORY } from './expertContants';
import firebase from './../../utils/redux/configureFirebase';

export const listenExperts = () =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.setListener({
      collection: 'users',
      where: ['role', '==', 'expert'],
      storeAs: 'experts'
    });
  };
export const unlistenExperts = () =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.unsetListener({
      collection: 'users',
      where: ['role', '==', 'expert']
    });
  };
/* eslint-disable */
export const getSignalHistory = (lastSignalHistory, eid) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = firebase.firestore();
  const signalHistoryRef = firestore.collection('signals');
  try {
    dispatch(asyncActionStart());
    const startAfter =
      lastSignalHistory &&
      (await firestore
        .collection('signals')
        .doc(lastSignalHistory.id)
        .get());
    let query;
    lastSignalHistory
      ? (query = signalHistoryRef
        .where('expert.id', '==', eid)
        .where('status', '==', 'closed')
        .orderBy('startAt', 'desc')
        .startAfter(startAfter)
        .limit(10))
      : (query = signalHistoryRef
        .where('expert.id', '==', eid)
        .where('status', '==', 'closed')
        .orderBy('startAt', 'desc')
        .limit(10));
    let querySnap = await query.get();
    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let signalHistory = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      signalHistory.push(evt);
    }
    dispatch({ type: FETCH_SIGNAL_HISTORY, payload: { signalHistory } });
    dispatch(asyncActionFinish());
    return querySnap;

  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
}

export const addPost = (creds) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const currentUser = getState().firebase.auth;
  try {
    dispatch(asyncActionStart());
    let newData = { ...creds, view: 0, createdAt: firestore.FieldValue.serverTimestamp()};
    await firestore.add(
      {
        collection: 'users',
        doc: currentUser.uid,
        subcollections: [{ collection: 'posts' }]
      },
      newData
    );
    dispatch(asyncActionFinish());
  } catch (error) {
   console.log(error) 
   dispatch(asyncActionError());
  }
}

export const listenPost = () => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  firestore.setListener(
    {
      collection: 'users',
      doc: getState().location.payload.id,
      subcollections: [{ collection: 'posts' }],
      storeAs: 'expertPosts',
    },
  )
}

export const unlistenPost = () => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  firestore.unsetListener(
    {
      collection: 'users',
      doc: getState().location.payload.id,
      subcollections: [{ collection: 'posts' }]
    },
  )
}

export const addEventComment = (expertId, values) => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  console.log(firebase);
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  };
  try {
    await firebase.push(`expert_chat/${expertId}`, newComment);
  } catch (error) {
    console.log(error);
  }
};