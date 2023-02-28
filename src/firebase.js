
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB1mAAAdyXSgLJkvtCSeoQQwFoGtf20FUY",
  authDomain: "fir-crud-javasc.firebaseapp.com",
  projectId: "fir-crud-javasc",
  storageBucket: "fir-crud-javasc.appspot.com",
  messagingSenderId: "909744793607",
  appId: "1:909744793607:web:5390c4cbc78c0909ed62a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)