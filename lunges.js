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
  let lungeReps = 10;
  let lungeTimer = 10; // Countdown starts at 10 seconds
  let lungeInterval;
  let accuracy = 0;

  // Event listeners for the buttons
  document.getElementById("lunge-decrement").addEventListener("click", () => {
    if (lungeReps > 0) lungeReps--;
    document.getElementById("lunge-reps").textContent = lungeReps;
  });

  document.getElementById("lunge-increment").addEventListener("click", () => {
    lungeReps++;
    document.getElementById("lunge-reps").textContent = lungeReps;
  });

  document.getElementById("lunge-start").addEventListener("click", () => {
    lungeTimer = 10;
    document.getElementById("lunge-status").textContent = "Starting...";
    document.getElementById("lunge-timer-display").textContent = lungeTimer;

    lungeInterval = setInterval(() => {
      lungeTimer--;
      document.getElementById("lunge-timer-display").textContent = lungeTimer;

      if (lungeTimer === 0) {
        clearInterval(lungeInterval);
        document.getElementById("lunge-status").textContent = "Performing";
      }
    }, 1000);
  });

  document.getElementById("lunge-stop").addEventListener("click", async () => {
    clearInterval(lungeInterval);
    accuracy = (lungeReps / 10) * 100; // Calculate accuracy
    document.getElementById("lunge-accuracy-fill").style.width = `${accuracy}%`;
    document.getElementById("lunge-status").textContent = `Stopped - Accuracy: ${accuracy.toFixed(2)}%`;

    // Firebase: Get current logged-in user
    const user = auth.currentUser;

    if (user) {
      try {
        // Reference to the "lunges" array inside the user's document
        const userDocRef = doc(db, "users", user.uid);

        // Append accuracy and timestamp as objects to the "lunges" array
        await updateDoc(userDocRef, {
          lunges: arrayUnion({
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
