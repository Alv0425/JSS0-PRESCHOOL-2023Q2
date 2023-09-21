'use strict';
let playlistIndexes= [0,1,2,3];
let currentMusuic = 0;
let currentDuration = 0;
let isPlayingNow = false;
let currTime = 0;
let isSorted = true;

const trackItems = [];
tracks.forEach((track, index) => {
  const playlistItem = document.createElement('li');
  const playlistItemButton = document.createElement('button');
  playlistItemButton.className = 'track__button';
  playlistItem.append(playlistItemButton);
  const playlistTrackName = document.createElement('span');
  playlistTrackName.className = 'track-name';
  const playlistTrackTitle = document.createElement('span');
  playlistTrackTitle.className = 'track__title';
  const playlistTrackAuthor = document.createElement('span');
  playlistTrackAuthor.className = 'track__author';
  const playlistTrackTime = document.createElement('span');
  playlistTrackTime.className = 'track__time';
  playlistItemButton.append(playlistTrackName, playlistTrackTime);
  playlistTrackName.append(playlistTrackTitle, playlistTrackAuthor);
  playlistTrackTitle.textContent = track.title;
  playlistTrackAuthor.textContent = track.author;
  playlistList.append(playlistItem);
  trackItems.push(playlistItem);
  playlistItemButton.addEventListener('click', () => {
    currentMusuic = index;
    openTrack(currentMusuic);
    currTime = 0;
    playMusic();
  });
});
openTrack(0);

console.log(trackItems[0].childNodes[0].childNodes[1]);

srcs.forEach((src, index) => {
  const audio = new Audio;
  audio.preload = 'auto';
  audio.src = src;
  audio.onloadedmetadata = () => { 
    trackItems[index].childNodes[0].childNodes[1].textContent = getCurrentTime(audio.duration);
    console.log(audio.duration);
  };
});

function openTrack(index) {
  music.src = tracks[index].src;
  currTime = 0;
  timeCurrent.textContent = currTime;
  body.style.backgroundImage = `url(${tracks[index].cover})`;
  main.style.backgroundImage = `url(${tracks[index].cover})`;
  cover.src = tracks[index].cover;
  trackTitle.textContent = tracks[index].title;
  trackAuthor.textContent = tracks[index].author; 
  trackItems.forEach((item) => {item.className = 'track'});
  trackItems[index].classList.add('track-active');
  music.addEventListener('loadedmetadata', function metadataLoad(event) {
    timeFull.textContent = getCurrentTime(music.duration);
    currentDuration = music.duration;
    event.target.removeEventListener('loadedmetadata', metadataLoad);
  },false);
}

function playMusic() {
  music.currentTime = currTime;
  music.play();
  isPlayingNow = true;
  controlPlayPause.classList.remove('control-play');
  controlPlayPause.classList.add('control-pause');
}

function pauseMusic() {
  music.pause();
  isPlayingNow = false;
  controlPlayPause.classList.add('control-play');
  controlPlayPause.classList.remove('control-pause');
}

controlPlayPause.addEventListener('click', () => {
  if (isPlayingNow) {
    pauseMusic();
  } else {
    playMusic();
  }
});

setInterval(() => {
  progressRange.value = music.currentTime / music.duration * 100;
  progressCurrent.style.width = progressRange.value + "%";
  timeCurrent.textContent = getCurrentTime(music.currentTime);
  currTime = music.currentTime;
  if (currTime == music.duration) {
    if (isSorted) {
      playNext();
    } else {
      let randomIndex = Math.floor(Math.random() * 4);
      currentMusuic = randomIndex !== currentMusuic ? randomIndex : Math.floor(Math.random() * 4);
      console.log('shuffled!', randomIndex);
      openTrack(currentMusuic);
      playMusic();
    }
  }
}, 500);

function playNext(){
  if (currentMusuic < 3) {
    currentMusuic += 1;
    openTrack(currentMusuic);
    playMusic();
  } else {
    currentMusuic = 0;
    openTrack(currentMusuic);
    playMusic();
  }
}

function playPrev(){
  if (currentMusuic > 0) {
    currentMusuic -= 1;
    openTrack(currentMusuic);
    playMusic();
  } else {
    currentMusuic = 3;
    openTrack(currentMusuic);
    playMusic();
  }
}

controlNext.addEventListener('click', () => {playNext();});
controlPrev.addEventListener('click', () => {playPrev();});

progressRange.addEventListener('input', () => {
  currTime = progressRange.value * music.duration / 100;
  music.currentTime = currTime;
});

controlRepeatShuffle.addEventListener('click', () => {
  if (isSorted) {
    isSorted = false;
    controlRepeatShuffle.classList.remove('control-repeat');
    controlRepeatShuffle.classList.add('control-shuffle');
  } else {
    isSorted = true;
    controlRepeatShuffle.classList.add('control-repeat');
    controlRepeatShuffle.classList.remove('control-shuffle');
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code == 'Space'){
    if (isPlayingNow) {
      pauseMusic();
    } else {
      playMusic();
    }
  };
  if (event.key == 'ArrowLeft'){
    playPrev();
  }
  if (event.key == 'ArrowRight'){
    playNext();
  }
});

