let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];
document.addEventListener("keypress", () => {
  if (started === false) {
    console.log("game start");
    started = true;
    levelUp();
  }
});
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
}
function playGameSequence() {
  let i = 0;
  let interval = setInterval(() => {
    let currentColor = gameSeq[i];
    let currentButton = document.querySelector(`.${currentColor}`);
    gameFlash(currentButton);
    i++;
    if (i >= gameSeq.length) {
      clearInterval(interval);
    }
  }, 600);
}
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randomIndex = Math.floor(Math.random() * btns.length);
  let randomColor = btns[randomIndex];
  let randomBtn = document.querySelector(`.${randomColor}`);
  //   console.log(randomBtn);
  //   console.log(randomIndex);
  //   console.log(randomColor);
  gameSeq.push(randomColor);
  // console.log(gameSeq);
  // gameFlash(randomBtn);
  playGameSequence();
}

function checkIsColorMatching(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    console.log("same");
    if (userSeq.length === gameSeq.length) {
      setTimeout(() => {
        levelUp();
      }, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b> <br/> press any key to start again.`;
    document.querySelector("body").style.backgroundColor = "red";
    // document.querySelector("body").style.color = "white";
    // document.querySelector("body").style.backgroundColor = "black";
    setTimeout(() => {
      document.querySelector("body").style.color = "white";
      document.querySelector("body").style.backgroundColor = "black";
    }, 150);
    reset();
  }
}
function btnPress() {
  // console.log("btn pressed");
  // console.log(this);
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  // console.log(userColor);
  userSeq.push(userColor);
  checkIsColorMatching(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
// console.log(allBtns);
for (const btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];

  // document.querySelector("body").style.backgroundColor = "black";
  // document.querySelector("body").style.color = "white";
}
