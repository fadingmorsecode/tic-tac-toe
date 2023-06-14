const displayArray = document.querySelectorAll('.cells');

const gameBoard = (() => {
  const obj = ['x', 'o', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
  return { obj };
})();

const Player = (name, symbol) => ({ name, symbol });

const gameFlow = (() => {
  const playerOne = Player('Player One', 'x');
  const playerTwo = Player('Player Two', 'o');

  const randomNum = Math.floor(Math.random() * 100);

  let activePlayer = '';

  if (randomNum <= 49) {
    activePlayer = playerOne.name;
  } else {
    activePlayer = playerTwo.name;
  }
})();

const renderBoard = (() => {
  const renderFunc = () => {
    gameBoard.obj.forEach((mark, index) => {
      displayArray[index].textContent = mark;
    });
  };
  return { renderFunc };
})();

renderBoard.renderFunc();
