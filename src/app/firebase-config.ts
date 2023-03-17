import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb90XU5wWgvudyk7XJE0qqzOuX7UcbvWI",
  authDomain: "simple-latex.firebaseapp.com",
  projectId: "simple-latex",
  storageBucket: "simple-latex.appspot.com",
  messagingSenderId: "748449464383",
  appId: "1:748449464383:web:19402825bd1403fcadf88a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export {auth, db}
