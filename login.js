import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Register button click event
const submit = document.getElementById("loginbtn");
submit.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const name = document.getElementById("login-name").value;

  console.log("Email:", email, "Password:", password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User Logged In:", user);
      localStorage.setItem("userName", name);
      window.location.href = "main.html";
    })
    .catch((error) => {
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);

      // Explicitly show error messages to the user
      if (error.code === "auth/user-not-found") {
        alert("No account found with this email. Please check or register.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format. Please check and try again.");
      } else {
        alert("Login failed: " + error.message);
      }
    });
});
