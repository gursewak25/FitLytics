// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth();

document.addEventListener("DOMContentLoaded", function () {
  let legRaiseReps = 10; // Initial number of reps
  let legRaiseTimer = 10; // Countdown timer starts at 10 seconds
  let legRaiseInterval;
  let accuracy = 0;

  // Event listeners for the buttons
  document.getElementById("leg-raise-decrement").addEventListener("click", () => {
    if (legRaiseReps > 0) legRaiseReps--;
    document.getElementById("leg-raise-reps").textContent = legRaiseReps;
  });

  document.getElementById("leg-raise-increment").addEventListener("click", () => {
    legRaiseReps++;
    document.getElementById("leg-raise-reps").textContent = legRaiseReps;
  });

  document.getElementById("leg-raise-start").addEventListener("click", () => {
    legRaiseTimer = 10;
    document.getElementById("leg-raise-status").textContent = "Starting...";
    document.getElementById("leg-raise-timer-display").textContent = legRaiseTimer;

    legRaiseInterval = setInterval(() => {
      legRaiseTimer--;
      document.getElementById("leg-raise-timer-display").textContent = legRaiseTimer;

      if (legRaiseTimer === 0) {
        clearInterval(legRaiseInterval);
        document.getElementById("leg-raise-status").textContent = "Performing";
      }
    }, 1000);
  });

  document.getElementById("leg-raise-stop").addEventListener("click", async () => {
    clearInterval(legRaiseInterval);
    accuracy = (legRaiseReps / 10) * 100; // Calculate accuracy
    document.getElementById("leg-raise-accuracy-fill").style.width = `${accuracy}%`;
    document.getElementById("leg-raise-status").textContent = `Stopped - Accuracy: ${accuracy.toFixed(2)}%`;

    // Firebase: Get current logged-in user
    const user = auth.currentUser;

    if (user) {
      try {
        // Reference to the "leg_raises" array inside the user's document
        const userDocRef = doc(db, "users", user.uid);

        // Append accuracy and timestamp as objects to the "leg_raises" array
        await updateDoc(userDocRef, {
          leg_raises: arrayUnion({
            accuracy: accuracy.toFixed(2), // Accuracy value
            timestamp: new Date().toISOString(), // ISO string timestamp for sorting later
          }),
        });

        console.log("Exercise data successfully appended to Firestore.");
        alert("Exercise data saved successfully!");
      } catch (error) {
        console.error("Error appending exercise data:", error);
        alert("Failed to save data.");
      }
    } else {
      console.log("No user is logged in.");
      alert("Please log in to save your progress.");
    }
  });
});
