const gameBoard = (() => {
  const obj = ['', '', '', '', '', '', '', '', ''];
  return { obj };
})();

const Player = (name, symbol) => {
  const playerMoves = [];
  const playerMove = (index) => {
    playerMoves.splice(index, 0, index);
  };
  return { name, symbol, playerMoves, playerMove };
};

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
  return { newGame, hideNewGameModal, newGameBtn };
})();

const gameFlow = (() => {
  const playerOne = Player('', 'x');
  const playerTwo = Player('', 'o');
  const headerText = document.querySelector('.header-text');
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

  const chooseActive = () => {
    if (Math.floor(Math.random() * 100) <= 50) {
      activePlayer = playerOne;
    } else {
      activePlayer = playerTwo;
    }
  };
  chooseActive();

  const checkWin = () => {
    winConditions.forEach((condition) => {
      if (
        condition.every((value) => playerOne.playerMoves.includes(value)) ===
        true
      ) {
        winner = playerOne;
        headerText.textContent = 'Tic Tac Toe';
        newGameController.newGame(playerOne.name);
      }

      if (
        condition.every((value) => playerTwo.playerMoves.includes(value)) ===
        true
      ) {
        winner = playerTwo;
        headerText.textContent = 'Tic Tac Toe';
        newGameController.newGame(playerTwo.name);
      }
    });
    if (gameBoard.obj.every((mark) => mark !== '') && winner === '') {
      headerText.textContent = 'Tic Tac Toe';
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

  newGameController.newGameBtn.onclick = () => {
    newGameController.hideNewGameModal();
    for (let i = 0; i < gameBoard.obj.length; i++) {
      gameBoard.obj.splice(i, 1, '');
      renderBoard.displayArray[i].classList.remove('playerOne');
      renderBoard.displayArray[i].classList.remove('playerTwo');
    }
    renderBoard.renderFunc();
    winner = '';
    chooseActive();
    playerOne.playerMoves.splice(0, playerOne.playerMoves.length);
    playerTwo.playerMoves.splice(0, playerTwo.playerMoves.length);
    modalController.showModal();
  };
})();
