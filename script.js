/**
 */
const leftBank = document.getElementById("left-bank");
const rightBank = document.getElementById("right-bank");
const leftRiver = document.getElementById("left-river");
const rightRiver = document.getElementById("right-river");
const boatArea = document.getElementById("boat-area");
const boat = document.getElementById("boat");
const sheep1 = document.getElementById("sheep1");
const sheep2 = document.getElementById("sheep2");
const sheep3 = document.getElementById("sheep3");
const wolf1 = document.getElementById("wolf1");
const wolf2 = document.getElementById("wolf2");
const wolf3 = document.getElementById("wolf3");


// ボート羊狼の状態書き換え

const sheepWolfState = (object, state) => {
  const objectChildren = object.children;
  for (const key in objectChildren) {
    console.log(key, "obj:", objectChildren[key].classList);
    if (objectChildren[key].classList === undefined) { continue };
    if (state === "right") {
      objectChildren[key].classList.replace("left", "right");
    } else {
      objectChildren[key].classList.replace("right", "left");
    }
  }
}

// boatを移動させる関数

const moveBoat = () => {
  if (boatArea.classList.contains("left")) {
    leftRiver.removeChild(boatArea);
    rightRiver.appendChild(boatArea);
    boatArea.classList.replace("left", "right");
    sheepWolfState(boatArea, "right");
  } else {
    rightRiver.removeChild(boatArea);
    leftRiver.appendChild(boatArea);
    boatArea.classList.replace("right", "left");
    sheepWolfState(boatArea, "left");
  }
}

// boatに羊か狼を乗せる関数

const addPassenger = (passenger) => {
  if (boatArea.children.length <= 2 && boatArea.classList.contains("left")) {
    if (passenger.classList.contains("left")) {
      leftBank.removeChild(passenger);
      boatArea.appendChild(passenger);
    }
  } else if (boatArea.children.length <= 2 && boatArea.classList.contains("right")) {
    if (passenger.classList.contains("right")) {
      rightBank.removeChild(passenger);
      boatArea.appendChild(passenger);
    }
  }
}

// boatから羊か狼を降ろす関数
// 降ろした際クリアチェックも行う

const removePassenger = (passenger) => {
  if (boatArea.classList.contains("left")) {
    boatArea.removeChild(passenger);
    leftBank.appendChild(passenger);
  } else if (boatArea.classList.contains("right")) {
    boatArea.removeChild(passenger);
    rightBank.appendChild(passenger);
  }
}

// ゲームが終わっているかチェックする関数

const checkGame = () => {
  console.log("checkGame");
  const leftSheep = document.querySelectorAll(".left.sheep").length;
  const leftWolfs = document.querySelectorAll(".left.wolf").length;
  const rightSheep = document.querySelectorAll(".right.sheep").length;
  const rightWolfs = document.querySelectorAll(".right.wolf").length;

  if (leftSheep > 0 && leftWolfs > leftSheep) {
    alert("羊が狼に食べられてしまいました。");
    location.reload();
  } else if (rightSheep > 0 && rightWolfs > rightSheep) {
    alert("羊が狼に食べられてしまいました。");
    location.reload();
  } else if (rightSheep === 3 && rightWolfs === 3) {
    console.log("クリア！");
  }
}


// クリック時の動作用ボート乗降関数（羊・狼共通)

const boardingDecision = (passenger) => {
  if (!(boatArea.contains(passenger))) {
    addPassenger(passenger);
  }
  else {
    removePassenger(passenger);
  }
}

//　クリック動作

boat.addEventListener("click", () => {
  if (boatArea.children.length >= 2) {
    moveBoat();
    checkGame();
  } else {
    alert("ボートに誰も乗っていません");
  };
});

sheep1.addEventListener("click", () => { boardingDecision(sheep1) });
sheep2.addEventListener("click", () => { boardingDecision(sheep2) });
sheep3.addEventListener("click", () => { boardingDecision(sheep3) });
wolf1.addEventListener("click", () => { boardingDecision(wolf1) });
wolf2.addEventListener("click", () => { boardingDecision(wolf2) });
wolf3.addEventListener("click", () => { boardingDecision(wolf3) });
