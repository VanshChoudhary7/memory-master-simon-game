let highScore = 0;
let userSeq = [];
let gameSeq = [];
let muted = false;

let btns = ["red","yellow","green","blue"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");


document.addEventListener("keypress", () => {
    if(started == false) {
    console.log("The Game is Started.");
    started = true;
    playStartSound();

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
    let toast = document.getElementById("toast");
    toast.innerText = `Level ${level}!`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 800);

    let randIndx = Math.floor(Math.random() * btns.length);
    let randclr = btns[randIndx];
    let randbtn = document.querySelector(`.${randclr}`);
    gameSeq.push(randclr);
    btnflash(randbtn);
    playSound(randclr);

}

//Checking the UserSeq and GameSeq
function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        document.getElementById("score").innerText = `High Score: ${Math.max(level - 1, +localStorage.getItem('hs') || 0)}`;
        localStorage.setItem('hs', Math.max(level - 1, +localStorage.getItem('hs') || 0));
        if (level > highScore) {          
            highScore = level - 1;
        }
        h2.innerHTML = `The Game is Over! Your Score is ${level} <br> Press any Key to Start Again!`;
        playGameOverSound(); 
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

   playSound(userclr);
   checkAns(userSeq.length -1);
}  


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

document.getElementById("muteBtn").addEventListener("click", function() {
    muted = !muted;
    this.innerText = muted ? "🔇" : "🔊";
})

function playSound(color) {
    if (muted) return;
    const freq = { red: 261.6, yellow: 329.6, green: 392.0, blue: 466.2 };
    let ctx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = ctx.createOscillator();
    let gain = ctx.createGain();
    osc.frequency.value = freq[color];
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
}

function playGameOverSound() {
    if (muted) return;
    let ctx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = ctx.createOscillator();
    let gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
}

function playStartSound() {
    if (muted) return;
    let ctx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = ctx.createOscillator();
    let gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
}