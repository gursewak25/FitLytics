let jjReps = 0;
let jjTimer = 10; // Countdown starts at 10 seconds
let jjInterval;

document.getElementById("jumping-jack-decrement").addEventListener("click", () => {
    if (jjReps > 0) jjReps--;
    document.getElementById("jumping-jack-reps").textContent = jjReps;
});

document.getElementById("jumping-jack-increment").addEventListener("click", () => {
    jjReps++;
    document.getElementById("jumping-jack-reps").textContent = jjReps;
});

document.getElementById("jumping-jack-start").addEventListener("click", () => {
    document.getElementById("jumping-jack-status").textContent = "Starting...";
    document.getElementById("jumping-jack-timer-display").textContent = jjTimer;

    jjInterval = setInterval(() => {
        jjTimer--;
        document.getElementById("jumping-jack-timer-display").textContent = jjTimer;

        if (jjTimer === 0) {
            clearInterval(jjInterval);
            document.getElementById("jumping-jack-status").textContent = "Performing";
        }
    }, 1000);
});

document.getElementById("jumping-jack-stop").addEventListener("click", () => {
    clearInterval(jjInterval);
    const accuracy = (jjReps / 10) * 100; // Calculate accuracy
    document.getElementById("jumping-jack-accuracy-fill").style.width = `${accuracy}%`;
    document.getElementById("jumping-jack-status").textContent = `Stopped - Accuracy: ${accuracy.toFixed(2)}%`;
});
