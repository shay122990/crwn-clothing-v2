import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//Firestore , creating the user from authenticated user
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return; //preventive code.
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //We check to see if the snapshot exists.
  //If it does not exist, then we want to set it inside of our database.
  //So we're setting the doc with the objects.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  //dont setDoc just return existing userDocRef
  return userDocRef;
};

//Creating/registering authenticated user inside our firebase authentication tab ( not a document inside our firestore database)
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

//Signing In existing user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
