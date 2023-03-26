/**
 * 定数の宣言
 */
const leftBank = document.getElementById("left-bank");
const rightBank = document.getElementById("right-bank");
const leftRiver = document.getElementById("left-river");
const rightRiver = document.getElementById("right-river");
const boatArea = document.getElementById("boat-area");
const boat = document.getElementById("boat");
const boatButton = document.getElementById("boat-button");
const sheep1 = document.getElementById("sheep1");
const sheep2 = document.getElementById("sheep2");
const sheep3 = document.getElementById("sheep3");
const wolf1 = document.getElementById("wolf1");
const wolf2 = document.getElementById("wolf2");
const wolf3 = document.getElementById("wolf3");
const moveCountElement = document.getElementById("move-count");

/**
 * 変数の宣言
 */
let moveCount = 0;

/**
 * boatを移動させる際、乗客の状態を変更する関数
 * @param {object} boatObject - 比較する値
 * @param {string} state - 行く方向（left or right)
 */
const sheepWolfState = (boatObject, state) => {
  const objectChildren = boatObject.children;
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

/**
 * boatを移動させる関数　移動回数もカウント
 */
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
  moveCount++;
  moveCountElement.innerText = moveCount;
}

/**
 * boatに羊か狼を乗せる関数
 * @param {object} passenger - 乗客のHTML要素
 */
const addPassenger = (passenger) => {
  if (boatArea.children.length > 2) {
    alert("ボートには２匹までしか載せれません");
    return;
  }
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

/**
 * 岸上の羊と狼の順番をソートする関数
 * @param {object} liverSide - ソートする岸のHTML要素
 */
const sortPassengers = liverSide => {
  let childElements = liverSide.children;
  const idList = [];
  for (let i = 0; i < childElements.length; i++) {
    idList.push(childElements[i].id);
  }
  idList.sort();
  for (let i = 0; i < idList.length; i++) {
    let childElement = document.getElementById(idList[i]);
    liverSide.appendChild(childElement);
  }
}

/**
 * boatから羊か狼を降ろす関数
 * @param {object} passenger - 乗客のHTML要素
 */
const removePassenger = (passenger) => {

  if (boatArea.classList.contains("left")) {
    boatArea.removeChild(passenger);
    leftBank.appendChild(passenger);
    sortPassengers(leftBank);
  } else if (boatArea.classList.contains("right")) {
    boatArea.removeChild(passenger);
    rightBank.appendChild(passenger);
    sortPassengers(rightBank);
  }

}

/**
 * 同期wait関数
 */
const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * ゲーム終了チェック関数
 */
const checkGame = async () => {
  await wait(100); // すぐにチェックすると移動が完了しないためwait
  const leftSheep = document.querySelectorAll(".left.sheep").length;
  const leftWolfs = document.querySelectorAll(".left.wolf").length;
  const rightSheep = document.querySelectorAll(".right.sheep").length;
  const rightWolfs = document.querySelectorAll(".right.wolf").length;

  if (leftSheep > 0 && leftWolfs > leftSheep) {
    alert("左側の羊が狼に食べられてしまいました。");
    location.reload();
  } else if (rightSheep > 0 && rightWolfs > rightSheep) {
    alert("右側の羊が狼に食べられてしまいました。");
    location.reload();
  } else if (rightSheep === 3 && rightWolfs === 3) {
    if (moveCount === 11) {
      alert(`クリア！ おめでとうございます\n\nあなたの移動回数は${moveCount}回でした！\nパーフェクトクリアです！`);
    } else {
      alert(`クリア！ おめでとうございます\n\nあなたの移動回数は${moveCount}回でした！\n次は最小移動回数を目指しましょう！`);
    }
    location.reload();
  }
}

/**
 * 乗客クリック時の動作関数
 * @param {object} passenger - 乗客のHTML要素
 */
const passengerClickAction = (passenger) => {
  if (!(boatArea.contains(passenger))) {
    addPassenger(passenger);
  }
  else {
    removePassenger(passenger);
  }
}

/**
 * ボートクリック時の動作関数
 */
const boatClickAction = () => {
  if (boatArea.children.length >= 2) {
    moveBoat();
    checkGame();
  } else {
    alert("ボートに誰も乗っていません");
  };
}

/**
 * HTML要素クリック時の動作関数（ボート）
 */
boatButton.addEventListener("click", () => { boatClickAction() });

/**
 * HTML要素クリック時の動作関数（羊と狼）
 */
sheep1.addEventListener("click", () => { passengerClickAction(sheep1) });
sheep2.addEventListener("click", () => { passengerClickAction(sheep2) });
sheep3.addEventListener("click", () => { passengerClickAction(sheep3) });
wolf1.addEventListener("click", () => { passengerClickAction(wolf1) });
wolf2.addEventListener("click", () => { passengerClickAction(wolf2) });
wolf3.addEventListener("click", () => { passengerClickAction(wolf3) });
