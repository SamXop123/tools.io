document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitGuess");
    const guessInput = document.getElementById("guessInput");
    const feedback = document.getElementById("feedback");

    submitButton.addEventListener("click", () => {
        const guess = parseInt(guessInput.value);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            feedback.textContent = "Please enter a number between 1 and 100.";
            feedback.style.color = "red";
            return;
        }

        // Send the guess to the Flask server using a POST request
        fetch('/guess.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guess: guess }),
        })
        .then(response => response.json())
        .then(data => {
            // Display feedback based on server response
            if (data.result === 'low') {
                feedback.textContent = "Too low! Try again.";
                feedback.style.color = "yellow";
            } else if (data.result === 'high') {
                feedback.textContent = "Too high! Try again.";
                feedback.style.color = "orange";
            } else if (data.result === 'correct') {
                feedback.textContent = `Congratulations! You guessed the number!`;
                feedback.style.color = "lime";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            feedback.textContent = "Something went wrong. Please try again.";
            feedback.style.color = "red";
        });
    });
});
