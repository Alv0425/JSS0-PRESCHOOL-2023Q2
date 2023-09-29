'use strict';
let imagesUnsplash = [];
let imagesFlickr = [];

//Open-close filter menu
filterButton.addEventListener('click', () => {
  filterButton.classList.toggle('header__filter-button-rot');
  searchFilter.classList.toggle('search__filter-show');
  body.classList.toggle('body-lock');
});

document.addEventListener('click', (event) => {
  if (!filterButton.contains(event.target) && !searchFilter.contains(event.target) && !searchContainer.contains(event.target)){
    filterButton.classList.remove('header__filter-button-rot');
    searchFilter.classList.remove('search__filter-show');
    body.classList.remove('body-lock');
  }
});

//Reset button in search form
headerSearchInput.onkeyup = () => {
  if (headerSearchInput.value) {
    headerSearchButton.disabled = false;
  } else {
    headerSearchButton.disabled = true;
  }
}

headerSearchButton.onclick = (event) => {
  event.preventDefault();
  headerSearchInput.value = '';
  headerSearchButton.disabled = true;
}

//Auxiliary functions
//1. Removes all childs of node
function removeChilds(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild);   
  }
}

//2. Distributes all images among four columns of gallery grid
function sortImages(arrImages) {
  let arrFour = [[],[],[],[]];
  let j = 0;
  while (j < arrImages.length) {
    for (let i=0; i<4; i++){
      arrFour[i].push(arrImages[j]);
      j += 1;
    }
  }
  return arrFour.map((col) => {return col.sort(() => Math.random() - 0.5);});
}

//3. Converts creation date from JSON data of Unsplash and Flickr response to human-readable form
function getCreationDate(str) {
  if (str.length === 20 || str.length === 19) {
    let year = str.slice(0,4);
    let month = str.slice(5,7);
    let day = str.slice(8,10);
    return `${day}.${month}.${year}`;
  }
}
