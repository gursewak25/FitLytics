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

      const sortedBicepCurls = bicepCurls.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const latestFive = sortedBicepCurls.slice(0, 10);

      const accuracyListContainer = document.getElementById("accuracy-list");
      accuracyListContainer.innerHTML = ''; // Clear any previous data

      latestFive.forEach((entry, index) => {
        const accuracyItem = document.createElement("div");
        accuracyItem.classList.add("accuracy-item");
        accuracyItem.textContent = `Accuracy  ${index + 1} : ${entry.accuracy}% (Timestamp: ${entry.timestamp})`;
        accuracyListContainer.appendChild(accuracyItem);
      });

    // Calculate average accuracy
    const totalAccuracy = latestFive.reduce((sum, entry) => sum + parseFloat(entry.accuracy), 0);
    const averageAccuracy = (totalAccuracy / latestFive.length).toFixed(2);

    // Display the average accuracy
    const averageAccuracyElement = document.createElement("div");
    averageAccuracyElement.classList.add("average-accuracy");
    averageAccuracyElement.textContent = `Average Accuracy: ${averageAccuracy}%`;
    accuracyListContainer.appendChild(averageAccuracyElement);

    console.log(`Average Accuracy: ${averageAccuracy}%`);
  } else {
    console.log("No such user document!");
  }
} catch (error) {
  console.error("Error fetching user data:", error);
}
}


