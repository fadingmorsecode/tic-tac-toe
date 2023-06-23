const displayArray = document.querySelectorAll('.cells');

const gameBoard = (() => {
  const obj = ['', '', '', '', '', '', '', '', ''];
  return { obj };
})();

const renderBoard = (() => {
  const renderFunc = () => {
    gameBoard.obj.forEach((mark, index) => {
      displayArray[index].textContent = mark;
    });
  };
  return { renderFunc };
})();

const Player = (name, symbol) => {
  const playerMoves = [];
  const playerMove = (index) => {
    playerMoves.splice(index, 0, index);
  };
  return { name, symbol, playerMoves, playerMove };
};

const gameFlow = (() => {
  const playerOne = Player('Player One', 'x');
  const playerTwo = Player('Player Two', 'o');
  const randomNum = Math.floor(Math.random() * 100);

  let activePlayer = '';

  if (randomNum <= 49) {
    activePlayer = playerOne;
  } else {
    activePlayer = playerTwo;
  }

  const placeMark = (index) => {
    if (gameBoard.obj[index] === '') {
      gameBoard.obj.splice(index, 1, `${activePlayer.symbol}`);
      activePlayer.playerMove(index);
      console.log(
        `${activePlayer.name}'s array is ${activePlayer.playerMoves}`
      );

      switch (activePlayer) {
        case playerOne:
          activePlayer = playerTwo;

          break;
        case playerTwo:
          activePlayer = playerOne;
          break;
        default:
      }

      renderBoard.renderFunc();
    }
  };

  displayArray.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      placeMark(index);
    });
  });
})();

winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

playerOneMarks = [];
playerTwoMarks = [];
