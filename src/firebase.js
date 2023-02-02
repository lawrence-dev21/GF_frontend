import { initializeApp } from "firebase/app";
import { getFirestore }  from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyA9LFX74P6kccwWsEXZWmvdQfPVr9rVC7U",
  authDomain: "global-fund-3ca4c.firebaseapp.com",
  databaseURL: "https://global-fund-3ca4c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "global-fund-3ca4c",
  storageBucket: "global-fund-3ca4c.appspot.com",
  messagingSenderId: "263547899509",
  appId: "1:263547899509:web:fb40c2aad750fce332723c",
  measurementId: "G-C2HNDXGTRZ"

};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)
