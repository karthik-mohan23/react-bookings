import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4fa_jzIw0uYwlpS_As0Jh4Xn4IKIOSks",
  authDomain: "test1-27382.firebaseapp.com",
  projectId: "test1-27382",
  storageBucket: "test1-27382.appspot.com",
  messagingSenderId: "523681207541",
  appId: "1:523681207541:web:bff9d345dce19e615461bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// google OAuth
export const provider = new GoogleAuthProvider();
