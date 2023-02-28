
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDuGOTHz4qCZA1bbNNmmKi39HhEz9nXgnY",
  authDomain: "db-pacientes.firebaseapp.com",
  projectId: "db-pacientes",
  storageBucket: "db-pacientes.appspot.com",
  messagingSenderId: "404316742828",
  appId: "1:404316742828:web:9316fea39b46abfcd4ab09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)