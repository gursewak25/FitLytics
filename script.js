document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const switchElement = document.getElementById("switch");

    if (localStorage.getItem("dark-mode") === "true") {
        document.body.classList.add("dark-mode");
        switchElement.checked = true;
    }

    switchElement.addEventListener("change", function () {
        if (switchElement.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "true");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "false");
        }
    });

    // Hamburger Menu Toggle
    const checkbox = document.getElementById("unique-checkbox");
    const menu = document.querySelector(".unique-menu");

    checkbox.addEventListener("change", function () {
        menu.style.display = checkbox.checked ? "flex" : "none";
    });

    document.querySelectorAll(".unique-menu ul li a").forEach(link => {
        link.addEventListener("click", () => {
            checkbox.checked = false;
            menu.style.display = "none";
        });
    });

    document.getElementById('startWorkoutBtn').addEventListener('click', function() {
        window.location.href = 'workouts.html';
    });
    
});


document.addEventListener("DOMContentLoaded", () => {
    const p2Element = document.querySelector("#p2");
  
    // Get the stored name from localStorage
    const fullName = localStorage.getItem("userName");
  
    if (fullName) {
      // Extract the first name and capitalize the first letter
      const firstName = fullName.split(" ")[0];
      const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  
      // Set the content of the p2 element
      p2Element.textContent = capitalizedFirstName;
    } else {
      // Default text if no name is found
      p2Element.textContent = "Warrior";
    }
  });

document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    const openRegisterLink = document.getElementById("open-register-modal");
    const openLoginLink = document.getElementById("open-login-modal");
    const closeRegisterModal = document.getElementById("close-register-modal");

    // Show the Login Modal by default
    loginModal.style.display = "flex";

    // Open Register Modal when "Sign up here" is clicked
    openRegisterLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "none";
        registerModal.style.display = "flex";
    });

    // Open Login Modal when "Login here" is clicked
    openLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        registerModal.style.display = "none";
        loginModal.style.display = "flex";
    });

    // Close Register Modal
    closeRegisterModal.addEventListener("click", () => {
        registerModal.style.display = "none";
    });
});






document.addEventListener("DOMContentLoaded", function () {
    const p3 = document.querySelector("#p3");

    p3.addEventListener("click", function () {
        // Redirect to login.html
        window.location.href = "login.html";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const p4 = document.querySelector("#pp");

    p4.addEventListener("click", function () {
        // Redirect to login.html
        window.location.href = "index.html";
    });
});



  // bluetooth
// Open Bluetooth Modal
document.getElementById('bt').addEventListener('click', () => {
    window.location.href = "bluetooth.html";
});

