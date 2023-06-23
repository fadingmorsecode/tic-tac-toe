const gameBoard = (() => {
  const obj = ['', '', '', '', '', '', '', '', ''];
  return { obj };
})();

const renderBoard = (() => {
  const displayArray = document.querySelectorAll('.cells');
  const renderFunc = () => {
    gameBoard.obj.forEach((mark, index) => {
      displayArray[index].textContent = mark;
    });
  };
  return { displayArray, renderFunc };
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
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let activePlayer = '';
  let winner = '';

  if (randomNum <= 49) {
    activePlayer = playerOne;
  } else {
    activePlayer = playerTwo;
  }

  const checkWin = () => {
    winConditions.forEach((condition) => {
      if (
        condition.every((value) => playerOne.playerMoves.includes(value)) ===
        true
      ) {
        winner = playerOne;
        console.log('player one wins');
      }

      if (
        condition.every((value) => playerTwo.playerMoves.includes(value)) ===
        true
      ) {
        winner = playerTwo;
        console.log('player two wins');
      }
    });
    if (gameBoard.obj.every((mark) => mark !== '') && winner === '') {
      console.log('you tied');
    }
  };

  const placeMark = (index) => {
    if (gameBoard.obj[index] === '' && winner === '') {
      gameBoard.obj.splice(index, 1, `${activePlayer.symbol}`);
      activePlayer.playerMove(index);
      checkWin();

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

  renderBoard.displayArray.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      placeMark(index);
    });
  });
})();
