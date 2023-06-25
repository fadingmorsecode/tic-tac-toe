const gameBoard = (() => {
  const obj = ['', '', '', '', '', '', '', '', ''];
  return { obj };
})();

const modalController = (() => {
  const modal = document.querySelector('#start-modal');
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

const newGameController = (() => {
  const newGameModal = document.querySelector('#new-game-modal');
  const winAnnouncement = document.querySelector('.win-announcement');
  const newGameBtn = document.querySelector('.new-game-btn');

  const hideNewGameModal = () => {
    newGameModal.style.display = 'none';
  };

  const showNewGameModal = () => {
    newGameModal.style.display = 'flex';
  };

  const newGame = (result) => {
    if (result === 'tie') {
      showNewGameModal();
      winAnnouncement.textContent = 'Oops! You tied';
    } else {
      showNewGameModal();
      winAnnouncement.textContent = `${result} won that round!`;
    }
  };

  newGameBtn.onclick = () => {
    hideNewGameModal();
  };

  return { newGame, hideNewGameModal };
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
  const headerText = document.querySelector('.header-text');
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
        headerText.textContent = 'Tic Tac Toe';
        console.log(`${playerOne.name} wins`);
        newGameController.newGame(playerOne.name);
      }

      if (
        condition.every((value) => playerTwo.playerMoves.includes(value)) ===
        true
      ) {
        winner = playerTwo;
        headerText.textContent = 'Tic Tac Toe';
        console.log(`${playerTwo.name} wins`);
        newGameController.newGame(playerTwo.name);
      }
    });
    if (gameBoard.obj.every((mark) => mark !== '') && winner === '') {
      headerText.textContent = 'Tic Tac Toe';
      console.log('you tied');
      newGameController.newGame('tie');
    }
  };

  const placeMark = (index) => {
    if (gameBoard.obj[index] === '' && winner === '') {
      gameBoard.obj.splice(index, 1, `${activePlayer.symbol}`);
      activePlayer.playerMove(index);

      switch (activePlayer) {
        case playerOne:
          activePlayer = playerTwo;
          headerText.textContent = `${activePlayer.name}'s turn`;
          break;
        case playerTwo:
          activePlayer = playerOne;
          headerText.textContent = `${activePlayer.name}'s turn`;
          break;
        default:
      }

      checkWin();

      renderBoard.renderFunc();
    }
  };

  renderBoard.displayArray.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      placeMark(index);
    });
    return { headerText };
  });

  modalController.playBtn.onclick = () => {
    const inputValues = modalController.getInputValues();
    const [a, b] = inputValues;
    if (!a) {
      modalController.playerOneInput.style.borderColor = 'red';
    }
    if (!b) {
      modalController.playerTwoInput.style.borderColor = 'red';
    } else {
      modalController.hideModal();
      playerOne.name = a;
      playerTwo.name = b;
      headerText.textContent = `${activePlayer.name}'s turn`;
    }
  };
})();
