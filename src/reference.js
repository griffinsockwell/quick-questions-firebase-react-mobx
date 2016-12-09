import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyBmD2jYN7tSyyHRdtkju-G5FNF9NH_BtD4',
  authDomain: 'quick-questions.firebaseapp.com',
  databaseURL: 'https://quick-questions.firebaseio.com',
  storageBucket: 'quick-questions.appspot.com',
  messagingSenderId: '669222534676',
});
const rootRef = firebase.database().ref();
export const authRef = firebase.auth();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const questionsRef = rootRef.child('questions');
export const answersRef = rootRef.child('answers');
export const timeRef = firebase.database.ServerValue.TIMESTAMP;
