import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
      apiKey: "AIzaSyDnGi_hdH8SKhGOcJ6zlrNW_-pDcdJGpOI",
      authDomain: "react-app-19b04.firebaseapp.com",
      projectId: "react-app-19b04",
      storageBucket: "react-app-19b04.appspot.com",
      messagingSenderId: "1020912913084",
      appId: "1:1020912913084:web:ae85bf936992b1f38b5eb9",
      measurementId: "G-PYRHKKD2CB"
  };
  
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { 
    db, 
    googleAuthProvider,
    facebookAuthProvider,
    firebase
};