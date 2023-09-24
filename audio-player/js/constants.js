"use strict";
const tracks = [
  {
    title: "Makeba",
    author: "Jain",
    src: "./audio/makeba-jain.mp3",
    cover: "./images/jain.jfif",
    color: "#F9C610",
  },
  {
    title: "Have you ever seen the rain",
    author: "Creedence Clearwater Revival",
    src: "./audio/have-you-ever-seen-the-rain-ccr.mp3",
    cover: "./images/ccr-have-you-ever.jpg",
    color: "#28395A",
  },
  {
    title: "Through the glass",
    author: "Stone sour",
    src: "./audio/stone-sour-through-the-glass.mp3",
    cover: "./images/stone-sour.jpeg",
    color: "#C5D5EA",
  },
  {
    title: "Eye of the tiger",
    author: "Survivor",
    src: "./audio/eye-of-the-tiger-survivor.mp3",
    cover: "./images/survivor.jpg",
    color: "#180501",
  },
  {
    title: "Fortunate son",
    author: "Creedence Clearwater Revival",
    src: "./audio/fortunate-son-ccr.mp3",
    cover: "./images/fortunate-son.jfif",
    color: "#180501",
  },
  {
    title: "Rise",
    author: "Eddie Vedder and Michael Brook",
    src: "./audio/michael-brook-with-eddie-vedder-rise.mp3",
    cover: "./images/eddie-vedder.jpg",
    color: "#071530",
  },
  {
    title: "Keep me in your heart",
    author: "Warren Zevon",
    src: "./audio/warren-zevon-keep-me-in-your-heart.mp3",
    cover: "./images/warren-zevon.jpg",
    color: "#180501",
  },
  {
    title: "Elephant gun",
    author: "Beirut",
    src: "./audio/beirut-elephant-gun.mp3",
    cover: "./images/beirut.jpg",
    color: "#97BDD2",
  },
  {
    title: "Fade into you",
    author: "Mazzy Star",
    src: "./audio/fade-into-you-mazzy-star.mp3",
    cover: "./images/mazzy-star.jpg",
    color: "#563A58",
  },
  {
    title: "Scientist",
    author: "Coldplay",
    src: "./audio/the-scientist-coldplay.mp3",
    cover: "./images/coldplay.jpg",
    color: "#0E103D",
  },
];

const srcs = tracks.map((track) => {
  return track.src;
});
const body = document.getElementsByTagName("body")[0];
const main = document.createElement("main");
const backgroundBody = document.createElement("div");
backgroundBody.className = "body__background";
const backgroundBulb = document.createElement("div");
backgroundBulb.className = "background__bulb";
const backgroundBulb2 = document.createElement("div");
backgroundBulb2.className = "background__bulb-2";
const backgroundBulb3 = document.createElement("div");
backgroundBulb3.className = "background__bulb-3";
backgroundBody.append(backgroundBulb, backgroundBulb2, backgroundBulb3);

const loadingIcon = document.createElement('div');
loadingIcon.className = 'loading-icon';

const player = document.createElement("div");
player.className = "container";
main.append(player);

const cover = document.createElement("div");
cover.className = "cover";
cover.style.backgroundImage = "url(" + "./images/beirut.jpg" + ")";

const volumeBarContainer = document.createElement("div");
volumeBarContainer.className = "volume-bar-container";
const volumeBar = document.createElement("input");
volumeBar.type = "range";
volumeBar.className = "volume-bar";
volumeBar.value = 70;
const controlVolume = document.createElement("button");
controlVolume.className = "control-volume";
volumeBarContainer.append(controlVolume, volumeBar);
cover.append(volumeBarContainer);

const trackName = document.createElement("div");
trackName.className = "title";
const trackTitle = document.createElement("p");
const trackAuthor = document.createElement("p");
trackTitle.className = "title__title";
trackAuthor.className = "title__author";
trackName.append(trackTitle, trackAuthor);

const playerProgress = document.createElement("div");
playerProgress.className = "progress-bar";
const progressFull = document.createElement("div");
const progressCurrent = document.createElement("div");
progressFull.className = "progress-bar__bar-full";
progressCurrent.className = "progress-bar__bar-current";
const progressRange = document.createElement("INPUT");
progressRange.setAttribute("type", "range");
progressRange.classList = "input-range";
const timeFull = document.createElement("p");
const timeCurrent = document.createElement("p");
timeFull.className = "progress-bar__time-full";
timeCurrent.className = "progress-bar__time-current";
progressFull.append(progressCurrent, progressRange);
playerProgress.append(timeFull, progressFull, timeCurrent);

const playerControls = document.createElement("div");
playerControls.className = "controls";
const controlPlayPause = document.createElement("button");
const controlPrev = document.createElement("button");
const controlNext = document.createElement("button");
const controlRepeatShuffle = document.createElement("button");
const controlPlaylist = document.createElement("button");
controlPlayPause.className = "control control-play";
controlPlaylist.className = "control control-playlist";
controlRepeatShuffle.className = "control control-repeat";
controlNext.className = "control control-right";
controlPrev.className = "control control-left";
playerControls.append(
  controlRepeatShuffle,
  controlPrev,
  controlPlayPause,
  controlNext,
  controlPlaylist
);

let music = new Audio();
music.preload = "auto";
music.controls = "true";
music.style.display = 'none';
body.append(music);

const getCurrentTime = (value) => {
  let sec = Math.floor(value);
  let min = Math.floor(sec / 60);
  sec -= min * 60;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

const playlistContainer = document.createElement("div");
playlistContainer.className = "playlist";
const playlistButton = document.createElement("button");
playlistButton.className = "playlist__button";
const playlistList = document.createElement("ul");
playlistList.className = "playlist__list";
playlistContainer.append(playlistButton, playlistList);

player.append(
  cover,
  trackName,
  playerProgress,
  playerControls,
  playlistContainer
);

controlPlaylist.addEventListener("click", () => {
  playlistContainer.classList.add("playlist-open");
});

playlistButton.addEventListener("click", () => {
  playlistContainer.classList.remove("playlist-open");
});

body.addEventListener("click", (event) => {
  if (
    !controlPlaylist.contains(event.target) &&
    !playlistButton.contains(event.target) &&
    !playlistContainer.contains(event.target)
  ) {
    playlistContainer.classList.remove("playlist-open");
  }
});

const footer = document.createElement("footer");
footer.className = "footer";
const footerContainer = document.createElement("div");
footerContainer.className = "footer__container";
const footerYear = document.createElement("div");
const footerAuthor = document.createElement("a");
const footerRSS = document.createElement("a");
footerYear.className = "footer__year";
footerYear.textContent = "2023";
footerAuthor.className = "footer__author";
footerAuthor.textContent = "Alv0425";
footerAuthor.href = "https://github.com/Alv0425";
footerRSS.className = "footer__rss-logo";
footerRSS.href = "https://rs.school/js-stage0/";
footerContainer.append(footerYear, footerAuthor, footerRSS);
footer.append(footerContainer);

const icons = [
  "./assets/angle-down.svg",
  "./assets/caret-right-solid.svg",
  "./assets/left.svg",
  "./assets/pause.svg",
  "./assets/play.svg",
  "./assets/shuffle-solid.svg",
  "./assets/right.svg",
  "./assets/repeat-solid.svg",
  "./assets/playlist.svg",
  "./assets/rss.svg",
  "./assets/volume.svg",
  "./assets/volume-muted.svg",
];

// function loadImage(src) {
//   let img = new Image();
//   img.src = src;
// }

// function getImage(src) {
//   let img = new Image();
//   img.src = src;
//   return img;
// }

// icons.forEach((iconSrc) => {
//   loadImage(iconSrc);
// });

// tracks.forEach((track) => {
//   loadImage(track.cover);
// });

// const iconsArray = icons.map((iconSrc) =>  getImage(iconSrc));
const iconsPromisesArray = icons.map((iconSrc) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve('loaded');
    });
  image.src = iconSrc;
  });
});

const coversPromisesArray = tracks.map((track) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve('loaded');
    });
  image.src = track.cover;
  });
});

const audioMetadataPromises = tracks.map((track) => {
  return new Promise((resolve) => {
    const audio = new Audio;
    audio.addEventListener('loadedmetadata', () => {
      resolve('loaded');
    });
  audio.src = track.src;
  });
});

const allImagesPromises = iconsPromisesArray.concat(coversPromisesArray, audioMetadataPromises);
body.append(loadingIcon);

Promise.all(allImagesPromises).then(() => {
  loadingIcon.remove();
  body.prepend(backgroundBody, main, footer);
});