/*eslint-disable*/
import * as firebase from "firebase";
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


export default firebase.initializeApp(firebaseConfig);