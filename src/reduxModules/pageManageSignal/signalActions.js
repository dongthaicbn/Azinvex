import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { SELECTED_SIGNAL } from './signalConstants';

export const API_URL = 'http://api.azinvex.com/api/';
// const delay = require('delay');

export const createSignal = signal => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const token = await firebase.auth().currentUser.getIdToken(true);
    dispatch(asyncActionStart());
    const {
      symbol,
      type,
      stoploss,
      takeprofit
    } = signal;
    try {
      const signalData = {
        type,
        stoploss,
        takeprofit,
        symbol,
        isFree: true
      };
      const axiosConfig = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      };
      const url = API_URL + 'signals';
      axios.post(url, signalData, axiosConfig).then(() => {
        dispatch(asyncActionFinish());
        toastr.success('Success', 'Signal mới khởi tạo thành công');
      }).catch(error => {
        dispatch(asyncActionError());
      });
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const selectSignal = signal => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    dispatch({ type: SELECTED_SIGNAL, payload: { signal } });
    try {
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updateSignal = (id, signal) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const token = await firebase.auth().currentUser.getIdToken(true);
    dispatch(asyncActionStart());
    const signalData = {
      stoploss: signal.stoploss,
      takeprofit: signal.takeprofit
    };

    try {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: token
        }
      };
      const url = API_URL + 'signals/' + id;
      axios.put(url, signalData, axiosConfig)
        .then(response => {
          dispatch(asyncActionFinish());
          dispatch({ type: SELECTED_SIGNAL, payload: {} });
          toastr.success('Success', 'Event has been updated');
        }).catch(error => {
          dispatch(asyncActionError());
          if (error.response.data.message[0]) {
            toastr.error('Lỗi Xảy Ra', error.response.data.message[0]);
          }
        });
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};


export const closeSignal = ticket => {
  return async (dispatch, getState, { getFirebase }) => {
    console.log('close order');
    const firebase = getFirebase();
    const token = await firebase.auth().currentUser.getIdToken(true);
    dispatch(asyncActionStart());
    try {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: token
        }
      };
      const url = API_URL + 'signals/' + ticket;
      const wait = ms => {
        return new Promise(r => setTimeout(r, ms));
      };
      axios.patch(url, null, axiosConfig);
      await wait(1000);
      dispatch(asyncActionFinish());
      toastr.success('Success', 'Đóng Signal thành công');
    } catch (error) {
      console.log(error);

      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

// export const cancelToggle = (cancelled, eventId) => async (dispatch, getState, { getFirestore }) => {
//   const firestore = getFirestore();
//   const message = cancelled
//     ? 'Are you sure you want to cancel the event?'
//     : 'This reactivate the event - are you sure?';
//   try {
//     toastr.confirm(message, {
//       onOk: () =>
//         firestore.update(`events/${eventId}`, {
//           cancelled: cancelled
//         })
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getEventsForDashboard = lastEvent => async (dispatch, getState) => {
//   let today = new Date(Date.now());
//   const firestore = firebase.firestore();
//   const eventsRef = firestore.collection('events');
//   try {
//     dispatch(asyncActionStart());
//     let startAfter =
//       lastEvent &&
//       (await firestore
//         .collection('events')
//         .doc(lastEvent.id)
//         .get());
//     let query;

//     lastEvent
//       ? (query = eventsRef
//           .where('date', '>=', today)
//           .orderBy('date')
//           .startAfter(startAfter)
//           .limit(2))
//       : (query = eventsRef
//           .where('date', '>=', today)
//           .orderBy('date')
//           .limit(2));

//     let querySnap = await query.get();

//     if (querySnap.docs.length === 0) {
//       dispatch(asyncActionFinish());
//       return querySnap;
//     }

//     let events = [];

//     for (let i = 0; i < querySnap.docs.length; i++) {
//       let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
//       events.push(evt);
//     }
//     dispatch({ type: FETCH_EVENTS, payload: { events } });
//     dispatch(asyncActionFinish());
//     return querySnap;
//   } catch (error) {
//     console.log(error);
//     dispatch(asyncActionError());
//   }
// };

// export const addEventComment = (eventId, values, parentId) => async (dispatch, getState, { getFirebase }) => {
//   const firebase = getFirebase();
//   const profile = getState().firebase.profile;
//   const user = firebase.auth().currentUser;
//   let newComment = {
//     parentId: parentId,
//     displayName: profile.displayName,
//     photoURL: profile.photoURL || '/assets/user.png',
//     uid: user.uid,
//     text: values.comment,
//     date: Date.now()
//   };
//   try {
//     await firebase.push(`event_chat/${eventId}`, newComment);
//   } catch (error) {
//     console.log(error);
//     toastr.error('Oops', 'Problem adding comment');
//   }
// };
