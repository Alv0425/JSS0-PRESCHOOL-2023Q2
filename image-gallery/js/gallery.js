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

//4. 
function filterOrientation(img) {
  img.classList.add('img-hide');
  if (img.dataOrientation == 'landscape' && orientationLandscapeRadio.checked) {
    img.classList.remove('img-hide');
  }
  if (img.dataOrientation == 'portrait' && orientationPortraitRadio.checked) {
    img.classList.remove('img-hide');
  }
  if (img.dataOrientation == 'squarish' && orientationSquareRadio.checked) {
    img.classList.remove('img-hide');
  }
}


async function getDataUnsplash(query) {
  body.append(loadingIcon);
  gallery.classList.add('gallery-hide');
  const urlLandscape = `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=${numberImgs}&client_id=${UNSPLASH_ID}`;
  const urlPortrait = `https://api.unsplash.com/search/photos?query=${query}&orientation=portrait&per_page=${numberImgs}&client_id=${UNSPLASH_ID}`;
  const urlSquarish = `https://api.unsplash.com/search/photos?query=${query}&orientation=squarish&per_page=${numberImgs}&client_id=${UNSPLASH_ID}`;
  const resLandscape = await fetch(urlLandscape);
  const resPortrait = await fetch(urlPortrait);
  const resSquarish = await fetch(urlSquarish);
  const dataLandscape = await resLandscape.json();
  const dataPortrait = await resPortrait.json();
  const dataSquarish = await resSquarish.json();
  function setUnsplashImages(data) {
    let imgs = [];
    for (let i=0; i < data.results.length; i++){
      let img = document.createElement('img');
      img.src = data.results[i].urls.regular;
      img.alt = data.results[i]['alt_description'];
      img.dataDescription = data.results[i]['description'] ? data.results[i]['description'] : data.results[i]['alt_description'];
      img.dataAuthor = data.results[i].user.name ? data.results[i].user.name : 'anonymous';
      img.dataDate = getCreationDate(data.results[i]['created_at']);
      img.dataLocation = data.results[i].user.location;
      img.dataInstagram = data.results[i].user['instagram_username'];
      img.dataSource = 'unsplash';
      if (img.src) {
        imgs.push(img);
      } 
    }
    return imgs;
  }
  const imagesLandscape = setUnsplashImages(dataLandscape);
  imagesLandscape.forEach((img) => {
    img.dataOrientation = 'landscape';
  });
  const imagesPortrait = setUnsplashImages(dataPortrait);
  imagesPortrait.forEach((img) => {
    img.dataOrientation = 'portrait';
  });
  const imagesSquarish = setUnsplashImages(dataSquarish);
  imagesSquarish.forEach((img) => {
    img.dataOrientation = 'squarish';
  });
  imagesUnsplash = imagesLandscape.concat(imagesPortrait, imagesSquarish);
  console.log(imagesUnsplash);
  imagesUnsplash.forEach((img) => {
    filterOrientation(img);
  });
  let promises = imagesUnsplash.map((img) => {
    return new Promise((resolve) => {
      img.addEventListener('load', () => {
        resolve('loaded');
      });
      img.addEventListener('error', () => {
        resolve('not loaded');
      });
    });
  });
  let images = sortImages(imagesUnsplash);
  console.log(images);
  Promise.all(promises).then(() => {
    console.log('all images loaded');
    loadingIcon.remove();
    gallery.classList.remove('gallery-hide');
  });
  if (!imagesUnsplash.length) {
    console.log('Nothing was found on Unsplash');
    errorMessage.textContent = 'Nothing was found on Unsplash';
    gallery.before(errorMessage);
  }
  setTimeout(() => {
    images.forEach((colImgs, index) => {
      cols[index].append(...colImgs);
    });  
  },1000);
  setTimeout(() => {
    loadingIcon.remove();
    gallery.classList.remove('gallery-hide');
  },5000);
}

async function searchUnsplash(query) {
  try {
    await getDataUnsplash(query);
  } catch(e) {
    if (e.message.includes('Rate Limit')){
      errorMessage.style.color = '#000';
      errorMessage.textContent = 'Try later';
      gallery.before(errorMessage);
    }
    loadingIcon.remove();
    gallery.classList.remove('gallery-hide');
  }
}

searchUnsplash('summer');