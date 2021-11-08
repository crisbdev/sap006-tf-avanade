/*eslint-disable*/
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import "firebase/storage"
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB-j5KajPoGLJuIcOn6HdZ6Yv4ptT8u04o",
  authDomain: "teste-jul.firebaseapp.com",
  projectId: "teste-jul",
  storageBucket: "teste-jul.appspot.com",
  messagingSenderId: "491879338504",
  appId: "1:491879338504:web:b506dc4157a15ae63177bd"
};

 const start = firebase.initializeApp(firebaseConfig);

 const storage = firebase.storage()
export const db = start.firestore

 export default  storage;
