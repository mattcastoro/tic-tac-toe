// (function() {

// })();

const boxArray = document.querySelectorAll(".gameBox");
boxArray.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        if (displayStatement.textContent == `${playerX}'s turn...`) {
            document.getElementById(event.target.id).textContent = "X";
            gameboard.xKey.push(event.target.id);
            displayStatement.textContent = `${playerO}'s turn...`;
        } else if (displayStatement.textContent == `${playerO}'s turn...`) {
            document.getElementById(event.target.id).textContent = "O";
            gameboard.oKey.push(event.target.id);
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
    playerX = document.querySelector("#playerXName").value;
    playerO = document.querySelector("#playerOName").value;
    displayStatement.textContent = `${playerX}'s turn...`;
}

const gameboard = {};
gameboard.xKey = new Array();
gameboard.oKey = new Array();

