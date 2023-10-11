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
                      jet.style.left = locB.x + gameContainer.getBoundingClientRect().left + 15 + 'px';
                      jet.style.top = locB.y + gameContainer.getBoundingClientRect().top - 18 + 'px';
                      this.tubes[tubeA].tube.style.transform = `${angle}`;  
                      let freeSpace = 4 - this.tubes[tubeB].colors.length;
                      let moovingLayers = layerToPour(this.tubes[tubeA].colors, freeSpace);
                      const pourSound = new Audio;
                      pourSound.src = './sounds/pour.wav';
                      jet.classList.add(moovingLayers[0].dataColor);
                      let cloneLayers = moovingLayers.map((layer) => {
                        let clone = layer.cloneNode();
                        clone.dataColor = moovingLayers[0].dataColor;
                        //here functio for bubbles
                        return clone;
                      });
                      moovingLayers.forEach((layer) => {
                        layer.classList.add('color-decrease');
                        setTimeout(() => {layer.remove();}, 1000);
                      });
                      setTimeout(() => {
                        gameContainer.prepend(jet);
                        pourSound.play();
                      },250);
                      this.tubes[tubeB].tube.prepend(...cloneLayers);
                      this.tubes.forEach((tube) => {
                        tube.tube.classList.add('tube-locked');
                      });
                      setTimeout(() => {
                        jet.remove();
                        resolve('Poured!');
                        this.tubes[tubeA].colors = Array.from(this.tubes[tubeA].tube.childNodes);
                        this.tubes[tubeB].colors = Array.from(this.tubes[tubeB].tube.childNodes);   
                      }, 1400);
                    });
                    pourTubeB.then(() => {
                      this.steps +=1;
                      if(checkTubes(this.tubes)){
                        console.log(`Completed in ${this.steps} moves`);
                        //Add function for win event
                      }
                      this.tubes[tubeA].tube.classList.remove('tube-locked');
                      this.tubes[tubeB].tube.classList.remove('tube-locked');
                      this.tubes[tubeA].tube.classList.remove(`tube-pour-${tubeB + 1}`);
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

const newGame = new Game(2);
newGame.generateLiquid();
newGame.renderTubes();
