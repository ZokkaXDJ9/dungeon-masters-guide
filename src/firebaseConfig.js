// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANYtpLwLwhtjYEURfI-2UKb7-BSyNTMLs",
  authDomain: "dms-helper.firebaseapp.com",
  projectId: "dms-helper",
  storageBucket: "dms-helper.appspot.com",
  messagingSenderId: "1042518640882",
  appId: "1:1042518640882:web:d13b5caf698ee00dae286b",
  measurementId: "G-K06LVX9ZBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore(app);
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.error("Multiple tabs open, persistence can only be enabled in one tab at a time.");
    } else if (err.code == 'unimplemented') {
      console.error("The current browser does not support all of the features required to enable offline persistence.");
    }
  });

export { db, app };
