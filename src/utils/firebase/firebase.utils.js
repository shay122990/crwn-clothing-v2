import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp4d5h4DU-M9NpFFO76Ij1fou7a7H5AQA",
  authDomain: "crwn-clothing-db-d796c.firebaseapp.com",
  projectId: "crwn-clothing-db-d796c",
  storageBucket: "crwn-clothing-db-d796c.appspot.com",
  messagingSenderId: "435451474153",
  appId: "1:435451474153:web:3713d0b6bbb4b111e68078",
};

const firebaseApp = initializeApp(firebaseConfig);

//Authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //We check to see if the snapshot exists.
  //If it does not exist, then we want to set it inside of our database.
  //So we're just saying, yo, set the dock with this object.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};
