let squatsReps = 0;
let squatsTimer = 10; // Countdown starts at 10 seconds
let squatsInterval;

document.getElementById("squat-decrement").addEventListener("click", () => {
    if (squatsReps > 0) squatsReps--;
    document.getElementById("squat-reps").textContent = squatsReps;
});

document.getElementById("squat-increment").addEventListener("click", () => {
    squatsReps++;
    document.getElementById("squat-reps").textContent = squatsReps;
});

document.getElementById("squat-start").addEventListener("click", () => {
    squatsTimer=10;
    document.getElementById("squat-status").textContent = "Starting...";
    document.getElementById("squat-timer-display").textContent = squatsTimer;

    squatsInterval = setInterval(() => {
        squatsTimer--;
        document.getElementById("squat-timer-display").textContent = squatsTimer;

        if (squatsTimer === 0) {
            clearInterval(squatsInterval);
            document.getElementById("squat-status").textContent = "Performing";
        }
    }, 1000);
});

document.getElementById("squat-stop").addEventListener("click", () => {
    clearInterval(squatsInterval);
    const accuracy = (squatsReps / 10) * 100; // Calculate accuracy
    document.getElementById("squat-accuracy-fill").style.width = `${accuracy}%`;
    document.getElementById("squat-status").textContent = `Stopped - Accuracy: ${accuracy.toFixed(2)}%`;
});
