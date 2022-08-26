import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAp4d5h4DU-M9NpFFO76Ij1fou7a7H5AQA",
  authDomain: "crwn-clothing-db-d796c.firebaseapp.com",
  projectId: "crwn-clothing-db-d796c",
  storageBucket: "crwn-clothing-db-d796c.appspot.com",
  messagingSenderId: "435451474153",
  appId: "1:435451474153:web:3713d0b6bbb4b111e68078",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
