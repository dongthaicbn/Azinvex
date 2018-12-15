/*eslint-disable*/
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyD2_w2xCYLkNVV-s6fhEfac2OTBRmsqOgo",
  authDomain: "azinvex-221903.firebaseapp.com",
  databaseURL: "https://azinvex-221903.firebaseio.com",
  projectId: "azinvex-221903",
  storageBucket: "azinvex-221903.appspot.com",
  messagingSenderId: "1057037050140"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const settings = {
  timestampsInSnapshots: true
}
const messaging = firebase.messaging();
messaging.requestPermission().then(function () {
  console.log('Notification permission granted.');
  // return messaging.getToken()
}).then(token => {
  console.log(token)
  // saveToken(firebaseUser, token)
})
.catch(function (err) {
  console.log('Unable to get permission to notify.', err);
});
firestore.settings(settings)
export default firebase;