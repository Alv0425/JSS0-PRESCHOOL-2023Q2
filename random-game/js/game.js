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