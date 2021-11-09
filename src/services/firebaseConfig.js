/* eslint-disable  */
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: 'AIzaSyB4FFExJcW58tvCypBK0ds5dQh-nx-jwHI',
  authDomain: 'sap006-tf-avanade.firebaseapp.com',
  projectId: 'sap006-tf-avanade',
  storageBucket: 'sap006-tf-avanade.appspot.com',
  messagingSenderId: '698019498679',
  appId: '1:698019498679:web:b1d3a11377083bf1a89b32',
};

const start = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export const dataStore = firebase.firestore
////export const firestore =   firebase.firestore();
export const db = start.firestore;

export default storage;
