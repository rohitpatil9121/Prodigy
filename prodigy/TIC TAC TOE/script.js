const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);
let winningLine = [];

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function updateStatus(message) {
  status.textContent = message;
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || boardState[index] !== null) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('disabled');

  if (checkWin()) {
    gameActive = false;
    updateStatus(`Player ${currentPlayer} wins!`);
    highlightWinningCells();
    restartBtn.disabled = false;
    disableBoard();
  } else if (boardState.every(cell => cell !== null)) {
    gameActive = false;
    updateStatus('Game Tied!');
    restartBtn.disabled = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s turn`);
  }
}

function checkWin() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      winningLine = combo;
      return true;
    }
  }
  return false;
}

function highlightWinningCells() {
  winningLine.forEach(index => {
    cells[index].classList.add('win');
  });
}

function disableBoard() {
  cells.forEach(cell => {
    cell.classList.add('disabled');
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  boardState.fill(null);
  winningLine = [];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('disabled', 'win');
  });
  updateStatus(`Player ${currentPlayer}'s turn`);
  restartBtn.disabled = true;
}

function restartGame() {
  resetGame();
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
  cell.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCellClick(e);
    }
  });
});

resetBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', restartGame);