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

controlPlayPause.addEventListener('click', () => {
  if (isPlayingNow) {
    pauseMusic();
    isPlayingNow = false;
    controlPlayPause.classList.remove('control-pause');
    controlPlayPause.classList.add('control-play');
  } else {
    playMusic();
    isPlayingNow = true;
    controlPlayPause.classList.remove('control-play');
    controlPlayPause.classList.add('control-pause');
  }
});

function getCurrentTime(value) {
  let sec = Math.floor(value);
  let min = Math.floor(sec / 60);
  sec -= min * 60;
  return `${min}:${(sec < 10) ? '0' + sec : sec}`;
}

setInterval(() => {
  progressRange.value = music.currentTime / music.duration * 100;
  progressCurrent.style.width = progressRange.value + "%";
  timeCurrent.textContent = getCurrentTime(music.currentTime);
  currTime = music.currentTime;
  if (currTime == music.duration) {
    playNext();
  }
}, 500);

function playNext(){
  if (currentMusuic < 3) {
    currentMusuic += 1;
    openTrack(playlistIndexes[currentMusuic]);
    playMusic();
    isPlayingNow = 1;
    playPauseButton.classList.remove('control-play');
    playPauseButton.classList.add('control-pause');
  } else {
    currentMusuic = 0;
    openTrack(playlistIndexes[currentMusuic]);
    playMusic();
    isPlayingNow = 1;
    playPauseButton.classList.remove('control-play');
    playPauseButton.classList.add('control-pause');
  }
}

function playPrev(){
  if (currentMusuic > 0) {
    currentMusuic -= 1;
    openTrack(playlistIndexes[currentMusuic]);
    playMusic();
    isPlayingNow = 1;
    playPauseButton.classList.remove('control-play');
    playPauseButton.classList.add('control-pause');
  } else {
    currentMusuic = 3;
    openTrack(playlistIndexes[currentMusuic]);
    playMusic();
    isPlayingNow = 1;
    playPauseButton.classList.remove('control-play');
    playPauseButton.classList.add('control-pause');
  }
}

nextButton.addEventListener('click', () => {playNext();});
prevButton.addEventListener('click', () => {playPrev();});
