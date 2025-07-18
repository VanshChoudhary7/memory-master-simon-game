let userSeq = [];
let gameSeq = [];

let btns = ["red","yellow","green","blue"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
    console.log("The Game is Started.");
    started = true;

    levelup();
})

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout( ()=> {
        btn.classList.remove("flash");
    },300)
}

function levelup() {
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * 3);
    let randclr = btns[randIndx];
    let btn = document.querySelector(`.${randclr}`);
    btnflash(btn);
    
}