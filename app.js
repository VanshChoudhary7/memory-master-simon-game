let userSeq = [];
let gameSeq = [];

let btns = ["red","yellow","green","blue"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
    if(started == false) {
    console.log("The Game is Started.");
    started = true;

    levelup();
    }
})

function btnflash(randbtn) {
    randbtn.classList.add("flash");
    setTimeout( ()=> {
        randbtn.classList.remove("flash");
    },350)
}

function levelup() {
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * btns.length);
    let randclr = btns[randIndx];
    let randbtn = document.querySelector(`.${randclr}`);
    btnflash(randbtn);

}