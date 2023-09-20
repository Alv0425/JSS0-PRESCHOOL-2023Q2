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

function playMusic() {
  music.currentTime = currTime;
  music.play();
}

function pauseMusic() {
  music.pause();
}

playPauseButton.addEventListener('click', () => {
  if (isPlayingNow) {
    pauseMusic();
    isPlayingNow = false;
    playPauseButton.classList.remove('control-pause');
    playPauseButton.classList.add('control-play');
  } else {
    playMusic();
    isPlayingNow = true;
    playPauseButton.classList.remove('control-play');
    playPauseButton.classList.add('control-pause');
  }
});

function getCurrentTime(value) {
  let sec = Math.round(value);
  let min = Math.round(sec / 60);
  sec -= min * 60;
  return `${min}:${(sec < 10) ? '0' + sec : sec}`;
}