const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
let circleTurn;
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector(
    '[data-winning-message-text]'
);
const restartButton = document.getElementById('restartButton');

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    // after click on grid always check whether
    // some condition (winning or draw) is met or not before swapping turns
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${
            circleTurn ? "O's" : "X's"
        } Wins!`;
    }
    winningMessageElement.classList.add('show');
    // if either win or draw condition is met
    // then display the results of the game
}

function isDraw() {
    return [...cellElements].every((cell) => {
        return (
            cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
        );
    });
    // this function checks whether all the grids
    // in the board are filled with either x or o
    // and declares draw if it's true
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
    // for each it will display the hover effect
    // of the pieces in the game i.e. either x or o
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    // this function will insert either x or o depends on
    // the turn... inside board
}

function swapTurns() {
    circleTurn = !circleTurn;
    // this function will change turns from x to o
    // every time it's called
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });

    /*how this function executes for one instance of winning combinations
    [0, 1, 2].some([0, 1, 2].every(for every value 
    check if it contains either x or o
    for example take x
    0 has class x true
    1 has class x true
    2 has class x true
    true and true and true gives true hence we found the winning combinations))*/
}
