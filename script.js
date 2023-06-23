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

const Player = (name, symbol) => ({ name, symbol });

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
