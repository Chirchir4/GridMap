import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdGyeDPyH_0Dq8gY2Mz49pzOdsROkHFd4",
  authDomain: "mapwork-e0dde.firebaseapp.com",
  databaseURL: "https://mapwork-e0dde-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mapwork-e0dde",
  storageBucket: "mapwork-e0dde.appspot.com",
  messagingSenderId: "946149286484",
  appId: "1:946149286484:web:412fa0fdec310d728e83c1",
  measurementId: "G-LW7J8MHXDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword,db };
