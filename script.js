const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameOver = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],  // Rows
  [0,3,6], [1,4,7], [2,5,8],  // Columns
  [0,4,8], [2,4,6]            // Diagonals
];

function startGame() {
  currentPlayer = 'X';
  isGameOver = false;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  if (isGameOver) return;

  const cell = e.target;
  const classToAdd = currentPlayer.toLowerCase();

  cell.classList.add(classToAdd);
  cell.textContent = currentPlayer;

  if (checkWin(classToAdd)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameOver = true;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a Draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(playerClass) {
  return winningCombinations.some(combination => {
    return combination.every(index =>
      cells[index].classList.contains(playerClass)
    );
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

restartButton.addEventListener('click', startGame);

startGame();
;
