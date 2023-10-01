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
  headerSearchInput.focus();
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

//4. Filler for orientation
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

//5. Download images function
async function downloadImage(img) {
  const image = await fetch(img.src);
  const imageBlob = await image.blob();
  const imageHref = URL.createObjectURL(imageBlob);
  const link = document.createElement('a');
  link.href = imageHref;
  link.download = img.alt;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(imageHref);
}

function setOrientationAttributes(imagesLandscape, imagesPortrait, imagesSquarish){
  imagesLandscape.forEach((img) => {
    img.dataOrientation = 'landscape';
    img.classList.add('img-landscape');
  });
  imagesPortrait.forEach((img) => {
    img.dataOrientation = 'portrait';
    img.classList.add('img-portrait');
  });
  imagesSquarish.forEach((img) => {
    img.dataOrientation = 'squarish';
    img.classList.add('img-squarish');
  });
}

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
    img.addEventListener('click', (event) => {
      showImageModal(event, img);
    });
    if (img.src) {
      imgs.push(img);
    } 
  }
  return imgs;
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
  const imagesLandscape = setUnsplashImages(dataLandscape);
  const imagesPortrait = setUnsplashImages(dataPortrait);
  const imagesSquarish = setUnsplashImages(dataSquarish);
  setOrientationAttributes(imagesLandscape, imagesPortrait, imagesSquarish);
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

function setFlickrImages(data) {
  let imgs = [];
  for (let i=0; i < data.photos.photo.length; i++){
    let img = document.createElement('img');
    img.src = data.photos.photo[i]['url_m'];
    img.alt = data.photos.photo[i].title;
    img.dataDescription = data.photos.photo[i].title;
    img.dataAuthor = data.photos.photo[i].ownername;
    img.dataDate = getCreationDate(data.photos.photo[i].datetaken);
    img.dataFlickr = data.photos.photo[i].pathalias;
    img.dataSourse = 'flickr';
    img.addEventListener('click', (event) => {
      showImageModal(event, img);
    });
    if (img.src) {
      imgs.push(img);
    } 
  }
  return imgs;
} 

async function getDataFlickr(query) {
  body.append(loadingIcon);
  gallery.classList.add('gallery-hide');
  const urlLandscape = `https://www.flickr.com/services/rest/?method=flickr.photos.search&dc:camera=canon&sort=interestingness-desc&privacy_filter=1&orientation=landscape&content_type=1&per_page=${numberImgs}&api_key=${FLICKR_ID}&tags=${query},canon&tag_mode=all&extras=url_m,owner_name,description,date_taken,geo,media,path_alias,brand&format=json&nojsoncallback=1`;
  const urlPortrait = `https://www.flickr.com/services/rest/?method=flickr.photos.search&dc:camera=canon&sort=interestingness-desc&privacy_filter=1&orientation=portrait&content_type=1&per_page=${numberImgs}&api_key=${FLICKR_ID}&tags=${query},canon&tag_mode=all&extras=url_m,owner_name,description,date_taken,geo,media,path_alias,brand&format=json&nojsoncallback=1`;
  const urlSquarish = `https://www.flickr.com/services/rest/?method=flickr.photos.search&dc:camera=canon&sort=interestingness-desc&privacy_filter=1&orientation=square&content_type=1&per_page=${numberImgs}&api_key=${FLICKR_ID}&tags=${query},canon&tag_mode=all&extras=url_m,owner_name,description,date_taken,geo,media,path_alias,brand&format=json&nojsoncallback=1`;
  const resLandscape = await fetch(urlLandscape);
  const dataLandscape = await resLandscape.json();
  const resPortrait= await fetch(urlPortrait);
  const dataPortrait = await resPortrait.json();
  const resSquarish = await fetch(urlSquarish);
  const dataSquarish = await resSquarish.json();
  const imagesLandscape = setFlickrImages(dataLandscape);
  const imagesPortrait = setFlickrImages(dataPortrait);
  const imagesSquarish = setFlickrImages(dataSquarish);
  setOrientationAttributes(imagesLandscape, imagesPortrait, imagesSquarish);

  imagesFlickr = imagesLandscape.concat(imagesPortrait, imagesSquarish);
  console.log(imagesFlickr);
  let imagesToDelete = [];
  let promises = imagesFlickr.map((img) => {
    return new Promise((resolve) => {
      img.addEventListener('load', () => {
        resolve('loaded');
      });
      img.addEventListener('error', () => {
        resolve('not loaded');
        imagesToDelete.push(img);
      })
    });
  });
  console.log(imagesToDelete);
  imagesFlickr.forEach((img) => {
    filterOrientation(img);
  });
  let images = sortImages(imagesFlickr);
  Promise.all(promises).then(() => {
    console.log('all images loaded');
    loadingIcon.remove();
    gallery.classList.remove('gallery-hide');
    images = images.filter((img) => !imagesToDelete.includes(img));
    images.forEach((colImgs, index) => {
      cols[index].append(...colImgs);
    });  
    imagesToDelete.forEach((img) => {
      img.remove();
    });
  });
  if (!imagesFlickr.length) {
    console.log('Nothing was found on Unsplash');
    errorMessage.textContent = 'Nothing was found on Flickr';
    gallery.before(errorMessage);
  }
  
  
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

async function searchFlickr(query){
  try {
    await getDataFlickr(query);
  } catch {
    console.log('Nothing was found on Flickr');
    loadingIcon.remove();
    gallery.classList.remove('gallery-hide');
  }
}

//Overlay image modal
closeButton.addEventListener('click', () => {
  removeChilds(overlay);
  overlay.remove();
  body.classList.remove('body-lock');
  gallery.classList.remove('gallery-hide');
});

function setPosition(image){
  if (body.clientWidth > 648) {
    image.style.left = '0';
    image.style.top = '0';
    let height = `${overlay.clientHeight}px`;
    image.style.width = '50%';
    image.style.height = height;
  } else {
    let height = `${overlay.clientHeight / 2}px`;
    image.style.top = `40px`;
    image.style.left = `0`;
    image.style.width = '100%';
    image.style.height = height;
  }
}

function showImageModal(event, img) {
  body.append(overlay);
        body.classList.add('body-lock');
        let imgDuplicate = document.createElement('div');
        imgDuplicate.className = 'image-modal-small';
        imgDuplicate.style.left = `${event.clientX - event.offsetX}px`;
        imgDuplicate.style.top = `${event.clientY - event.offsetY}px`;
        imgDuplicate.style.width = img.clientWidth + 'px';
        imgDuplicate.style.height = img.clientHeight + 'px';
        imgDuplicate.style.backgroundImage = `url(${img.src})`;
        overlay.append(imgDuplicate);
        setTimeout(() => {
          setPosition(imgDuplicate);
          const downloadButton = document.createElement('a');
          downloadButton.className = 'download-button';
          overlay.append(closeButton, downloadButton);
          downloadButton.onclick = (event) => {
            event.preventDefault();
            downloadImage(img, downloadButton);
          }
          gallery.classList.add('gallery-hide');
          let info = document.createElement('div');
          info.className = 'info-modal-small';
          let infoDescription = document.createElement('div');
          infoDescription.className = 'info-modal-small__description';
          let infoAuthor = document.createElement('div');
          infoAuthor.className = 'info-modal-small__author';
          let infoDate = document.createElement('div');
          infoDate.className = 'info-modal-small__creation-date';
          overlay.append(info);
          info.append(infoDescription, infoAuthor, infoDate);
          if (img.dataInstagram) {
            let infoInstagram = document.createElement('div');
            infoInstagram.className = 'info-modal-small__instagram';
            infoInstagram.innerHTML = `<a href="https://www.instagram.com/${img.dataInstagram}" target="_blank">${img.dataInstagram}</a>`;
            info.append(infoInstagram);
          }
          if (img.dataLocation) {
            let infoLocation = document.createElement('div');
            infoLocation.className = 'info-modal-small__location';
            infoLocation.textContent = img.dataLocation;
            info.append(infoLocation);
          }
          if (img.dataFlickr) {
            let infoFlickr = document.createElement('div');
            infoFlickr.className = 'info-modal-small__flickr';
            infoFlickr.innerHTML = `<a href="https://www.flickr.com/photos/${img.dataFlickr}" target="_blank">${img.dataFlickr}</a>`;
            info.append(infoFlickr);
          }
          infoDescription.textContent = img.dataDescription;
          infoAuthor.textContent = img.dataAuthor;
          infoDate.textContent = img.dataDate;
        },100);
        console.log(img.clientHeight);
}

function submitForm() {
  if (headerSearchInput.value.trim()) {
    errorMessage.remove();
    cols.forEach((col) => {
    removeChilds(col);
    });
    console.log(headerSearchInput.value);
    if (sourceUnsplashRadio.checked) {
      searchUnsplash(headerSearchInput.value);
    } else if (sourceFlickrRadio.checked) {
      searchFlickr(headerSearchInput.value);
    }
    filterButton.classList.remove('header__filter-button-rot');
    searchFilter.classList.remove('search__filter-show');
    body.classList.remove('body-lock'); 
  }
}

headerSeachContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  submitForm();
});

sourceUnsplashRadio.oninput = () => {
  submitForm();
}

sourceFlickrRadio.oninput = () => {
  submitForm();
}

function filterOrientationApply(){
  let images = document.querySelectorAll('img');
  images.forEach((img) => {
    filterOrientation(img);
  });
}

orientationLandscapeRadio.oninput = () => {filterOrientationApply();}
orientationPortraitOption.oninput = () => {filterOrientationApply();}
orientationSquareOption.oninput = () => {filterOrientationApply();}

searchUnsplash('wind');