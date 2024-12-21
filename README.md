# Tools.io
#### `Video Demo:`  [To be updated soon]
#### `Creator:` Sameer Prajapati
#### `Github:` SamXop123
#### `Link:` <a href="https://tools-io.vercel.app" target="_blank"> tools.io </a>

## Description:

Welcome to **Tools.io**, your ultimate destination for innovative tools and entertaining games. This project combines functionality, creativity, and fun, offering a versatile platform for various needs.

## Features

### Tools
_(Highlights)_
- **Random Number Generator**: Generate secure and customizable random numbers effortlessly.
- **Background Remover**: Convert Markdown syntax into a live preview for efficient documentation.
- **QR Code Generator**: Create QR codes for URLs, text, or contact details instantly.

### Games
_(Highlights)_
- **Memory Game**: Test and enhance your memory with this engaging and interactive game.
- **Snake Game**: Bring back your old memories of playing the OG snake game!
- And, many more additional games to keep you entertained and relaxed.

## Tech Stack

This project is built using:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)


## File Structure

```
/tools.io
├── static/
│   ├── css/         # Stylesheets
│   ├── js/          # JavaScript files
│   └── media/      # Images used in the app
├── templates/       # HTML templates
├── app.py           # Main Flask application
├── requirements.txt # Python dependencies
└── README.md        # Project documentation
```

## Screenshots

### Home Page
![Home Page](https://raw.githubusercontent.com/SamXop123/SamXop123/refs/heads/main/Resources/home-page.png)

### Tools Page
![Tools Page](https://raw.githubusercontent.com/SamXop123/SamXop123/refs/heads/main/Resources/tools-page.png)

### Games Page
![Games Page](https://raw.githubusercontent.com/SamXop123/SamXop123/refs/heads/main/Resources/games-page.png)

### Login Page
![Login Page](https://raw.githubusercontent.com/SamXop123/SamXop123/refs/heads/main/Resources/login-page.png)


<hr>
<br>

## Detailed Explaination:

### `app.py`

The `app.py` file is the main Python script for this Flask-based web application. It serves as the backbone of the project, orchestrating the various functionalities and routes that make up the toolset. Below is an overview of its structure and purpose.

#### Overview
`app.py` leverages the Flask framework to provide a web-based interface for multiple tools and games. It integrates libraries like:
- **Flask** for web routing and rendering templates.
- **Werkzeug Security** for password hashing and validation.
- **gTTS** for generating text-to-speech audio.
- **Pillow** and **rembg** for image processing.
- **qrcode** for QR code generation.
- **Random** and **String** for generating random data.
- **Requests** for fetching data from external APIs.

The file includes a variety of routes corresponding to different functionalities, each explained below.

#### Key Routes and Functionalities

1. **Home (`/`)**
   - Displays the main landing page (`index.html`).
   - Acts as a navigation hub for all the tools and games.

2. **Tools Page (`/tools.html`)**
   - Provides a centralized page for accessing all the utilities offered by the application.

3. **Background Removal (`/bg_remove.html`)**
   - Accepts an image file via a POST request.
   - Uses the `rembg` library to remove the image's background.
   - Returns the processed image for download as a PNG file.

4. **IP Finder (`/ip_finder.html`)**
   - Displays the user’s IP address or fetches details for a custom IP using the `ipinfo.io` API.
   - Presents the data in a user-friendly format, including city, region, and organization information.

5. **Random Number Generator (`/random_number.html`)**
   - Accepts the number of digits from the user and generates a random number of the specified length.
   - Validates input to ensure meaningful output.

6. **Image Compression (`/compress.html`)**
   - Compresses uploaded images, reducing file size while preserving quality.
   - Allows the user to download the compressed image.

7. **Password Generator (`/password_generator.html`)**
   - Generates a secure password based on user specifications such as length and inclusion of symbols.

8. **Text-to-Speech (`/text_to_speech.html`)**
   - Converts user-provided text into speech using the `gTTS` library.
   - Provides a downloadable audio file in MP3 format.

9. **QR Code Generator (`/qr_generator.html`)**
   - Generates a QR code from user-provided data.
   - Returns the QR code as an image file for download.

10. **Word Counter (`/word_counter.html`)**
    - Analyzes user-provided text.
    - Outputs word count, character count (with and without spaces).

11. **Games:**
    - **Guessing Game (`/guess.html`)**:
      - Implements a number guessing game with session-based state management.
      - Provides feedback to the user (“high”, “low”, or “correct”).
    - **Snake-Water-Gun (`/snake_water_gun.html`)**:
      - Classic hand game with random choices for the computer.
      - Determines the winner based on game logic.
    - **Tic-Tac-Toe (`/tictactoe.html`)**:
      - Renders a basic Tic-Tac-Toe game page.
    - **Memory Match (`/match.html`)** and **Snake Game (`/snake.html`)**:
      - Provides links to respective games hosted on separate HTML pages.

12. **Authentication**
    - **Login (`/login.html`)**:
      - Allows users to log in using a username and password.
      - Hashes passwords securely with `Werkzeug`.
    - **Signup (`/signup.html`)**:
      - Enables new user registration.
      - Prevents duplicate usernames and securely stores hashed passwords.

13. **Contact Page (`/contact.html`)**
    - Simple form for user feedback or inquiries.

#### Design Choices
1. **Session Management**:
   - Used for maintaining state in games like the guessing game.
2. **API Integration**:
   - Chose the `ipinfo.io` API for its simplicity and rich data set for IP location services.
3. **Dynamic Features**:
   - Incorporated tools like QR generation and background removal to demonstrate versatility.
4. **Security**:
   - Utilized `generate_password_hash` and `check_password_hash` to secure user credentials.

#### Summary
`app.py` is the cornerstone of the project, bringing together various libraries and frameworks to offer a diverse range of tools and entertainment options. Its modular design ensures that each functionality operates independently, yet cohesively as part of the broader application.

<hr>

### `layout.html`

This file defines the base layout for the "tools.io" web application, built using Flask, HTML, CSS, and JavaScript. It serves as the foundational structure for all pages on the website, ensuring a consistent look and feel across the site.

### Overview

The `layout.html` template is used by Flask to render the overall structure of the site. It includes navigation, dynamic content blocks, and links to various CSS and JavaScript files for styling and interactivity. This layout template is inherited by other pages in the Flask project using jinja syntax. For example, pages like `tools.html`, `games.html`, and `contact.html` extend this layout and inject their unique content into the `{% block content %}`.

## Key Features

- **Navigation Bar**: 
  - Includes links to the home page, tools, games, and contact pages.
  - Displays different buttons based on the user's session (Log in, Log out, Sign up).
  
- **Dynamic Content Blocks**:
  - Usage of jinja syntax allows custom body content to be added to different pages for specific styling.

- **Responsive Design**:
  
- **External Stylesheets**:
  
- **Links JavaScript Files**:


<hr>

### `index.html`

This file defines the layout and content of the home page for the "tools.io" web application, built using Flask, HTML, CSS, and JavaScript. The home page serves as an introduction to the website, providing users with a welcoming experience, a brief overview of the platform, and direct links to explore its tools and games.


### Key Features

- **Main Title**:
  - Displays the website title, "tools.io", with a brief tagline: *"Unleash Your Creativity: Explore a World of Games and Tools to Ignite Your Imagination!"*
  
- **Call-to-Action (CTA) Buttons**:
  - Links to "Explore Tools" and "Play Games" to direct users to the respective pages.

- **About Us Section**:
  - A brief description of Tools.io's mission and offerings: tools for productivity, creativity, and entertainment.

- **User Testimonials**:
  - Positive feedback from users, showcasing the site’s utility and user satisfaction.

- **Latest Updates Section**:
  - Features announcements about new games and tools available on the platform, including links to try them out.

- **Footer**:
  - Contains three sections: *About Us*, *Quick Links* to the main pages, and *Follow Us* with social media links.

<hr>

### `tools.html`

This file defines the layout and content of the tools page for the "tools.io" web application, built using Flask, HTML, CSS, and JavaScript. The tools page provides a categorized display of various tools available on the platform for users to explore and use.

### Key Features

- **Title**:
  - The page displays the title "Explore Our Tools!" to introduce the tools section of the website.

- **Tools Cards**:
  - Each tool is displayed in its own card with:
    - A title (e.g., *Background Remover*, *IP Finder*, *Random Number Generator*).
    - An associated image representing the tool.
    - A link that navigates to the specific tool's page.
  
  The current tools displayed are:
  - **Background Remover**: A tool to remove backgrounds from images.
  - **IP Finder**: A tool to find the IP address of the user or other information.
  - **Random Number Generator**: A tool for generating random numbers.
  - **Image Compressor**: A tool to compress images to save space.
  - **Password Generator**: A tool to generate secure passwords.
  - **Text-to-Speech**: A tool that converts text to speech.
  - **Word Counter**: A tool to count the number of words in a text.
  - **QR Generator**: A tool to generate QR codes for any text or URL.

<hr>

### `games.html`

This file defines the layout and content of the games page for the "tools.io" web application, built using Flask, HTML, CSS, and JavaScript. The games page showcases a collection of interactive games available for users to play and enjoy.

### Key Features

- **Title**:
  - The page displays the title "Explore Our Available Games!" to introduce the games section of the website.

- **Games Cards**:
  - Each game is displayed in its own card with:
    - A title (e.g., *Number Guess*, *Snake Water Gun*, *Tic Tac Toe*).
    - An associated image representing the game.
    - A link that navigates to the specific game's page.
  
  The current games displayed are:
  - **Number Guess**: A guessing game where users try to guess a number.
  - **Snake Water Gun**: A simple game based on the classic "rock, paper, scissors" with a twist.
  - **Tic Tac Toe**: The classic two-player grid game.
  - **Snake Game**: The classic snake game where players control a snake to eat food and grow longer.
  - **Memory Match**: A memory matching game where users flip cards to find pairs.

<br>
<br>

# Styling

The overall theme of the web application is based on shades of purple, giving it a rich and dark aesthetic, with contrasting highlights to create a sleek, modern look. The primary background of the website is set to an elegant dark purple with a soft, semi-transparent texture, adding depth and vibrancy.


#### General Body Styling
The body background features a beautiful background image, with an overlay of dark purple shades. On specific pages like the Games and Tools pages, the background image is removed to focus more on content, while maintaining the consistent dark purple hue.

#### Navbar Styling
The navigation bar (navbar) is designed with a gradient of purples to match the overall theme, blending dark shades of purple for a refined, luxurious feel. The buttons in the navbar have a smooth transition and subtle hover effects, creating an interactive experience for the user. 

#### Button Styling
Buttons across the website are clean, with a simple transparent background and white borders, making them stand out against the dark background. On hover, the buttons get a subtle glow effect and slightly enlarge, creating a sense of interactivity.

#### Typography
The font choices include both playful and professional options. For example, the "Most Heroes" and "Atma" fonts are used to give the website an adventurous and dynamic feel. 

#### Cards
The card design is especially unique, incorporating a blurred background effect using an image. The hover effect reduces the blur to bring attention to the content, giving the cards a dynamic feel.

#### Visual Effects and Transitions
The website includes various smooth transitions for elements like buttons, logos, and cards. These transitions include hover effects for buttons and glow for cards.

#### Consistency and Responsiveness
Throughout the design, there is a consistent use of purple tones, smooth shadows, and soft gradients that tie all elements together visually.

<br>
<br>

# Javascript

This project also showcases various interactive features powered by JavaScript. These include a contact form submission handler, memory match game, Tic Tac Toe, Snake game, and a number guessing game. Each feature enhances the user experience by utilizing JavaScript for dynamic content and real-time updates.

## Features

### 1. Contact Form
- The contact form on the `contact.html` page allows users to send messages. Upon submitting the form, a popup message appears thanking the user for their submission. After 2.5 seconds, the popup disappears, and the user is redirected to the homepage.
Prevents the default form submission `e.preventDefault()`.
Creates and styles a popup message.

### 2. Memory Match Game

  - **Card flipping**: In the code, when a user clicks a card, the `card.classList.add('flipped')` line adds the flipped class to the clicked card. This class triggers the CSS that visually flips the card to reveal the image inside. Additionally, const `img = card.querySelector('img')` targets the image inside the card, and `img.style.opacity = 1` makes the image visible when the card is flipped.

  - **Card matching**: After two cards are flipped, the game checks whether the images on the two flipped cards match by comparing their `dataset.id` values: `flippedCards[0].dataset.id === flippedCards[1].dataset.id`. If the IDs match, the cards are added to the matchedCards array, which keeps track of matched cards. If the IDs do not match, the cards are flipped back by resetting their opacity to 0 and removing the flipped class after a short delay.

  - **Move counter**: Each time two cards are flipped, the `moves++` statement increments the moves variable by 1. This counts the number of turns the player takes to match all the cards.

  - **Shuffle**: To shuffle the cards, the `shuffle()` function is called at the beginning. It selects each card using `cards.forEach(card => {...})`, and for each card, it generates a random order by setting the `style.order` property with `const randomIndex = Math.floor(Math.random() * cards.length)`.

  - **Game completion**: Once all pairs are matched, the game displays a congratulatory message. The message is set using `document.getElementById('message').textContent = Congratulations! You won in ${moves} moves`.

### 3. TicTacToe Game

- **Board creation**:
The `createBoard` function dynamically creates a 3x3 grid by adding div elements for each cell and attaching click event listeners to handle player moves.

- Game logic:
The `checkWinner` function checks the `gameBoard` for any winning conditions, looking for three consecutive matching marks ("X" or "O") in rows, columns, or diagonals. If a win or tie is detected, it updates the game status and stops further moves.
- Cell clicks:
The `handleCellClick` function handles player moves. It updates the cell with the current player's mark ("X" or "O") and alternates the turn after each valid move. If a winner or tie is not found, the next player’s turn is displayed.
- Game restart:
The `restartButton` listener resets the `gameBoard`, sets the current player back to "X", and recreates the board to start a new game.

### 4. Snake Game


- **Canvas setup:**  
In the code, `const canvas = document.getElementById("gameCanvas");` accesses the HTML canvas element, and `const ctx = canvas.getContext("2d");` gets the 2D rendering context. This context is used to draw shapes (like the snake and food) on the canvas.

- **Snake movement:**  
The snake's initial position is set with `let snake = [{ x: 9 * box, y: 10 * box }];`, where each grid cell is 20x20 pixels. The `document.addEventListener("keydown", (event) => {...})` function listens for arrow key presses and changes the snake's direction. For example, `if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";` ensures the snake can only move in the opposite direction if it isn't already moving in that direction.

- **Game drawing:**  
The `draw()` function clears the canvas each frame with `ctx.clearRect(0, 0, canvas.width, canvas.height);`. Then, it draws the snake and the food. The snake is drawn by looping through each segment of the snake's body and coloring the head green and the body light green. `ctx.fillStyle = "green"; ctx.fillRect(segment.x, segment.y, box, box);` handles this for each segment.

- **Food placement:**  
Food is placed at a random position using:  
```javascript
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};
```  
This ensures the food appears within the canvas bounds and on the grid.

- **Snake growth:**  
When the snake eats food (when the head’s position matches the food’s position), it grows in size. The condition `if (head.x === food.x && head.y === food.y)` checks if the snake’s head touches the food. If true, the score increments, and new food is placed randomly. If the snake does not eat, `snake.pop();` removes the last segment of the snake to simulate movement.

- **Collision detection:**  
The game checks for collisions with the wall or the snake's own body using the following condition:  
```javascript
if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
}
```
If the snake hits the wall or itself, the game ends, and the player is shown the score.

- **Snake movement logic:**  
The snake moves by updating its head’s position based on the current direction:
```javascript
let head = { ...snake[0] };
if (direction === "LEFT") head.x -= box;
if (direction === "UP") head.y -= box;
if (direction === "RIGHT") head.x += box;
if (direction === "DOWN") head.y += box;
```

- **Game loop:**  
`const game = setInterval(draw, 100);` runs the `draw()` function every 100 milliseconds, updating the canvas and game state.

---
<br>

## Contact
For any inquiries, feedback, or suggestions, feel free to contact us via the **Contact** section on the website or email us at `sameerprajapati066@gmail.com`.
