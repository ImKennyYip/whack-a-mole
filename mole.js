const soilField = document.getElementById("soil");

// display all the pipe
function showPipes() {
  for (let i = 1; i <= 9; i++) {
    let img = document.createElement("div");

    img.classList.add("h-32", "pipe", "z-10");
    img.id = i;
    soilField.appendChild(img);
  }
}
showPipes();

// random id ganerator for mole
function randomId() {
  return Math.floor(Math.random() * 9) + 1;
}
// display mole
// create mole img elem
// append in pipe div
function showMole(id) {
  let pipe = document.getElementById(`${id}`);
  let mole = document.createElement("img");
  mole.addEventListener("click", incScore);

  mole.classList.add("mole");
  mole.src = "./monty-mole.png";
  pipe.appendChild(mole);
}

// display planta plant
// same logic of mole

function showPlant(id) {
  let pipe = document.getElementById(`${id}`);
  if (pipe.id === document.querySelector(".mole").parentNode.id) {
    return;
  }

  let plant = document.createElement("img");
  plant.addEventListener("click", gameOver);

  plant.classList.add("plant");
  plant.src = "piranha-plant.png";
  pipe.appendChild(plant);
}

// clear pipes container evry interval
function cleanPipeContainer() {
  const allPipe = document.querySelectorAll(".pipe");
  allPipe.forEach((pipe) => {
    pipe.innerHTML = "";
  });
}
// call game char after so time intervally
// check is two playar id same ?
let timerId;
function interval() {
  timerId = setInterval(() => {
    cleanPipeContainer();

    showMole(randomId());
    showPlant(randomId());
  }, 700);
}
interval();
// increaze score click on mole
let score = 0;
function incScore() {
  score += 10;
  document.getElementById("score").innerText = score;

  let pointEffect = new Audio("./soundEffect/90s-game-ui-6-185099.mp3");
  pointEffect.play();
}

// game over
// clearTimer
// remover all event listener
// add sound effect onclick
// show game over  message
function gameOver() {
  clearInterval(timerId);
  document.querySelector(".mole").removeEventListener("click", incScore);
  document.querySelector(".plant").removeEventListener("click", gameOver);

  let gameOverSound = new Audio("./soundEffect/game-over-39-199830.mp3");
  gameOverSound.play();

  //   show game over message
  let totalScore = document.getElementById("totalScore");
  totalScore.innerText = score;

  let gameOverMessage = document.getElementById("gameOver");
  gameOverMessage.classList.remove("-top-52");
  gameOverMessage.classList.add("top-1/2", "left-1/2", "-translate-y-1/2");
}

// play again
// start again interval
// close game over message
// clean score
// add start sound effect
function playAgain() {
  interval();

  let gameOverMessage = document.getElementById("gameOver");
  gameOverMessage.classList.remove("top-1/2", "-translate-y-1/2");
  gameOverMessage.classList.add("-top-52");

  document.getElementById("score").innerText = "00";

  let gameStart = new Audio("./soundEffect/game-start-6104.mp3");
  gameStart.play();
}
document.getElementById("gameOver").addEventListener("click", playAgain);
