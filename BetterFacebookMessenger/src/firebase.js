
import firebase from 'firebase/app';
import "firebase/auth";


export const auth = firebase.initializeApp({
  apiKey: "AIzaSyDycwKRGtEZaTFynwrl_NpWs_5TITIppOg",
  authDomain: "unichat-b4896.firebaseapp.com",
  projectId: "unichat-b4896",
  storageBucket: "unichat-b4896.appspot.com",
  messagingSenderId: "38715887590",
  appId: "1:38715887590:web:5e438e2d268d273a209027"
}).auth();

