import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEnIJlSv1BLPuGfQhOVrspTxQbmAgC87s",
  authDomain: "trello-new-clone.firebaseapp.com",
  databaseURL: "https://trello-new-clone-default-rtdb.firebaseio.com",
  projectId: "trello-new-clone",
  storageBucket: "trello-new-clone.appspot.com",
  messagingSenderId: "598929690555",
  appId: "1:598929690555:web:c7f5d5fc8cd238a59f3e9e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export { app, auth, provider, db };
