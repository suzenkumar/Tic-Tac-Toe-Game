let currentPlayer = "X";
let gameActive = true;
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
      statusText.textContent = `${currentPlayer} Wins 🎉`;
      gameActive = false;
      return;
    }

    if ([...cells].every(c => c.textContent)) {
      statusText.textContent = "Draw 🤝";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Turn: ${currentPlayer}`;
  });
});

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(i => cells[i].textContent === currentPlayer)
  );
}

function resetGame() {
  cells.forEach(c => {
    c.textContent = "";
    c.classList.remove("x", "o");
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Turn: X";
}

document.getElementById("restart").addEventListener("click", resetGame);