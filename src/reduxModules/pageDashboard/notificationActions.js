import { asyncActionStart, asyncActionFinish, asyncActionError } from './../async/asyncActions';
import { FETCH_EVENTS } from './notificationConstants';
import firebase from './../../utils/redux/configureFirebase';

export const getEventsForDashboard = lastEvent => async (dispatch, getState) => {
  const currentUser = getState().firebase.auth;
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection('notifications');
  try {
    dispatch(asyncActionStart());
    const startAfter =
      lastEvent &&
      (await firestore
        .collection('notifications')
        .doc(lastEvent.id)
        .get());
    let query;
    if (lastEvent) {
      query = eventsRef
        .where('uid', '==', currentUser.uid)
        .orderBy('createAt', 'desc')
        .startAfter(startAfter)
        .limit(10);
    } else {
      query = eventsRef
        .where('uid', '==', currentUser.uid)
        .orderBy('createAt', 'desc')
        .limit(10);
    }

    const querySnap = await query.get();
    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    const events = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      const evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      events.push(evt);
    }
    dispatch({ type: FETCH_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
