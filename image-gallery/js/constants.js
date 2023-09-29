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

header.append(headerSeachContainer);
searchContainer.append(headerSearchForm, filterButton);
headerSeachContainer.append(searchContainer);
headerSearchForm.append(searchIcon, headerSearchInput, headerSearchButton);
body.append(header, gallery);