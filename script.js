const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
const cells = Array(9).fill(null);

// Create board cells
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Check for winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return cells.includes(null) ? null : "Tie";
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    statusText.textContent =
      winner === "Tie" ? "It's a tie!" : `Player ${winner} wins!`;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Reset game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  cells.fill(null);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

// Initialize game
resetButton.addEventListener("click", resetGame);
createBoard();
statusText.textContent = `Player ${currentPlayer}'s turn`;

// Prevent right-click and Ctrl+U
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }
});
