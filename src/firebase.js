import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_Zn_eURAPSSddbM0-fuAWEHrRcNXIIgQ",
  authDomain: "lumora-hub.firebaseapp.com",
  projectId: "lumora-hub",
  storageBucket: "lumora-hub.firebasestorage.app",
  messagingSenderId: "447514104261",
  appId: "1:447514104261:web:4ee4565a38f28fc8187bac"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export default app;