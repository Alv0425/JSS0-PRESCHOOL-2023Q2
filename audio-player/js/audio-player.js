'use strict';
let playlistIndexes= [0,1,2,3];
let currentMusuic = 0;
let currentDuration = 0;
let isPlayingNow = false;
let currTime = 0;

openTrack(0);

function openTrack(index) {
  music.src = tracks[index].src;
  currTime = 0;
  timeCurrent.textContent = currTime;
  body.style.backgroundImage = `url(${tracks[index].cover})`;
  main.style.backgroundImage = `url(${tracks[index].cover})`;
  cover.src = tracks[index].cover;
  trackTitle.textContent = tracks[index].title;
  trackAuthor.textContent = tracks[index].author; 
  music.addEventListener('loadedmetadata', function metadataLoad(event) {
    timeFull.textContent = getCurrentTime(music.duration);
    currentDuration = music.duration;
    event.target.removeEventListener('loadedmetadata', metadataLoad);
  },false);
}