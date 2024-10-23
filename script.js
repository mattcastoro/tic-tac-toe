(function() {
    const startGameBtn = document.getElementById("startGame");
    startGameBtn.addEventListener("click", () => {
        startGame();
    })

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
            }
    }

    const resetGameBtn = document.getElementById("resetGame");
    resetGameBtn.addEventListener("click", () => {
        resetGame();
    })

    function resetGame() {
        gameboard = {};
        gameboard.xKey = new Array();
        gameboard.oKey = new Array();
        displayStatement.textContent = `${playerX}'s turn...`;
        boxArray.forEach(element => {
            element.textContent = "";
        })
    }

    const boxArray = document.querySelectorAll(".gameBox");
    boxArray.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (displayStatement.textContent == `${playerX}'s turn...`) {
                document.getElementById(event.target.id).textContent = "X";
                gameboard.xKey.push(event.target.id);
                gameResult(gameboard.xKey);
            } else if (displayStatement.textContent == `${playerO}'s turn...`) {
                document.getElementById(event.target.id).textContent = "O";
                gameboard.oKey.push(event.target.id);
                gameResult(gameboard.oKey);
            }
            
        })
    })

    let gameboard = {};
    gameboard.xKey = new Array();
    gameboard.oKey = new Array();

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

    function gameResult(playerSelections) {
        for (i = 0; i < winningCombos.length; i++) {
            if (winningCombos[i].every(j => playerSelections.includes(j)) === true) {
                if (displayStatement.textContent == `${playerX}'s turn...`) {
                    displayStatement.textContent = `${playerX} WINS!!!`;
                } else {
                    displayStatement.textContent = `${playerO} WINS!!!`;
                }
            }
        }
        if (tieGame() === true) {
            displayStatement.textContent = "It's a tie...";
        } else if (displayStatement.textContent == `${playerX}'s turn...`) {
            displayStatement.textContent = `${playerO}'s turn...`;
        } else if (displayStatement.textContent == `${playerO}'s turn...`) {
            displayStatement.textContent = `${playerX}'s turn...`;
        }
    }

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



