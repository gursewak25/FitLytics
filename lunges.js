let lungeReps = 0;
let lungeTimer = 10; // Countdown starts at 10 seconds
let lungeInterval;

document.getElementById("lunge-decrement").addEventListener("click", () => {
    if (lungeReps > 0) lungeReps--;
    document.getElementById("lunge-reps").textContent = lungeReps;
});

document.getElementById("lunge-increment").addEventListener("click", () => {
    lungeReps++;
    document.getElementById("lunge-reps").textContent = lungeReps;
});

document.getElementById("lunge-start").addEventListener("click", () => {
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

document.getElementById("lunge-stop").addEventListener("click", () => {
    clearInterval(lungeInterval);
    const accuracy = (lungeReps / 10) * 100; // Calculate accuracy
    document.getElementById("lunge-accuracy-fill").style.width = `${accuracy}%`;
    document.getElementById("lunge-status").textContent = `Stopped - Accuracy: ${accuracy.toFixed(2)}%`;
});
