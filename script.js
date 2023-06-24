const gameBoard = (() => {
  const obj = ['', '', '', '', '', '', '', '', ''];
  return { obj };
})();

const modalController = (() => {
  const modal = document.querySelector('.modal');
  const playBtn = document.querySelector('.play-btn');
  const playerOneInput = document.querySelector('#playerOneInput');
  const playerTwoInput = document.querySelector('#playerTwoInput');

  const getInputValues = () => [playerOneInput.value, playerTwoInput.value];

  const hideModal = () => {
    modal.style.display = 'none';
  };

  const showModal = () => {
    modal.style.display = 'flex';
  };
  return {
    hideModal,
    showModal,
    playBtn,
    playerOneInput,
    playerTwoInput,
    getInputValues,
  };
})();

const renderBoard = (() => {
  const displayArray = document.querySelectorAll('.cells');
  const renderFunc = () => {
    gameBoard.obj.forEach((mark, index) => {
      displayArray[index].textContent = mark;
      if (mark === 'x') {
        displayArray[index].classList.add('playerOne');
      } else if (mark === 'o') {
        displayArray[index].classList.add('playerTwo');
      }
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
  const playerOne = Player('', 'x');
  const playerTwo = Player('', 'o');
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
        console.log(`${playerOne.name} wins`);
      }

      if (
        condition.every((value) => playerTwo.playerMoves.includes(value)) ===
        true
      ) {
        winner = playerTwo;
        console.log(`${playerTwo.name} wins`);
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

  modalController.playBtn.onclick = () => {
    const inputValues = modalController.getInputValues();
    modalController.hideModal();
    const [a, b] = inputValues;
    playerOne.name = a;
    playerTwo.name = b;
  };
})();
