
const cards = document.querySelectorAll('.memory-card');
let flippedCards = [];
let matchedCards = [];
let moves = 0;

// Shuffle cards
const shuffle = () => {
    cards.forEach(card => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        card.style.order = randomIndex;
    });
};

shuffle();

cards.forEach(card => {
    card.addEventListener('click', function() {
        if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
            card.classList.add('flipped');
            const img = card.querySelector('img');
            img.style.opacity = 1;  // Show the image when flipped
            flippedCards.push(card);
            if (flippedCards.length === 2) {
                moves++;
                if (flippedCards[0].dataset.id === flippedCards[1].dataset.id) {
                    matchedCards.push(flippedCards[0], flippedCards[1]);
                    flippedCards = [];
                    if (matchedCards.length === cards.length) {
                        document.getElementById('message').textContent = `Congratulations! You won in ${moves} moves.`;
                    }
                } else {
                    setTimeout(() => {
                        flippedCards[0].querySelector('img').style.opacity = 0;
                        flippedCards[1].querySelector('img').style.opacity = 0;
                        flippedCards[0].classList.remove('flipped');
                        flippedCards[1].classList.remove('flipped');
                        flippedCards = [];
                    }, 1000);
                }
            }
        }
    });
});
