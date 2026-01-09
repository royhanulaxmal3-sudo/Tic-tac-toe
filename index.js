const tiles = document.querySelectorAll('.tile');
const announcer = document.querySelector('.announcer');
const resetButton = document.getElementById('reset');
const resetScoreButton = document.getElementById('reset-score');
const playerName = document.getElementById('player-name');
const resultText = document.getElementById('result-text');
const resultEmoji = document.getElementById('result-emoji');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const scoreDrawDisplay = document.getElementById('score-draw');

const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameActive = true;
let currentPlayer = PLAYER_X;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

function updatePlayer() {
    playerName.textContent = currentPlayer;
    const statusBoard = document.querySelector('.status-board');
    statusBoard.classList.remove('player-o-turn', 'player-x-turn');
    statusBoard.classList.add(currentPlayer === 'X' ? 'player-x-turn' : 'player-o-turn');
}

function handleTileClick(e) {
    const tile = e.target;
    const index = tile.dataset.index;

    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    tile.textContent = currentPlayer;
    tile.classList.add(`player-${currentPlayer}`);
    tile.classList.add('filled');

    if (checkWinner()) {
        announcer.classList.remove('hide');
        resultText.textContent = `🏆 Player ${currentPlayer} Menang!`;
        resultEmoji.textContent = currentPlayer === 'X' ? '❌' : '⭕';
        gameActive = false;
        
        if (currentPlayer === 'X') {
            scoreX++;
        } else {
            scoreO++;
        }
        updateScore();
        return;
    }

    if (gameBoard.every(tile => tile !== '')) {
        announcer.classList.remove('hide');
        resultText.textContent = `Permainan Seri!`;
        resultEmoji.textContent = '🤝';
        gameActive = false;
        scoreDraw++;
        updateScore();
        return;
    }

    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    updatePlayer();
}

function checkWinner() {
    return WINNING_COMBOS.some(combo => {
        return combo.every(index => gameBoard[index] === currentPlayer);
    });
}

function updateScore() {
    scoreXDisplay.textContent = scoreX;
    scoreODisplay.textContent = scoreO;
    scoreDrawDisplay.textContent = scoreDraw;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = PLAYER_X;
    gameActive = true;
    announcer.classList.add('hide');
    resultText.textContent = '';
    resultEmoji.textContent = '';
    
    tiles.forEach(tile => {
        tile.textContent = '';
        tile.classList.remove('player-X', 'player-O', 'filled');
    });
    
    updatePlayer();
}

function resetScore() {
    scoreX = 0;
    scoreO = 0;
    scoreDraw = 0;
    updateScore();
}

tiles.forEach(tile => tile.addEventListener('click', handleTileClick));
resetButton.addEventListener('click', resetGame);
resetScoreButton.addEventListener('click', resetScore);

updatePlayer();
updateScore();