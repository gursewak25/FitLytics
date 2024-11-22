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



// squats


// Function to toggle dropdown visibility for Squats
function toggleDropdownSquats() {
    const exerciseDetailsSquats = document.getElementById('exercise-details-squats');
    const arrowSquats = document.getElementById('dropdown-arrow-squats');

    // Toggle visibility of exercise details and change arrow direction
    if (exerciseDetailsSquats.style.display === 'none' || exerciseDetailsSquats.style.display === '') {
        exerciseDetailsSquats.style.display = 'block';
        arrowSquats.innerHTML = '&#9650;'; // Change to up arrow
    } else {
        exerciseDetailsSquats.style.display = 'none';
        arrowSquats.innerHTML = '&#9660;'; // Change to down arrow
    }
}

// Event listener for the Squats exercise card
document.getElementById('exercise-header-squats').addEventListener('click', function() {
    toggleDropdownSquats();
});

// Function to update the count for sets in Squats
function updateSetCountSquats(increment) {
    const setCountElemSquats = document.getElementById('set-count-squats');
    let count = parseInt(setCountElemSquats.innerText);
    if (increment) {
        setCountElemSquats.innerText = count + 1;
    } else if (count > 1) {
        setCountElemSquats.innerText = count - 1;
    }
}

// Function to update the count for reps in Squats
function updateRepCountSquats(increment) {
    const repCountElemSquats = document.getElementById('rep-count-squats');
    let count = parseInt(repCountElemSquats.innerText);
    if (increment) {
        repCountElemSquats.innerText = count + 1;
    } else if (count > 1) {
        repCountElemSquats.innerText = count - 1;
    }
}

// Event listeners for increment and decrement buttons for sets and reps for Squats
document.getElementById('set-increment-squats').addEventListener('click', function() {
    updateSetCountSquats(true);
});

document.getElementById('set-decrement-squats').addEventListener('click', function() {
    updateSetCountSquats(false);
});

document.getElementById('rep-increment-squats').addEventListener('click', function() {
    updateRepCountSquats(true);
});

document.getElementById('rep-decrement-squats').addEventListener('click', function() {
    updateRepCountSquats(false);
});

// Start workout function for Squats
function startWorkoutSquats() {
    const timerDisplaySquats = document.getElementById('timer-display-squats');
    let countdownSquats = 10; // Timer starts at 10 seconds

    // Update the display immediately
    timerDisplaySquats.textContent = `Timer: ${countdownSquats}s`;

    // Start the countdown
    const intervalIdSquats = setInterval(() => {
        countdownSquats--;
        timerDisplaySquats.textContent = `Timer: ${countdownSquats}s`;

        if (countdownSquats <= 0) {
            clearInterval(intervalIdSquats);
            timerDisplaySquats.textContent = "Performing...";
        }
    }, 1000);

    return intervalIdSquats;
}

// Stop workout function for Squats
function stopWorkoutSquats(intervalIdSquats) {
    const timerDisplaySquats = document.getElementById('timer-display-squats');
    timerDisplaySquats.textContent = "Timer Stopped";
    clearInterval(intervalIdSquats);
}

// Event listeners for start and stop buttons for Squats
document.getElementById('start-btn-squats').addEventListener('click', function() {
    const intervalIdSquats = startWorkoutSquats();

    // Store the interval ID in case the workout needs to be stopped
    document.getElementById('start-btn-squats').setAttribute('data-interval-id', intervalIdSquats);
});

document.getElementById('stop-btn-squats').addEventListener('click', function() {
    const intervalIdSquats = document.getElementById('start-btn-squats').getAttribute('data-interval-id');
    stopWorkoutSquats(intervalIdSquats);
});




// bicep curls


// Function to toggle dropdown visibility for Bicep Curls
function toggleDropdownBicepCurls() {
    const exerciseDetailsBicepCurls = document.getElementById('exercise-details-bicep-curls');
    const arrowBicepCurls = document.getElementById('dropdown-arrow-bicep-curls');

    // Toggle visibility of exercise details and change arrow direction
    if (exerciseDetailsBicepCurls.style.display === 'none' || exerciseDetailsBicepCurls.style.display === '') {
        exerciseDetailsBicepCurls.style.display = 'block';
        arrowBicepCurls.innerHTML = '&#9650;'; // Change to up arrow
    } else {
        exerciseDetailsBicepCurls.style.display = 'none';
        arrowBicepCurls.innerHTML = '&#9660;'; // Change to down arrow
    }
}

// Event listener for the Bicep Curls exercise card
document.getElementById('exercise-header-bicep-curls').addEventListener('click', function() {
    toggleDropdownBicepCurls();
});

// Function to update the count for sets in Bicep Curls
function updateSetCountBicepCurls(increment) {
    const setCountElemBicepCurls = document.getElementById('set-count-bicep-curls');
    let count = parseInt(setCountElemBicepCurls.innerText);
    if (increment) {
        setCountElemBicepCurls.innerText = count + 1;
    } else if (count > 1) {
        setCountElemBicepCurls.innerText = count - 1;
    }
}

// Function to update the count for reps in Bicep Curls
function updateRepCountBicepCurls(increment) {
    const repCountElemBicepCurls = document.getElementById('rep-count-bicep-curls');
    let count = parseInt(repCountElemBicepCurls.innerText);
    if (increment) {
        repCountElemBicepCurls.innerText = count + 1;
    } else if (count > 1) {
        repCountElemBicepCurls.innerText = count - 1;
    }
}

// Event listeners for increment and decrement buttons for sets and reps for Bicep Curls
document.getElementById('set-increment-bicep-curls').addEventListener('click', function() {
    updateSetCountBicepCurls(true);
});

document.getElementById('set-decrement-bicep-curls').addEventListener('click', function() {
    updateSetCountBicepCurls(false);
});

document.getElementById('rep-increment-bicep-curls').addEventListener('click', function() {
    updateRepCountBicepCurls(true);
});

document.getElementById('rep-decrement-bicep-curls').addEventListener('click', function() {
    updateRepCountBicepCurls(false);
});

// Start workout function for Bicep Curls
function startWorkoutBicepCurls() {
    const timerDisplayBicepCurls = document.getElementById('timer-display-bicep-curls');
    let countdownBicepCurls = 10; // Timer starts at 10 seconds

    // Update the display immediately
    timerDisplayBicepCurls.textContent = `Timer: ${countdownBicepCurls}s`;

    // Start the countdown
    const intervalIdBicepCurls = setInterval(() => {
        countdownBicepCurls--;
        timerDisplayBicepCurls.textContent = `Timer: ${countdownBicepCurls}s`;

        if (countdownBicepCurls <= 0) {
            clearInterval(intervalIdBicepCurls);
            timerDisplayBicepCurls.textContent = "Performing...";
        }
    }, 1000);

    return intervalIdBicepCurls;
}

// Stop workout function for Bicep Curls
function stopWorkoutBicepCurls(intervalIdBicepCurls) {
    const timerDisplayBicepCurls = document.getElementById('timer-display-bicep-curls');
    timerDisplayBicepCurls.textContent = "Timer Stopped";
    clearInterval(intervalIdBicepCurls);
}

// Event listeners for start and stop buttons for Bicep Curls
document.getElementById('start-btn-bicep-curls').addEventListener('click', function() {
    const intervalIdBicepCurls = startWorkoutBicepCurls();

    // Store the interval ID in case the workout needs to be stopped
    document.getElementById('start-btn-bicep-curls').setAttribute('data-interval-id', intervalIdBicepCurls);
});

document.getElementById('stop-btn-bicep-curls').addEventListener('click', function() {
    const intervalIdBicepCurls = document.getElementById('start-btn-bicep-curls').getAttribute('data-interval-id');
    stopWorkoutBicepCurls(intervalIdBicepCurls);
});


// lunges

// Function to toggle dropdown visibility for Lunges
function toggleDropdownLunges() {
    const exerciseDetailsLunges = document.getElementById('exercise-details-lunges');
    const arrowLunges = document.getElementById('dropdown-arrow-lunges');

    // Toggle visibility of exercise details and change arrow direction
    if (exerciseDetailsLunges.style.display === 'none' || exerciseDetailsLunges.style.display === '') {
        exerciseDetailsLunges.style.display = 'block';
        arrowLunges.innerHTML = '&#9650;'; // Change to up arrow
    } else {
        exerciseDetailsLunges.style.display = 'none';
        arrowLunges.innerHTML = '&#9660;'; // Change to down arrow
    }
}

// Event listener for the Lunges exercise card
document.getElementById('exercise-header-lunges').addEventListener('click', function() {
    toggleDropdownLunges();
});

// Function to update the count for sets in Lunges
function updateSetCountLunges(increment) {
    const setCountElemLunges = document.getElementById('set-count-lunges');
    let count = parseInt(setCountElemLunges.innerText);
    if (increment) {
        setCountElemLunges.innerText = count + 1;
    } else if (count > 1) {
        setCountElemLunges.innerText = count - 1;
    }
}

// Function to update the count for reps in Lunges
function updateRepCountLunges(increment) {
    const repCountElemLunges = document.getElementById('rep-count-lunges');
    let count = parseInt(repCountElemLunges.innerText);
    if (increment) {
        repCountElemLunges.innerText = count + 1;
    } else if (count > 1) {
        repCountElemLunges.innerText = count - 1;
    }
}

// Event listeners for increment and decrement buttons for sets and reps for Lunges
document.getElementById('set-increment-lunges').addEventListener('click', function() {
    updateSetCountLunges(true);
});

document.getElementById('set-decrement-lunges').addEventListener('click', function() {
    updateSetCountLunges(false);
});

document.getElementById('rep-increment-lunges').addEventListener('click', function() {
    updateRepCountLunges(true);
});

document.getElementById('rep-decrement-lunges').addEventListener('click', function() {
    updateRepCountLunges(false);
});

// Start workout function for Lunges
function startWorkoutLunges() {
    const timerDisplayLunges = document.getElementById('timer-display-lunges');
    let countdownLunges = 10; // Timer starts at 10 seconds

    // Update the display immediately
    timerDisplayLunges.textContent = `Timer: ${countdownLunges}s`;

    // Start the countdown
    const intervalIdLunges = setInterval(() => {
        countdownLunges--;
        timerDisplayLunges.textContent = `Timer: ${countdownLunges}s`;

        if (countdownLunges <= 0) {
            clearInterval(intervalIdLunges);
            timerDisplayLunges.textContent = "Performing...";
        }
    }, 1000);

    return intervalIdLunges;
}

// Stop workout function for Lunges
function stopWorkoutLunges(intervalIdLunges) {
    const timerDisplayLunges = document.getElementById('timer-display-lunges');
    timerDisplayLunges.textContent = "Timer Stopped";
    clearInterval(intervalIdLunges);
}

// Event listeners for start and stop buttons for Lunges
document.getElementById('start-btn-lunges').addEventListener('click', function() {
    const intervalIdLunges = startWorkoutLunges();

    // Store the interval ID in case the workout needs to be stopped
    document.getElementById('start-btn-lunges').setAttribute('data-interval-id', intervalIdLunges);
});

document.getElementById('stop-btn-lunges').addEventListener('click', function() {
    const intervalIdLunges = document.getElementById('start-btn-lunges').getAttribute('data-interval-id');
    stopWorkoutLunges(intervalIdLunges);
});


// JumpingJacks

// Function to toggle dropdown visibility for Jumping Jacks
function toggleDropdownJumpingJacks() {
    const exerciseDetailsJumpingJacks = document.getElementById('exercise-details-jumping-jacks');
    const arrowJumpingJacks = document.getElementById('dropdown-arrow-jumping-jacks');

    // Toggle visibility of exercise details and change arrow direction
    if (exerciseDetailsJumpingJacks.style.display === 'none' || exerciseDetailsJumpingJacks.style.display === '') {
        exerciseDetailsJumpingJacks.style.display = 'block';
        arrowJumpingJacks.innerHTML = '&#9650;'; // Change to up arrow
    } else {
        exerciseDetailsJumpingJacks.style.display = 'none';
        arrowJumpingJacks.innerHTML = '&#9660;'; // Change to down arrow
    }
}

// Event listener for the Jumping Jacks exercise card
document.getElementById('exercise-header-jumping-jacks').addEventListener('click', function() {
    toggleDropdownJumpingJacks();
});

// Function to update the count for sets in Jumping Jacks
function updateSetCountJumpingJacks(increment) {
    const setCountElemJumpingJacks = document.getElementById('set-count-jumping-jacks');
    let count = parseInt(setCountElemJumpingJacks.innerText);
    if (increment) {
        setCountElemJumpingJacks.innerText = count + 1;
    } else if (count > 1) {
        setCountElemJumpingJacks.innerText = count - 1;
    }
}

// Function to update the count for reps in Jumping Jacks
function updateRepCountJumpingJacks(increment) {
    const repCountElemJumpingJacks = document.getElementById('rep-count-jumping-jacks');
    let count = parseInt(repCountElemJumpingJacks.innerText);
    if (increment) {
        repCountElemJumpingJacks.innerText = count + 1;
    } else if (count > 1) {
        repCountElemJumpingJacks.innerText = count - 1;
    }
}

// Event listeners for increment and decrement buttons for sets and reps for Jumping Jacks
document.getElementById('set-increment-jumping-jacks').addEventListener('click', function() {
    updateSetCountJumpingJacks(true);
});

document.getElementById('set-decrement-jumping-jacks').addEventListener('click', function() {
    updateSetCountJumpingJacks(false);
});

document.getElementById('rep-increment-jumping-jacks').addEventListener('click', function() {
    updateRepCountJumpingJacks(true);
});

document.getElementById('rep-decrement-jumping-jacks').addEventListener('click', function() {
    updateRepCountJumpingJacks(false);
});

// Start workout function for Jumping Jacks
function startWorkoutJumpingJacks() {
    const timerDisplayJumpingJacks = document.getElementById('timer-display-jumping-jacks');
    let countdownJumpingJacks = 10; // Timer starts at 10 seconds

    // Update the display immediately
    timerDisplayJumpingJacks.textContent = `Timer: ${countdownJumpingJacks}s`;

    // Start the countdown
    const intervalIdJumpingJacks = setInterval(() => {
        countdownJumpingJacks--;
        timerDisplayJumpingJacks.textContent = `Timer: ${countdownJumpingJacks}s`;

        if (countdownJumpingJacks <= 0) {
            clearInterval(intervalIdJumpingJacks);
            timerDisplayJumpingJacks.textContent = "Performing...";
        }
    }, 1000);

    return intervalIdJumpingJacks;
}

// Stop workout function for Jumping Jacks
function stopWorkoutJumpingJacks(intervalIdJumpingJacks) {
    const timerDisplayJumpingJacks = document.getElementById('timer-display-jumping-jacks');
    timerDisplayJumpingJacks.textContent = "Timer Stopped";
    clearInterval(intervalIdJumpingJacks);
}

// Event listeners for start and stop buttons for Jumping Jacks
document.getElementById('start-btn-jumping-jacks').addEventListener('click', function() {
    const intervalIdJumpingJacks = startWorkoutJumpingJacks();

    // Store the interval ID in case the workout needs to be stopped
    document.getElementById('start-btn-jumping-jacks').setAttribute('data-interval-id', intervalIdJumpingJacks);
});

document.getElementById('stop-btn-jumping-jacks').addEventListener('click', function() {
    const intervalIdJumpingJacks = document.getElementById('start-btn-jumping-jacks').getAttribute('data-interval-id');
    stopWorkoutJumpingJacks(intervalIdJumpingJacks);
});




// bluetooth

// Bluetooth Card and Modal Logic
document.getElementById('bluetooth-icon-btn').addEventListener('click', () => {
    document.getElementById('bluetooth-modal').style.display = 'flex';
});

document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('bluetooth-modal').style.display = 'none';
});

// Scan for Bluetooth Devices
document.getElementById('scan-btn').addEventListener('click', async () => {
    const statusElem = document.getElementById('bluetooth-status');
    const deviceList = document.getElementById('device-list');

    try {
        statusElem.innerText = 'Scanning for devices...';
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        });

        statusElem.innerText = `Connected to: ${device.name}`;
        const listItem = document.createElement('li');
        listItem.innerText = device.name || 'Unnamed Device';
        deviceList.appendChild(listItem);

        // Optionally connect to GATT server
        const server = await device.gatt.connect();
        console.log('Connected to GATT Server:', server);
    } catch (error) {
        console.error('Bluetooth Scan Error:', error);
        statusElem.innerText = 'Failed to scan for devices. Ensure Bluetooth is enabled.';
    }
});
