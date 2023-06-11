const displayArray = document.querySelectorAll('.cells');

const gameBoard = (() => {
  const obj = ['x', 'o', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
  return { obj };
})();

const Player = (symbol) => {
  return { symbol };
};

const gameFlow = (() => {})();

const renderBoard = (() => {
  const renderFunc = () => {
    gameBoard.obj.forEach((mark, index) => {
      displayArray[index].textContent = mark;
    });
  };
  return { renderFunc };
})();

renderBoard.renderFunc();
