import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in:", user);
    await fetchLastThreeBicepCurls(user); // Fetch bicep curls if the user is logged in
    displayUserInfo(user); // Display user's name and ID
  } else {
    console.log("No user logged in");
    document.getElementById("accuracy-list").innerHTML = "Please log in to view your bicep curls.";
    document.getElementById("user-info").innerHTML = ""; // Clear user info if no user is logged in
  }
});

// Fetch the last 3 bicep curls for a user
async function fetchLastThreeBicepCurls(user) {
  const userDocRef = doc(db, "users", user.uid);
  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const bicepCurls = userData.bicep_curls || [];

      if (bicepCurls.length === 0) {
        console.log("No bicep curls data found.");
        document.getElementById("accuracy-list").innerHTML = "No bicep curls data found.";
        return;
      }

      // Sort the bicep curls by timestamp in descending order
      const sortedBicepCurls = bicepCurls.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Take the latest 3 entries
      const latestThree = sortedBicepCurls.slice(0, 3);

      // Display the latest 3 accuracies in HTML
      const accuracyListContainer = document.getElementById("accuracy-list");
      accuracyListContainer.innerHTML = '';  // Clear any previous data

      latestThree.forEach((entry, index) => {
        const accuracyItem = document.createElement("div");
        accuracyItem.classList.add("accuracy-item");
        accuracyItem.textContent = `Accuracy ${index + 1}: ${entry.accuracy}% (Timestamp: ${entry.timestamp})`;
        accuracyListContainer.appendChild(accuracyItem);
      });

      // Also log to the console
      latestThree.forEach(entry => {
        console.log(`Accuracy: ${entry.accuracy}% | Timestamp: ${entry.timestamp}`);
      });
    } else {
      console.log("No such user document!");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Function to display user info (name and ID)
function displayUserInfo(user) {
  const userInfoContainer = document.getElementById("user-info");
  const fullName = localStorage.getItem("userName");
  if (fullName) {
    // Extract the first name and capitalize the first letter
    const firstName = fullName.split(" ")[0];
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const userName = capitalizedFirstName || "No name set"; // If the user doesn't have a display name, show "No name set"
  const userId = user.uid;

  // Set the user's name and ID in the HTML
  userInfoContainer.innerHTML = `<h3>User Info</h3><p>Name: ${userName}</p><p>ID: ${userId}</p>`;
  }
}
