'use strict';
let gameMoveState = 'not selected';
let tubeA;
let tubeB;
let curGame;
let curLevel = 2;

function removeChilds(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild);   
  }
}


class GameStat {
  constructor(){
    this.level = curLevel;
    this.gamesList = [];
  }
}

const currentStat = new GameStat;

class Game {
  constructor(level) {
    this.level = level;
    this.tubesColors = [];
    this.tubes = [];
    this.steps = 0;
    this.points = 0;
    this.hidden = 0;
    this.disorder = 0;
    this.time = '';
  }

  generateLiquid(){
    let tubes = [];
    let num = 2*this.level;
    for (let i = 0; i < num + 1; i++){
      let color = COLORS[i];
      tubes.push([color,color,color,color]);
    }
    let layers = [];
    for (let i = 0; i < 4; i++){
      layers.push(tubes.map((tube) => tube[0]).sort(() => Math.random() - 0.5));
    }
    tubes = tubes.map((tube, index) =>{ 
      tube = layers.map((layer) => layer[index]).sort(() => Math.random() - 0.5);
      return tube;
    });
    this.tubesColors = tubes;
  }

  renderTubes(){
    gameContainer.append(gameSettings);
    let start = new Date();
    let timer = 0;
    const timerFunction = () => {
      timer +=1;
      this.time = convertTime(timer);
    }
    let newInterval = setInterval(timerFunction, 1000);
    curGame = this;
    removeChilds(tubes);
    tubes.className =`lvl-${this.level}`;
    this.tubesColors.forEach((portion) => {
      let tube = document.createElement('div');
      tube.className = 'tube';  
      tube.classList.add('tube-static');
      portion.forEach((color) => {
        let layer = document.createElement('div');
        layer.className = 'color';
        layer.classList.add(color);
        layer.dataColor = color;
        tube.append(layer);
      });
      tubes.append(tube);  
    });
    for (let i = 0; i < Math.ceil((19/64)*((this.level * 2) + 1)); i++) {
      let tube = document.createElement('div');
      tube.className = 'tube';  
      tubes.append(tube);
      tube.classList.add('tube-static');
    }
    plusTubeButton.classList.add('button-hidden');
    plusTubeButton.classList.remove('button-disabled');
    if (this.level == 1){
      let tube = document.createElement('div');
      tube.className = 'tube';  
      tubes.append(tube);
      tube.classList.add('tube-static');
    }
    if (this.level == 3 || this.level == 4) {
      plusTubeButton.classList.remove('button-hidden');
      tubes.childNodes[tubes.childNodes.length - 1].classList.add('tube-hidden');
      this.hidden = 1;
    }
    gameContainer.append(tubes);
    const allTubes = tubes.childNodes;
    this.tubes = Array.from(allTubes).map((tube) => {
      let tubeObj = {
        'tube': tube,
        'colors': Array.from(tube.childNodes),
        'X': tube.getBoundingClientRect().left - gameContainer.getBoundingClientRect().left,
        'Y': tube.getBoundingClientRect().top - gameContainer.getBoundingClientRect().top,  
      }
      return tubeObj;
    });
    if (checkTubes(this.tubes)) {
      this.generateLiquid();
      this.renderTubes();
    }
    this.disorder = calculateDisorder(this.tubes, this.level);
    scoreLabel.textContent = `points: ${this.points}`;
    movesLabel.textContent = `moves: ${this.steps}`;
    //add event listener for all tubes
    allTubes.forEach((tube, index) => {
      tube.addEventListener('click', () => {
        switch(gameMoveState) {
          case 'not selected':
            selectTube(tube, index);
            break;
          case 'selected':
            tubeB = index;
            if (this.tubes[tubeB].colors.length == 0 || this.tubes[tubeB].colors.length < 4){
              if (tubeA !== tubeB) {
                let colorA = this.tubes[tubeA].colors[0] ? this.tubes[tubeA].colors[0].dataColor : 'transparent';
                let colorB = this.tubes[tubeB].colors[0] ? this.tubes[tubeB].colors[0].dataColor : 'transparent';
                if (colorA == 'transparent') {
                  this.tubes[tubeA].tube.classList.remove('tube-selected');
                  selectTube(tube, index);
                  break;
                }
                if (colorA !== colorB && colorB !== 'transparent') {
                  this.tubes[tubeA].tube.classList.remove('tube-selected');
                  selectTube(tube, index);
                  break;
                }
                if (colorA == colorB || colorB == 'transparent'){
                  const moveToTubeB = new Promise((resolve) => {
                    this.tubes[tubeA].tube.classList.add('tube-locked');
                    this.tubes[tubeB].tube.classList.add('tube-locked');
                    this.tubes[tubeA].tube.classList.add('tube-pour');
                    this.tubes[tubeA].tube.classList.add(`tube-pour-${tubeB + 1}`);
                    this.tubes[tubeA].tube.classList.remove('tube-static');
                    setTimeout(() => {
                      resolve('tube is moved');
                    }, 100);
                  });
                  moveToTubeB.then(() => {
                    const pourTubeB = new Promise((resolve) => {
                      let locA = {x:this.tubes[tubeA].X, y:this.tubes[tubeA].Y};
                      let locB = {x:this.tubes[tubeB].X, y:this.tubes[tubeB].Y};
                      this.tubes[tubeA].tube.style.transformOrigin = locB.x < 150 ? 'top left' : 'top right';
                      let angle = locB.x < 150 ? "rotate(-50deg) translateX(23px)" : "rotate(50deg) translateX(-23px)";
                      let jet = document.createElement('div');
                      jet.className = 'jet';
                      jet.style.left = locB.x  + 15 + 'px';
                      jet.style.top = locB.y - 15 + 'px';
                      this.tubes[tubeA].tube.style.transform = `${angle}`;  
                      let freeSpace = 4 - this.tubes[tubeB].colors.length;
                      let moovingLayers = layerToPour(this.tubes[tubeA].colors, freeSpace);
                      const pourSound = new Audio;
                      pourSound.src = './sounds/pour.wav';
                      jet.classList.add(moovingLayers[0].dataColor);
                      let cloneLayers = moovingLayers.map((layer) => {
                        let clone = layer.cloneNode();
                        clone.dataColor = moovingLayers[0].dataColor;
                        createBubbles(clone);
                        return clone;
                      });
                      moovingLayers.forEach((layer) => {
                        layer.classList.add('color-decrease');
                        setTimeout(() => {layer.remove();}, 1000);
                      });
                      setTimeout(() => {
                        gameContainer.prepend(jet);
                        pourSound.play();
                      },450);
                      this.tubes[tubeB].tube.prepend(...cloneLayers);
                      this.tubes.forEach((tube) => {
                        tube.tube.classList.add('tube-locked');
                      });
                      setTimeout(() => {
                        jet.remove();
                        resolve('Poured!');
                        this.tubes[tubeA].colors = Array.from(this.tubes[tubeA].tube.childNodes);
                        this.tubes[tubeB].colors = Array.from(this.tubes[tubeB].tube.childNodes);   
                      }, 1200);
                    });
                    pourTubeB.then(() => {
                      this.steps +=1;
                      calculatePoints(this);
                      scoreLabel.textContent = `points: ${this.points}`;
                      movesLabel.textContent = `moves: ${this.steps}`;
                      if(checkTubes(this.tubes)){
                        winGame(this);
                        updateGameStat(this);
                        updateScore();
                        clearInterval(newInterval);
                      }
                      this.tubes[tubeA].tube.classList.remove('tube-locked');
                      this.tubes[tubeB].tube.classList.remove('tube-locked');
                      this.tubes[tubeA].tube.classList.remove(`tube-pour-${tubeB + 1}`);
                      this.tubes[tubeA].tube.classList.remove('tube-pour');
                      this.tubes[tubeA].tube.classList.add(`tube-static`);
                      this.tubes[tubeA].tube.style.removeProperty('transform-origin');
                      this.tubes[tubeA].tube.style.removeProperty('transform');
                      setTimeout(() => {
                        this.tubes[tubeA].tube.classList.remove(`tube-selected`);
                        gameMoveState = 'not selected';
                        this.tubes.forEach((tube) => {
                          tube.tube.classList.remove('tube-locked');
                        });
                      },400);
                    });
                  });
                }
              } else {
                tube.classList.toggle('tube-selected');
                gameMoveState = 'not selected';
              }
            } else if (this.tubes[tubeB].colors.length == 4 || (this.tubes[tubeB].colors[0].dataColor !== this.tubes[tubeA].colors[0].dataColor)) {
              allTubes.forEach((tube) => {
                tube.classList.remove('tube-selected');
              });
              selectTube(tube, index);
              break;
            }
            break;
        }      
      });
    });
  }
}

function selectTube(tube, index) {
  tube.classList.add('tube-selected');
  tubeA = index;
  gameMoveState = 'selected';
  const pickSound = new Audio;
  pickSound.src = './sounds/pop.wav';
  pickSound.play().then(() => {
    pickSound.remove();
  });
  pickSound.volume = 0.2;
}

function layerToPour(arr, maxlength) {
  let max = maxlength;
  if (arr.length < maxlength) {
    max = arr.length;
  }
  let layerToPour = [];
  let array = arr.slice(0,max);
  let i = 0;
  if (array[0].dataColor) {
    while(array[0].dataColor == array[i].dataColor){
      layerToPour.push(array[i]);
      i++;
      if (!array[i]) {
        break;
      }
    }
  }
  return layerToPour;
}

function checkTubes(tubesList) {
  let newList = tubesList.filter((tube) => {
    return tube.colors.length !== 0;
  })
  return newList.reduce((accum, tube) => {
    return accum && tube.colors.length == 4 && tube.colors.reduce((accum, color) => {
      return accum && color.dataColor == tube.colors[0].dataColor;
    });
  });
}

function createBubbles(layer){
  const bubbles = document.createElement('div');
  bubbles.className = 'bubbles';
  for (let i = 0; i < 10; i++) {
    let bubble = document.createElement('div');
    bubble.style.backgroundColor = layer.dataColor;
    bubble.className = 'bubble';
    bubble.style.left = Math.random() * 30 + 'px';
    bubble.style.bottom = - Math.random() * 30 + 15 + 'px' ;
    let size = Math.random() * 5 + 'px';
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.animationDuration = 3 + Math.random() + 's';
    bubbles.append(bubble);
  }
  layer.append(bubbles);
}

if (localStorage.hasOwnProperty('gamesStatWaterSortPuzzle')){
  currentStat.level = JSON.parse(localStorage.gamesStatWaterSortPuzzle).level;
  currentStat.gamesList = JSON.parse(localStorage.gamesStatWaterSortPuzzle).gamesList;
  curLevel = currentStat.level;
  updateScore();
} else {
  const gameStat = new GameStat;
  localStorage.gamesStatWaterSortPuzzle = JSON.stringify(gameStat);
  gameHistory.append(gameRules);
}

const newGame = new Game(curLevel);
newGame.generateLiquid();
newGame.renderTubes();

function renderLevelsList(curLevel){
  switch(curLevel){
    case 1:
      gameLevelThree.classList.add('game__level-hidden');
      gameLevelFive.classList.remove('game__level-hidden');
      gameLevelSeven.classList.remove('game__level-hidden');
      gameLevelNine.classList.remove('game__level-hidden');
      gameLevelButton.textContent = '3 colors';
      break;
    case 2:
      gameLevelThree.classList.remove('game__level-hidden');
      gameLevelFive.classList.add('game__level-hidden');
      gameLevelSeven.classList.remove('game__level-hidden');
      gameLevelNine.classList.remove('game__level-hidden');
      gameLevelButton.textContent = '5 colors';
      break;
    case 3:
      gameLevelThree.classList.remove('game__level-hidden');
      gameLevelFive.classList.remove('game__level-hidden');
      gameLevelSeven.classList.add('game__level-hidden');
      gameLevelNine.classList.remove('game__level-hidden');
      gameLevelButton.textContent = '7 colors';
      break;
    case 4:
      gameLevelThree.classList.remove('game__level-hidden');
      gameLevelFive.classList.remove('game__level-hidden');
      gameLevelSeven.classList.remove('game__level-hidden');
      gameLevelNine.classList.add('game__level-hidden');
      gameLevelButton.textContent = '9 colors';
      break;
  }
}

renderLevelsList(curLevel);

function playNewGame(level) {
  const game = new Game(level);
  game.generateLiquid();
  game.renderTubes();
}

function openGame(level, colors){
  const game = new Game(level);
  game.tubesColors = colors;
  game.renderTubes();
}

gameLevelButton.onclick = () => {
  gameLevelList.classList.toggle('levels__list-show');
}

gameLevelThree.onclick = () => {
  curLevel = 1;
  playNewGame(curLevel);
  renderLevelsList(curLevel);
  gameLevelList.classList.toggle('levels__list-show');
}

gameLevelFive.onclick = () => {
  curLevel = 2;
  playNewGame(curLevel);
  renderLevelsList(curLevel);
  gameLevelList.classList.toggle('levels__list-show');
}

gameLevelSeven.onclick = () => {
  curLevel = 3;
  playNewGame(curLevel);
  renderLevelsList(curLevel);
  gameLevelList.classList.toggle('levels__list-show');
}

gameLevelNine.onclick = () => {
  curLevel = 4;
  playNewGame(curLevel);
  renderLevelsList(curLevel);
  gameLevelList.classList.toggle('levels__list-show');
}

function calculateDisorder(tubes, level){
  let length = 2*level + 1;
  let colors = COLORS.slice(0,length);
  let disorder = 0;
  colors.forEach((curColor) => {
    tubes.forEach((tubeObj) => {
      let arrColor = Array.from(tubeObj.colors).filter((color) => {
        return color.dataColor == curColor;
      });
      disorder += arrColor.length > 0 ? 1 : 0;
     });
  });
  return disorder + tubes.length - length;
}

function calculatePoints(game){
  let mult = 10 + game.hidden * 5;
  let curPoints = (game.disorder - calculateDisorder(game.tubes, game.level)) * mult;
  game.points += curPoints > 0 ? curPoints : 0;
  game.disorder = calculateDisorder(game.tubes, game.level);
}

repeatButton.onclick = () => {
  const colors = curGame.tubesColors;
  openGame(curLevel,colors);
}

function generateCircle(){
  body.append(overlay);
  let circles = [];
  for (let i = 0; i < 70; i++){
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.backgroundColor = COLORS[Math.round(Math.random()*5)];
    let x = Math.random() * 200 - 100 + 'px';
    let y =  Math.random() * 50 - 25 + 'px';
    circle.style.left = `calc(50% - 50px)`;
    circle.style.top = `calc(100%)`;
    circle.style.transform = `translateX(${x}) translateY(${y})`;
    let size = 10 + Math.random() * 45 + 'px';
    circle.style.transition = '1s';
    circle.style.width = size;
    circle.style.height = size;
    overlay.append(circle);
    circles.push(circle);    
    setTimeout(() => {
      let radius = 100 + (Math.random() * 80);
      let alpha = 3.14 * 2 * Math.random();
      x = Math.round(radius * Math.cos(alpha)) + 'px';
      y = radius * Math.sin(alpha) + 'px';
      circle.style.left = `calc(50% - 20px)`;
      circle.style.top = `calc(50% - 20px)`;
      circle.style.transform = `translateX(${x}) translateY(${y})`;
    },100);
  }
  return circles;
}

function winGame(game){
  removeChilds(overlay);
  let circles = generateCircle();
  const sound = new Audio;
  sound.src = './sounds/win.wav';
  sound.play().then(() => {
    sound.remove();
  });
  sound.volume = 0.3;
  const modal = document.createElement('div');
  modal.className = 'overlay__modal';
  let modalTitle = document.createElement('div');
  modalTitle.className = 'overlay__modal-title';
  modalTitle.textContent = `Completed in ${game.steps} water moves!`;
  let modalNote = document.createElement('div');
  modalNote.className = 'overlay__modal-note';
  modalNote.textContent = `points: ${game.points}, time: ${game.time}`;
  let newGameButton = document.createElement('button');
  newGameButton.className = 'overlay__modal-button';
  let newGameButtonText = document.createElement('span');
  newGameButton.append(newGameButtonText);
  newGameButtonText.textContent = 'new game';
  newGameButton.onclick = () => {
    removeChilds(gameContainer);
    const newGame = new Game(curLevel);
    newGame.generateLiquid();
    newGame.renderTubes();
    overlay.remove(); 
  }
  let repeatGameButton = document.createElement('button');
  repeatGameButton.className = 'overlay__modal-button';
  let repeatGameButtonText = document.createElement('span');
  repeatGameButton.append(repeatGameButtonText);
  repeatGameButtonText.textContent = 'repeat';
  repeatGameButton.onclick = () => {
    removeChilds(gameContainer);
    const newGame = new Game(curLevel);
    newGame.tubesColors = game.tubesColors;
    newGame.renderTubes();
    overlay.remove(); 
  }
  modal.append(modalTitle, modalNote, newGameButton, repeatGameButton);
  overlay.append(modal);  
}

plusTubeButton.onclick = () => {
  curGame.tubes[curGame.tubes.length - 1].tube.classList.remove('tube-hidden');
  curGame.hidden = 0;
  plusTubeButton.classList.add('button-disabled');
}

function updateGameStat(game) {
  let gameStat = JSON.parse(localStorage.gamesStatWaterSortPuzzle);
  gameStat.level = curLevel;
  gameStat.gamesList.push({
    'gameLevel': game.level,
    'gameColors': game.tubesColors,
    'gameScore' : game.points,
    'gameMoves' : game.steps,
    'gameTime' : game.time
  });
  localStorage.gamesStatWaterSortPuzzle = JSON.stringify(gameStat);
}

function updateScore() {
  gameRules.remove();
  if (JSON.parse(localStorage.gamesStatWaterSortPuzzle).gamesList.length == 0) {
    gameHistory.prepend(gameRules);
  }
  removeChilds(gameHistoryList);
  let gameStat = JSON.parse(localStorage.gamesStatWaterSortPuzzle);
  let gamesAll = gameStat.gamesList;
  let bestGames = gamesAll.sort((gameA, gameB) => {
    return (gameB.gameScore / gameB.gameMoves) - (gameA.gameScore / gameA.gameMoves);
  }); 
  if (bestGames.length > 10) {
    bestGames = bestGames.slice(0,10);
  }
  gameTopLabel.textContent = `Total Score: ${totalScore()}`;
  bestGames.forEach((gameObj) => {
    const gameItem = document.createElement('li');
    gameItem.onclick = () => {
      openGame(gameObj.gameLevel, gameObj.gameColors);
      gameHistory.classList.remove('game-history-show');
    }
    let colorsItem = document.createElement('span');
    colorsItem.textContent = `${gameObj.gameLevel * 2 + 1}`;
    colorsItem.title = 'colors';
    let movesItem = document.createElement('span');
    movesItem.textContent = `${gameObj.gameMoves}`;
    movesItem.title = 'moves';
    let pointsItem = document.createElement('span');
    pointsItem.textContent = `${gameObj.gameScore}`;
    pointsItem.title = 'points';
    gameItem.append(gameObj.gameTime,colorsItem,movesItem,pointsItem);
    gameHistoryList.append(gameItem);
  });
}

function convertTime(time){
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (time >= 60 * 60) {
  	hours = Math.floor(time / (60 * 60));
    time = time - hours * (60 * 60);
  }
  if (time >= 60) {
  	minutes = Math.floor(time / 60);
    time = time - minutes * 60;
  }
  seconds = time;  
  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

showHistory.onclick = () => {
  gameHistory.classList.toggle('game-history-show');
}

document.addEventListener('click', (event) => {
  if (!gameHistory.contains(event.target) && !showHistory.contains(event.target)) {
    gameHistory.classList.remove('game-history-show');
  }
});

showInfo.onclick = () => {
  removeChilds(overlay);
  body.append(overlay);
  overlay.append(infoModal);
}

infoModalClose.onclick = () => {
  infoModal.remove();
  overlay.remove();
}

resetBlockButton.onclick = () => {
  localStorage.removeItem('gamesStatWaterSortPuzzle');
  window.location.reload();
}

function totalScore(){
  let gamesStat = JSON.parse(localStorage.gamesStatWaterSortPuzzle);
  let gamescore = 0;
  gamesStat.gamesList.forEach((gameObj) => {
    gamescore += gameObj.gameScore;
  });
  return gamescore;
}