window.addEventListener("DOMContentLoaded", () => {
  // creates arrays based off the postion of the arr1 element on the rows of the tables
  const cells = Array.from(document.querySelectorAll(".cell"));
  //   selects class based of what the query is asing for to display current layers turn
  const playerDisplay = document.querySelector(".display-player");
  //select the HTML element with the id attribute set to "reset" and assign it to the resetButton variable.
  const resetButton = document.querySelector("#reset");
  //   based in the turn announcer will show the current player turns
  const announcer = document.querySelector(".announcer");
  // represents the current state of the game board. It has 9 elements, each corresponding to a cell on the game board.
  let board = ["", "", "", "", "", "", "", "", ""];
  //   This variable keeps track of the player who is currently making a move. The value of currentPlayer will be toggled between
  // "Olaf" and "Sven" as the players take turns during the game.
  let currentPlayer = "Olaf";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYEROlaf_WON";
  const PLAYERO_WON = "PLAYERSven_WON";
  const TIE = "TIE";

  //   created the possibe winning outcomes of array combos of the different images on the board
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //  for loop that iterates through the winningConditions array. It will check each winning condition to determine if any player has fulfilled it.

  //This line assigns the current winning condition being checked to the variable winCondition.
  // Each winCondition is an array of three indices representing the positions on the board that need to be filled by the same player to win.
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];

      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      //   This condition checks if any of the cells involved in the current winCondition are empty. If any of them is empty, it means the winning condition cannot be fulfilled,
      // so the loop moves on to the next condition using the continue statement.
      if (a === "" || b === "" || c === "") {
        continue;
      }
      //   This condition checks if the values of a, b, and c are all the same, indicating that a player has won the round. If they are equal,
      // roundWon is set to true, and the loop is terminated using the break statement.
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      // If a player has won, announce the winner and end the game
      announce(currentPlayer === "Olaf" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }
    // If there are no empty cells left, it's a tie
    if (!board.includes("")) {
      announce(TIE);
    }
  }
  // Function to announce the game result
  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        // Announce that Player Sven won
        announcer.innerHTML = 'Player <span class="playerO">Sven</span> Won';
        break;
      case PLAYERX_WON:
        // Announce that Player Olaf won
        announcer.innerHTML = 'Player <span class="playerX">Olaf</span> Won';
        break;
      case TIE:
        // Announce TIE
        announcer.innerText = "Tie";
    }
    announcer.classList.remove("hide");
  };
  // Function to check if a cell is a valid action (not already filled)

  const isValidAction = (cell) => {
    if (cell.hasChildNodes()) {
      // If the cell already has child nodes (image), it is not a valid action
      return false;
    }
    return true;
  };
  // Function to update the game board with the current player's move
  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  // Function to change the current player
  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "Olaf" ? "Sven" : "Olaf";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  // Function to handle user's action (clicking on a cell)
  const userAction = (cell, index) => {
    if (isValidAction(cell) && isGameActive) {
      // Add the respective player's image to the clicked cell
      if (currentPlayer === "Olaf") {
        cell.innerHTML =
          '<img src="images/Olaf.png" style="width: 100px; height: auto;">';
      } else {
        cell.innerHTML =
          '<img src="images/Sven.png" style="width: 100px; height: auto;">';
      }
      cell.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  // Function to reset the game board and state
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "Sven") {
      changePlayer();
    }

    cells.forEach((cell) => {
      cell.innerText = "";
      cell.classList.remove("playerX");
      cell.classList.remove("playerO");
    });
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => userAction(cell, index));
  });
  // Register click event listener for each cell

  resetButton.addEventListener("click", resetBoard);
  // Register click event listener for the reset button
});
