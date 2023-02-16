import createElement from "./functions/create_element.js";

const app = document.getElementById("app");
const startButton = document.querySelector(".start");
const hardMode = document.getElementById("500");
const normalMode = document.getElementById("1000");
const easyMode = document.getElementById("1500");
const playerOutput = document.querySelector(".player");
const computerOutput = document.querySelector(".computer");

const cells = [...document.querySelectorAll("td")];

let playerPoint = 0;
let computerPoint = 0;

let cellDataNumber = 0;

cells.forEach((cell) => {
  cell.setAttribute("data-number", cellDataNumber);
  cellDataNumber++;
});

let cellsNumber = cells.map((cell, index) => index);

let timeout;

let interval;

let difficultyMode = 1500;

function getRandomCell(cellActivationTimeout = difficultyMode) {
  if (computerPoint === 10) {
    clearInterval(interval);
    return;
  }

  if (playerPoint === 10) {
    clearInterval(interval);
    return;
  }
  const randomCell = Math.floor(Math.random() * cellsNumber.length);

  cells.map((cell) => {
    if (+cell.getAttribute("data-number") === cellsNumber[randomCell]) {
      cell.addEventListener("click", playerGetPoint);

      cell.firstChild.style.top = "0%";

      // cell.style.background = "blue";

      timeout = setTimeout(() => {
        cell.firstChild.style.top = "100%";
        cell.style.background = "red";
        cell.removeEventListener("click", playerGetPoint);
        computerPoint++;
        computerOutput.innerText = `Количество очков у компьютера: ${computerPoint}`
        if (computerPoint === 10) {
          clearInterval(interval);
          return;
        }
        cellsNumber = [...cellsNumber].filter(
          (cell, index) => index !== randomCell
        );
      }, difficultyMode);

      function playerGetPoint() {
        cell.firstChild.style.top = "100%";
        cell.style.background = "green";
        playerPoint++;
        playerOutput.innerText = `Количество очков у игрока: ${playerPoint}`
        clearTimeout(timeout);
        cellsNumber = [...cellsNumber].filter(
          (cell, index) => index !== randomCell
        );
      }
    }
  });
}

startButton.addEventListener("click", () => {
  [...document.querySelectorAll("input")].forEach((input) => {
    if (input.checked) {
      difficultyMode = +input.value;
      interval = setInterval(getRandomCell, 2000);
    }
  });
});
