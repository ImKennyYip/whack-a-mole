let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    loadTopScores(); // Load the top scores on game start
    setGame();
}

function setGame() {
    // Set up the grid in HTML
    document.getElementById("board").innerHTML = ""; // Clear previous tiles
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    score = 0;
    document.getElementById("score").innerText = score.toString();
    gameOver = false;
    setInterval(setMole, 1000); // Every 1 second call setMole
    setInterval(setPlant, 2000); // Every 2 seconds call setPlant
}

function getRandomTile() {
    // math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) return;
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) return;
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this == currPlantTile) {
        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        saveScore(score);
    }
}

// Save the score and update top 3
function saveScore(newScore) {
    let scores = JSON.parse(localStorage.getItem("topScores")) || [];
    scores.push(newScore);
    scores.sort((a, b) => b - a); // Sort in descending order
    if (scores.length > 3) scores = scores.slice(0, 3); // Keep top 3
    localStorage.setItem("topScores", JSON.stringify(scores));
    displayTopScores(scores);
}

function loadTopScores() {
    let scores = JSON.parse(localStorage.getItem("topScores")) || [];
    displayTopScores(scores);
}

function displayTopScores(scores) {
    let topScoresDiv = document.getElementById("top-scores");
    topScoresDiv.innerHTML = ""; // Clear existing content
    scores.forEach((score, index) => {
        let scoreElement = document.createElement("div");
        scoreElement.innerText = `#${index + 1}: ${score}`;
        topScoresDiv.appendChild(scoreElement);
    });
}

// Restart the game
function restartGame() {
    gameOver = true; // End the current game
    setGame(); // Reset and start a new game
}
