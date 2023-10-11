'use strict';

let gameMoveState = 'not selected';
let tubeA;
let tubeB;
let curLevel = 1;

function removeChilds(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild);   
  }
}

class Game {
  constructor(level) {
    this.level = level;
    this.tubesColors = [];
    this.tubes = [];
    this.steps = 0;
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
      tube = layers.map((layer) => layer[index]);
      return tube
    });
    this.tubesColors = tubes;
  }

  renderTubes(){
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
    if (this.level == 2 || this.level == 3) {
      tubes.childNodes[tubes.childNodes.length - 1].classList.add('tube-hidden');
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
    return tubes;
  }
}

const newGame = new Game(1);
newGame.generateLiquid();
newGame.renderTubes();
