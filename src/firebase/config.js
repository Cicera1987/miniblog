import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB4DjoKOuw9uNSxDb4c5jbUewswJuYZdW4",
  authDomain: "miniblog-9590b.firebaseapp.com",
  projectId: "miniblog-9590b",
  storageBucket: "miniblog-9590b.appspot.com",
  messagingSenderId: "919563158136",
  appId: "1:919563158136:web:917364d953a9bde87aa38d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};