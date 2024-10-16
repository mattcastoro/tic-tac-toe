
const boxArray = document.querySelectorAll(".gameBox");
boxArray.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        document.getElementById(event.target.id).textContent = "X";
    })
})