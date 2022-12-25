import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
// import getAuth from firebase/auth
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// rewritten colRef for queries
// import query & where
const q = query(colRef, orderBy("createdAt"));
// continue after real time collection

// get collection data on initial load only
// getDocs(colRef).then((snapshot) => {
//   let books = [];
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(books);
// });

// real time collection data
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// real time collection of queries
onSnapshot(q, (snapshot) => {
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
    createdAt: serverTimestamp(),
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
    deleteBookForm.reset();
  });
});

// get a single document
const docRef = doc(db, "books", "AdezkBiRSPCgLcs4R3Zs");

// getDoc(docRef).then((doc) => {
//   console.log(doc.data(doc.id));
// });

// to get updates any time a doc is changed ie - subscription
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// update a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // import updateDoc
  const docRef = doc(db, "books", updateForm.id.value);
  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

// signup
const SignUpForm = document.querySelector(".signup");
SignUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // import createUserWithEmailAndPassword from fb/auth
  const email = SignUpForm.email.value;
  const pswrd = SignUpForm.password.value;
  createUserWithEmailAndPassword(auth, email, pswrd)
    .then((cred) => {
      console.log("user created: ", cred.user);
      SignUpForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
