import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

// add document
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // import addDoc to get ref to collection
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    // reset the form
    addBookForm.reset();
  });
});

// delete document
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // import deleteDoc & doc, which gets a ref to the document
  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset()
  })
});
