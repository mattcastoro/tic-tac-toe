(function() {
    /* 
    1. listen for players to click the start button
    2. calls startGame function
     */
    const startGameBtn = document.getElementById("startGame");
    startGameBtn.addEventListener("click", () => {
        startGame();
    })

    /* 
    1. initilize player variables and display statement query;
    2. alert players if they have not added names
    3. store players names
    4. inform playerX's turn to start
     */
    let playerX;
    let playerO;
    let displayStatement = document.querySelector(".statement");
    function startGame() {
        if (document.querySelector("#playerXName").value == ""
            || document.querySelector("#playerOName").value == "") {
                alert("Please add player names.")
            } else {
                playerX = document.querySelector("#playerXName").value;
                playerO = document.querySelector("#playerOName").value;
                displayStatement.textContent = `${playerX}'s turn...`;
                displayStatement.style.backgroundColor = "var(--xPlayer-clr)";
            }
    }

    /* 
    1. listen for players to click the reset button
    2. calls resetGame function
     */
    const resetGameBtn = document.getElementById("resetGame");
    resetGameBtn.addEventListener("click", () => {
        resetGame();
    })

    /* 
    1. clears gameboard UI and gameboard data
     */
    function resetGame() {
        gameboard = {};
        gameboard.xKey = new Array();
        gameboard.oKey = new Array();
        displayStatement.textContent = `${playerX}'s turn...`;
        displayStatement.style.backgroundColor = "var(--xPlayer-clr)";
        boxArray.forEach(element => {
            element.textContent = "";
            element.style.pointerEvents = "";
            element.style.backgroundColor = "";
        })
    }

    /* 
    1. initilizes gameboard
    2. initilizes players' arrays
     */
    let gameboard = {};
    gameboard.xKey = new Array();
    gameboard.oKey = new Array();

    /* 
    1. listens for players board selections
    2. displays player's respective X or O
    3. adds player's box selection to their respective array
    4. calls gameResult function with player's array
     */
    const boxArray = document.querySelectorAll(".gameBox");
    let disableMouseLeave = false; // initialize to false so mouseleave executes
    boxArray.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            disableMouseLeave = true;
            if (displayStatement.textContent == `${playerX}'s turn...`) {
                const xEl = document.getElementById(event.target.id);
                xEl.textContent = "X";
                xEl.style.pointerEvents = "none";
                xEl.style.backgroundColor = "var(--xPlayer-clr)";
                console.log("X");
                gameboard.xKey.push(event.target.id);
                gameResult(gameboard.xKey);
            } else if (displayStatement.textContent == `${playerO}'s turn...`) {
                const oEl = document.getElementById(event.target.id);
                oEl.textContent = "O";
                oEl.style.pointerEvents = "none";
                oEl.style.backgroundColor = "var(--oPlayer-clr)";
                console.log("O");
                gameboard.oKey.push(event.target.id);
                gameResult(gameboard.oKey);
            }
            
        })
    })

    /* 
    1. listens for mouseenter/mouseleave
    2. changes backgroundColor upon respective event */
    boxArray.forEach((box) => {
        box.addEventListener("mouseenter", (event) => {
            if (displayStatement.textContent == `${playerX}'s turn...`) {
                const xEl = document.getElementById(event.target.id);
                xEl.style.backgroundColor = "var(--xPlayer-clr)";
            } else if (displayStatement.textContent == `${playerO}'s turn...`) {
                const oEl = document.getElementById(event.target.id);
                oEl.style.backgroundColor = "var(--oPlayer-clr)";
            }
        })
    })
    boxArray.forEach((box) => {
        box.addEventListener("mouseleave", (event) => {
            if (disableMouseLeave) { // click event causes true
                disableMouseLeave = false; // return variable to false
            } else if (displayStatement.textContent == `${playerX}'s turn...`) {
                    const xEl = document.getElementById(event.target.id);
                    xEl.style.backgroundColor = "";
            } else if (displayStatement.textContent == `${playerO}'s turn...`) {
                const oEl = document.getElementById(event.target.id);
                oEl.style.backgroundColor = "";
            }
        })
    })

    /* 
    1. provides an array of winning combinations
     */
    const winningCombos = [
        ["gameBox11", "gameBox12","gameBox13"],
        ["gameBox11", "gameBox22","gameBox33"],
        ["gameBox11", "gameBox21","gameBox31"],
        ["gameBox12", "gameBox22","gameBox32"],
        ["gameBox13", "gameBox23","gameBox33"],
        ["gameBox13", "gameBox22","gameBox31"],
        ["gameBox21", "gameBox22","gameBox23"],
        ["gameBox31", "gameBox32","gameBox33"]
    ];

    /* 
    1. calls maybeWinner function to determine if a given player has won
    2. if false, calls tieGame function to determine if all boxes are complete without a winner
    3. if all boxes are complete without a winner then displays tie
    4. else displays the next players turn
     */
    function gameResult(playerSelections) {
        if (maybeWinner(playerSelections) === true) {
        } else if (tieGame() === true) {
            displayStatement.textContent = "It's a tie...";
            displayStatement.style.backgroundColor = "var(--tieGame-clr)";
        } else if (displayStatement.textContent == `${playerX}'s turn...`) {
            displayStatement.textContent = `${playerO}'s turn...`;
            displayStatement.style.backgroundColor = "var(--oPlayer-clr)";
        } else if (displayStatement.textContent == `${playerO}'s turn...`) {
            displayStatement.textContent = `${playerX}'s turn...`;
            displayStatement.style.backgroundColor = "var(--xPlayer-clr)";
        }
    }

    /* 
    1. loops through the winning combinations and compares to current player's array
    2. returns true and displays winner if a given player has won the game
    3. prevents players from selecting a box
     */
    function maybeWinner(playerSelections) {
        for (i = 0; i < winningCombos.length; i++) {
            if (winningCombos[i].every(j => playerSelections.includes(j)) === true) {
                if (displayStatement.textContent == `${playerX}'s turn...`) {
                    displayStatement.textContent = `${playerX} WINS!!!`;
                    displayStatement.style.backgroundColor = "var(--xPlayer-clr)";
                    boxArray.forEach(element => {
                        element.style.pointerEvents = "none";
                    })
                } else {
                    displayStatement.textContent = `${playerO} WINS!!!`;
                    displayStatement.style.backgroundColor = "var(--oPlayer-clr)";
                    boxArray.forEach(element => {
                        element.style.pointerEvents = "none";
                    })
                } return true;
            }
        }
    }

    /* 
    1. loops through the gameboard(boxArray) to determine if there are any blank boxes
    2. returns true if there are no blank boxes 
    */
    function tieGame() {
        tieArray = [];
        boxArray.forEach(element => {
            tieArray.push(element.textContent);
        })
        if (!tieArray.includes("")) {
            return true;
        }
}
})();



