// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, updateDoc,arrayUnion} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
  let bicepReps = 10;
  let bicepTimer = 10; // Countdown starts at 10 seconds
  let bicepInterval;
  let accuracy = 0;

  // Event listeners for the buttons
  document.getElementById("bicep-decrement").addEventListener("click", () => {
    if (bicepReps > 0) bicepReps--;
    document.getElementById("bicep-reps").textContent = bicepReps;
  });

  document.getElementById("bicep-increment").addEventListener("click", () => {
    bicepReps++;
    document.getElementById("bicep-reps").textContent = bicepReps;
  });

  document.getElementById("bicep-start").addEventListener("click", () => {
    bicepTimer = 10;
    document.getElementById("bicep-status").textContent = "Starting...";
    document.getElementById("bicep-timer-display").textContent = bicepTimer;

    bicepInterval = setInterval(() => {
      bicepTimer--;
      document.getElementById("bicep-timer-display").textContent = bicepTimer;

      if (bicepTimer === 0) {
        clearInterval(bicepInterval);
        document.getElementById("bicep-status").textContent = "Performing";
      }
    }, 1000);
  });

  
  document.getElementById("bicep-stop").addEventListener("click", async () => {
    clearInterval(bicepInterval);
    accuracy = (bicepReps / 10) * 100; // Calculate accuracy
    document.getElementById("bicep-accuracy-fill").style.width = `${accuracy}%`;
    document.getElementById("bicep-status").textContent = `Stopped - Accuracy: ${accuracy.toFixed(2)}%`;
  
    // Firebase: Get current logged-in user
    const user = auth.currentUser;
  
    if (user) {
      try {
        // Reference to the "bicep_curls" array inside the user's document
        const userDocRef = doc(db, "users", user.uid);
  
        // Append accuracy and timestamp as objects to the "bicep_curls" array
        await updateDoc(userDocRef, {
          bicep_curls: arrayUnion({
            accuracy: accuracy.toFixed(2),   // Accuracy value
            timestamp: new Date().toISOString() // ISO string timestamp for sorting later
          })
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
