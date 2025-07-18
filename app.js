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

//Button Flash Function
function btnflash(randbtn) {
    randbtn.classList.add("flash");
    setTimeout( ()=> {
        randbtn.classList.remove("flash");
    },350)
}

//Function To Level Up 
function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * btns.length);
    let randclr = btns[randIndx];
    let randbtn = document.querySelector(`.${randclr}`);
    gameSeq.push(randclr);
    btnflash(randbtn);

}

//Checking the UserSeq and GameSeq
function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `The Game is Over! Your Score is ${level} <br> Press any Key to Start Again!`;
        let box = document.querySelector(".box");
        box.classList.add("out");
        setTimeout( ()=> {
            box.classList.remove("out");
            reset();
        },300)
    }
}


//User Button Press Function 
function btnPress() {
   let btn = this;
   btnflash(btn);

   let userclr = btn.getAttribute("id");
   userSeq.push(userclr);

   checkAns(userSeq.length -1);
}  

//Tracking all the Buttons
let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}