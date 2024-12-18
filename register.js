import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbmajMeIAnTivmbVs1HkCl94SRI3mdUXk",
  authDomain: "fitlytics-login.firebaseapp.com",
  projectId: "fitlytics-login",
  storageBucket: "fitlytics-login.appspot.com",
  messagingSenderId: "824502378307",
  appId: "1:824502378307:web:e9ec346b9802bd18fc99f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Register button click event
const submit = document.getElementById("registerbtn");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const name = document.getElementById("register-name").value;

  console.log("Email:", email, "Password:", password);

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("User Created:", user);
      
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {}, { merge: true });

      alert("Account successfully created!");
      localStorage.setItem("userName", name);
      window.location.href = "main.html"
    })
    .catch((error) => {
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      alert("Error: " + error.message);
    });
});
