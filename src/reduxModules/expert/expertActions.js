import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { FETCH_SIGNAL_HISTORY } from './expertContants';
import firebase from './../../utils/redux/configureFirebase';

export const listenExperts = () =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.setListener(
      {
        collection: 'users',
        where: ['role', '==', 'expert'],
        storeAs: 'experts'
      }
    );
  };
export const unlistenExperts = () =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.unsetListener(
      {
        collection: 'users',
        where: ['role', '==', 'expert']
      });
  };
/* eslint-disable */
export const getSignalHistoryForDashboard = (lastSignalHistory, eid) => async (dispatch, getState, { getFirebase, getFirestore }) => {
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
        .orderBy('startAt', 'asc')
        .startAfter(startAfter)
        .limit(2))
      : (query = signalHistoryRef
        .where('expert.id', '==', eid)
        .where('status', '==', 'closed')
        .orderBy('startAt', 'asc')
        .limit(2));
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