let bicepReps = 0;
let bicepTimer = 10; // Countdown starts at 10 seconds
let bicepInterval;

document.getElementById("bicep-decrement").addEventListener("click", () => {
    if (bicepReps > 0) bicepReps--;
    document.getElementById("bicep-reps").textContent = bicepReps;
});

document.getElementById("bicep-increment").addEventListener("click", () => {
    bicepReps++;
    document.getElementById("bicep-reps").textContent = bicepReps;
});

document.getElementById("bicep-start").addEventListener("click", () => {
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

document.getElementById("bicep-stop").addEventListener("click", () => {
    clearInterval(bicepInterval);
    const accuracy = (bicepReps / 10) * 100; // Calculate accuracy
    document.getElementById("bicep-accuracy-fill").style.width = `${accuracy}%`;
    document.getElementById("bicep-status").textContent = `Stopped - Accuracy: ${accuracy.toFixed(2)}%`;
});
