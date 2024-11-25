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
    
    // Modal Logic
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const closeLoginModal = document.getElementById("close-login-modal");
    const closeRegisterModal = document.getElementById("close-register-modal");
    const openLoginModal = document.querySelector(".p3");
    const openRegisterLink = document.getElementById("open-register-modal");
    const openLoginLink = document.getElementById("open-login-modal");
    const p1 = document.querySelector(".p1");
    const p2 = document.querySelector(".p2");
    const p3 = document.querySelector(".p3");

    function updateWelcomeText(name) {
        const firstName = name.split(" ")[0]; // Extract the first name
        p1.textContent = "Welcome Back";
        p2.textContent = firstName.charAt(0).toUpperCase() + firstName.slice(1); // Capitalize first name
        p3.textContent = "Logout";
        p3.removeEventListener("click", openLoginModalClickHandler); // Remove login modal click handler
        p3.addEventListener("click", handleLogout); // Add logout functionality
    }

    // Handle Logout
    function handleLogout() {
        localStorage.removeItem("userName");
        p1.textContent = "Your Fitness Journey";
        p2.textContent = "Starts Here";
        p3.textContent = "Login / Register";
        p3.removeEventListener("click", handleLogout); // Remove logout event
        p3.addEventListener("click", openLoginModalClickHandler); // Reassign login modal click handler
    }

    // Handle Login Modal Opening
    function openLoginModalClickHandler() {
        loginModal.style.display = "flex";
    }

    // Open Login Modal
    p3.addEventListener("click", openLoginModalClickHandler);

    // Close Login Modal
    closeLoginModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    // Open Register Modal
    openRegisterLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "none";
        registerModal.style.display = "flex";
    });

    // Close Register Modal
    closeRegisterModal.addEventListener("click", () => {
        registerModal.style.display = "none";
    });

    // Switch from Register to Login Modal
    openLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        registerModal.style.display = "none";
        loginModal.style.display = "flex";
    });

    // Handle Registration Form
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("register-name").value;
        localStorage.setItem("userName", name);
        updateWelcomeText(name);
        registerModal.style.display = "none"; // Close modal
    });

    // Handle Login Form
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("login-name").value;
        localStorage.setItem("userName", name);
        updateWelcomeText(name);
        loginModal.style.display = "none"; // Close modal
    });

    // Load Stored User Data
    const storedName = localStorage.getItem("userName");
    if (storedName) {
        updateWelcomeText(storedName);
    }
});


  // bluetooth
// Open Bluetooth Modal
document.getElementById('bluetooth-icon-btn').addEventListener('click', () => {
    const bluetoothModal = document.getElementById('bluetooth-modal');
    bluetoothModal.style.display = 'flex';
});

// Close Bluetooth Modal
document.getElementById('bluetooth-close-btn').addEventListener('click', () => {
    const bluetoothModal = document.getElementById('bluetooth-modal');
    bluetoothModal.style.display = 'none';
});

// Scan for Bluetooth Devices
document.getElementById('bluetooth-scan-btn').addEventListener('click', async () => {
    const bluetoothStatus = document.getElementById('bluetooth-status');
    const bluetoothDeviceList = document.getElementById('bluetooth-device-list');

    try {
        bluetoothStatus.innerText = 'Scanning for devices...';
        const bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        });

        bluetoothStatus.innerText = `Connected to: ${bluetoothDevice.name}`;
        const newDeviceItem = document.createElement('li');
        newDeviceItem.innerText = bluetoothDevice.name || 'Unnamed Device';
        bluetoothDeviceList.appendChild(newDeviceItem);

        // Optionally connect to GATT server
        const gattServer = await bluetoothDevice.gatt.connect();
        console.log('Connected to GATT Server:', gattServer);
    } catch (bluetoothError) {
        console.error('Bluetooth Scan Error:', bluetoothError);
        bluetoothStatus.innerText = 'Failed to scan for devices. Ensure Bluetooth is enabled.';
    }
});