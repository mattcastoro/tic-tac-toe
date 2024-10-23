// (function() {

// })();

const boxArray = document.querySelectorAll(".gameBox");
boxArray.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        if (displayStatement.textContent == `${playerX}'s turn...`) {
            document.getElementById(event.target.id).textContent = "X";
            gameboard.xKey.push(event.target.id);
            gameResult(gameboard.xKey);
            displayStatement.textContent = `${playerO}'s turn...`;
        } else if (displayStatement.textContent == `${playerO}'s turn...`) {
            document.getElementById(event.target.id).textContent = "O";
            gameboard.oKey.push(event.target.id);
            gameResult(gameboard.oKey);
            displayStatement.textContent = `${playerX}'s turn...`;
        }
        
    })
})

const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", () => {
    startGame();
})

let playerX;
let playerO;
let displayStatement = document.querySelector(".statement");
function startGame() {
    //validate users have added their names //
    playerX = document.querySelector("#playerXName").value;
    playerO = document.querySelector("#playerOName").value;
    displayStatement.textContent = `${playerX}'s turn...`;
}

const gameboard = {};
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
            console.log("test");
        }
    }
}


