const board = document.getElementById("board");
const gameStatus = document.getElementById("game-status");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// To Create the board dynamically
function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.addEventListener("click", handleCellClick);
        board.appendChild(cellElement);
    });
}

// Check for a winner or tie
function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            gameStatus.textContent = `Player ${gameBoard[a]} wins!`;
            gameStatus.classList.add("winner-message"); 
            return true;
        }
    }
    if (!gameBoard.includes("")) {
        gameActive = false;
        gameStatus.textContent = "It's a tie!";
        gameStatus.classList.remove("winner-message"); 
        return true;
    }
    gameStatus.classList.remove("winner-message"); // Ensure no green color during regular turns
    return false;
}

// Handle cell clicks
function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

restartButton.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    gameStatus.textContent = "Player X's turn";
    createBoard();
});

createBoard();
