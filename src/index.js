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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGNh_VwljSFAhudWCtouL_xS4nFi-zm2E",
  authDomain: "fir-9-tutorial-80810.firebaseapp.com",
  projectId: "fir-9-tutorial-80810",
  storageBucket: "fir-9-tutorial-80810.appspot.com",
  messagingSenderId: "593305233485",
  appId: "1:593305233485:web:23af68fc63091127099404",
};

// event listeners for booklist
document.getElementById("booklist").addEventListener("click", function (e) {
  if (e.target.dataset.edit) {
    // display update modal
    // grab the doc reference
    const docRef = doc(db, 'books', e.target.dataset.edit)
    // updateDoc(docRef, {
    //   title: "updated title",
    // }).then(() => {
    //   updateForm.reset();
    // });
  } else if (e.target.dataset.delete) {
    handleDelete();
  }
});

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

// real time collection data
const unsubCol = onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  // display docs to page
  const bookList = document.getElementById("booklist");
  let booksHtml = "";
  books.forEach((book) => {
    booksHtml += `
    <ul class="books-in-order">
      <li class="book-pair">
        <p class='author'>${book.author}<p>
        <p class="title">${book.title}</p>
        <div class="bookBtns">
          <button class="booklistBtn" data-edit="${book.id}" id="edit${book.id}"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="booklistBtn" data-delete="${book.id}" id="edit${book.id}"><i class="fa-solid fa-minus"></i></button>
        </div>
      </li>
    </ul>
    `;
  });
  bookList.innerHTML = booksHtml;
});

// real time collection of queries
const unsubDoc = onSnapshot(q, (snapshot) => {
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
      // console.log("user created: ", cred.user);
      SignUpForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// logging in & out
const LogoutButton = document.querySelector(".logout");
LogoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // console.log("signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const LoginForm = document.querySelector(".login");
LoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = LoginForm.email.value;
  const pswrd = LoginForm.password.value;
  signInWithEmailAndPassword(auth, email, pswrd)
    .then((cred) => {
      // console.log("user logged in: ", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log("user status changed: ", user);
});

// unsubscribing from db & auth changes
const UnsubBtn = document.querySelector(".unsub");
UnsubBtn.addEventListener("click", () => {
  console.log("unsubscribing");
  unsubCol();
  unsubDoc();
  unsubAuth();
});
