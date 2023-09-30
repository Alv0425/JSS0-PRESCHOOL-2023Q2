'use strict';
const UNSPLASH_ID = "bJvYFP0MTmzbRsB5kbOxG0pjTI0iLFJTb1RpBxxIFVI";
const FLICKR_ID = "2628d8a4cc403148d8ed6297993ddcbb";

const numberImgs = 12;

const body = document.getElementsByTagName('body')[0];
const loadingIcon = document.createElement('div');
loadingIcon.className = 'loading-icon';
const cols = [];
for (let i = 0; i < 4; i++){
  let col = document.createElement('div');
  col.className = 'gallery__col';
  cols.push(col);
}
const gallery = document.createElement('div');
gallery.className = 'gallery';
gallery.append(...cols);

const header = document.createElement('header');
header.className = 'header';

const headerSeachContainer = document.createElement('FORM');
headerSeachContainer.className = 'header__search';
const searchContainer = document.createElement('div');
searchContainer.className = 'search__container';
const headerSearchForm = document.createElement('FIELDSET');
headerSearchForm.className = 'search__form';
const searchIcon = document.createElement('button');
searchIcon.type = 'submit';
searchIcon.className = 'search__icon';
const headerSearchInput = document.createElement('INPUT');
headerSearchInput.autofocus = true;
headerSearchInput.className = 'search__input';
headerSearchInput.type = 'text';
headerSearchInput.placeholder = 'summer';
const headerSearchButton = document.createElement('button');
headerSearchButton.className = 'cross__button';
headerSearchButton.disabled = true;
const filterButton= document.createElement('button');
filterButton.className = 'header__filter-button';
filterButton.type = 'button';

const searchFilter = document.createElement('div');
searchFilter.className = 'search__filter';
const sourceFilter = document.createElement('div');
sourceFilter.className = 'search__filter-source';
const sourceUnsplashOption = document.createElement('div');
sourceUnsplashOption.className = 'filter__option';
const sourceFlickrOption = document.createElement('div');
sourceFlickrOption.className = 'filter__option';
const sourceUnsplashRadio = document.createElement('INPUT');
sourceUnsplashRadio.type = 'radio';
sourceUnsplashRadio.checked = true;
sourceUnsplashRadio.name = 'source';
sourceUnsplashRadio.setAttribute('id','source-unsplash');
const sourceFlickrRadio = document.createElement('INPUT');
sourceFlickrRadio.type = 'radio';
sourceFlickrRadio.name = 'source';
sourceFlickrRadio.setAttribute('id','source-flickr');
const sourceUnsplashLabel = document.createElement('LABEL');
const sourceFlickrLabel = document.createElement('LABEL');
sourceUnsplashLabel.setAttribute('for','source-unsplash')
sourceFlickrLabel.setAttribute('for','source-flickr');
sourceUnsplashLabel.title = 'Unsplash';
sourceFlickrLabel.title = 'Flickr';

const orientationFilter = document.createElement('div');
orientationFilter.className = 'search__filter-orientation';
const orientationLandscapeOption = document.createElement('div');
orientationLandscapeOption.className = 'filter__option';
const orientationPortraitOption = document.createElement('div');
orientationPortraitOption.className = 'filter__option';
const orientationSquareOption = document.createElement('div');
orientationSquareOption.className = 'filter__option';
const orientationLandscapeRadio = document.createElement('INPUT');
const orientationPortraitRadio = document.createElement('INPUT');
const orientationSquareRadio = document.createElement('INPUT');
[orientationLandscapeRadio.type, orientationPortraitRadio.type, orientationSquareRadio.type] = ['checkbox', 'checkbox', 'checkbox'];
[orientationLandscapeRadio.checked, orientationPortraitRadio.checked, orientationSquareRadio.checked] = [true, true, true];
[orientationLandscapeRadio.name, orientationPortraitRadio.name, orientationSquareRadio.name] = ['checkbox-landscape', 'checkbox-portrait', 'checkbox-squarish'];
[orientationLandscapeRadio.value, orientationPortraitRadio.value, orientationSquareRadio.value] = ['landscape', 'portrait', 'squarish'];
orientationLandscapeRadio.setAttribute('id','orientation-landscape');
orientationPortraitRadio.setAttribute('id','orientation-portrait');
orientationSquareRadio.setAttribute('id','orientation-squarish');
const orientationLandscapeLabel = document.createElement('LABEL');
const orientationPortraitLabel = document.createElement('LABEL');
const orientationSquareLabel = document.createElement('LABEL');
orientationLandscapeLabel.setAttribute('for','orientation-landscape');
orientationPortraitLabel.setAttribute('for','orientation-portrait');
orientationSquareLabel.setAttribute('for','orientation-squarish');
orientationLandscapeLabel.title = 'landscape';
orientationPortraitLabel.title = 'portrait';
orientationSquareLabel.title = 'squarish';

orientationFilter.append(orientationLandscapeOption, orientationPortraitOption, orientationSquareOption);
orientationLandscapeOption.append(orientationLandscapeRadio, orientationLandscapeLabel);
orientationPortraitOption.append(orientationPortraitRadio, orientationPortraitLabel);
orientationSquareOption.append(orientationSquareRadio, orientationSquareLabel);

searchFilter.append(sourceFilter, orientationFilter);
sourceFilter.append(sourceUnsplashOption, sourceFlickrOption);
sourceUnsplashOption.append(sourceUnsplashRadio, sourceUnsplashLabel);
sourceFlickrOption.append(sourceFlickrRadio, sourceFlickrLabel);

header.append(headerSeachContainer);
searchContainer.append(headerSearchForm, filterButton);
headerSeachContainer.append(searchContainer, searchFilter);
headerSearchForm.append(searchIcon, headerSearchInput, headerSearchButton);
body.append(header, gallery);

const errorMessage = document.createElement('p');
errorMessage.style.color = '#000';

const overlay = document.createElement('div');
const closeButton = document.createElement('div');
closeButton.className = 'close-button';
overlay.className = 'overlay';