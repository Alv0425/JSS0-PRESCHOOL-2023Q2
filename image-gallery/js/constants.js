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