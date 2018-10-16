/* eslint-disable*/
import { connectRoutes } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase , firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';

import firebase from './configureFirebase';
import createHistory from 'history/createHashHistory';
import options from '../../options';

import reducers from '../../reduxModules';
import routesMap from '../../routesMap';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: true
};

const history = createHistory();
const { reducer, middleware, enhancer } = connectRoutes(history, routesMap, options);

const rootReducer = combineReducers({ 
  ...reducers, 
  location: reducer,
  firebase : firebaseReducer,
  firestore : firestoreReducer
});

const middlewares = applyMiddleware(thunk.withExtraArgument(getFirebase), middleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, 
  composeEnhancers(
    enhancer, 
    middlewares, 
    reactReduxFirebase(firebase, rrfConfig), 
    reduxFirestore(firebase)
  )
);

export default store;
