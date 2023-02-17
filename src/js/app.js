import createElement from "./functions/create_element.js";
import Cell from "./Components/Cell.js";

const app = document.getElementById("app");
const startButton = document.querySelector(".start");
const hardMode = document.getElementById("500");
const normalMode = document.getElementById("1000");
const easyMode = document.getElementById("1500");
const playerOutput = document.querySelector(".player");
const computerOutput = document.querySelector(".computer");

const table = document.querySelector("table");

let timeout;

let interval;

let difficultyMode = 1500;

function startGame() {
  let playerPoint = 0;

  let computerPoint = 0;

  let cellDataNumber = 0;

  computerOutput.innerText = `Количество очков у компьютера: ${computerPoint}`;
  playerOutput.innerText = `Количество очков у игрока: ${playerPoint}`;

  table.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const tableRow = createElement("tr", "");
    for (let j = 0; j < 10; j++) {
      const td = new Cell();
      td.createCell(tableRow);
      // td.style.height = getComputedStyle(td).width + "px";
    }
    table.append(tableRow);
  }

  const cells = [...document.querySelectorAll("td")];

  cells.forEach((cell) => {
    cell.setAttribute("data-number", cellDataNumber);
    cellDataNumber++;
  });

  let cellsNumber = cells.map((cell, index) => index);

  function endGame() {
    const endGameModalWindow = createElement("div", "end-game-modal");
    const winner = createElement("p", "winner");
    const againButton = createElement("button", "again-button");
    againButton.innerText = "Заного.";
    computerPoint === 10
      ? (winner.innerText = `Ты проиграл со счетом ${playerPoint}:${computerPoint}`)
      : (winner.innerText = `Ты выиграл со счетом ${playerPoint}:${computerPoint}`);
    endGameModalWindow.append(winner, againButton);
    app.append(endGameModalWindow);
    againButton.addEventListener("click", () => {
      endGameModalWindow.remove();
    });
  }

  function begin(cellActivationTimeout = difficultyMode) {
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
          computerOutput.innerText = `Количество очков у компьютера: ${computerPoint}`;
          if (computerPoint === 10) {
            clearInterval(interval);
            endGame();
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
          playerOutput.innerText = `Количество очков у игрока: ${playerPoint}`;
          if (playerPoint === 10) {
            clearInterval(interval);
            clearTimeout(timeout);
            endGame();
            return;
          }
          clearTimeout(timeout);
          cellsNumber = [...cellsNumber].filter(
            (cell, index) => index !== randomCell
          );
        }
      }
    });
  }

  interval = setInterval(begin, 2000);
}
startButton.addEventListener("click", () => {
  clearInterval(interval);
  clearTimeout(timeout);
  [...document.querySelectorAll("input")].forEach((input) => {
    if (input.checked) {
      difficultyMode = +input.value;
      startGame();
    }
  });
});
