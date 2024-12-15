
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Size of the grid box
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};
let direction = null; // Start with no direction
let score = 0;

// Control the snake
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Draw function
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "lightgreen";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Check if direction is null (game hasn't started)
    if (!direction) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Press an arrow key to start!", 50, canvas.height / 2);
        return; // Skip updating the snake
    }

    // Move the snake
    let head = { ...snake[0] };
    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "DOWN") head.y += box;

    // Check for collisions
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(game);
        alert("Game Over! Your score: " + score);
    }

    // Check for food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box,
        };
    } else {
        snake.pop(); // Remove the tail
    }

    snake.unshift(head); // Add new head
}

// Update the game every 100ms
const game = setInterval(draw, 100);
