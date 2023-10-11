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

}
