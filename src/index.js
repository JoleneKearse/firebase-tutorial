import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGNh_VwljSFAhudWCtouL_xS4nFi-zm2E",
  authDomain: "fir-9-tutorial-80810.firebaseapp.com",
  projectId: "fir-9-tutorial-80810",
  storageBucket: "fir-9-tutorial-80810.appspot.com",
  messagingSenderId: "593305233485",
  appId: "1:593305233485:web:23af68fc63091127099404",
};

// initialize firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef).then((snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});
