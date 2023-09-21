'use strict';
const tracks = [
  {
    'title':'Elephant gun',
    'author':'Beirut',
    'src':'./audio/beirut-elephant-gun.mp3',
    'cover':'./images/beirut.jpg'
  },
  {
    'title':'Fade into you',
    'author':'Mazzy Star',
    'src':'./audio/fade-into-you-mazzy-star.mp3',
    'cover':'./images/mazzy-star.jfif'
  },
  {
    'title':'Rise',
    'author':'Eddie Vedder and Michael Brook',
    'src':'./audio/michael-brook-with-eddie-vedder-rise.mp3',
    'cover':'./images/eddie-vedder.jpg'
  },
  {
    'title':'Scientist',
    'author':'Coldplay',
    'src':'./audio/the-scientist-coldplay.mp3',
    'cover':'./images/coldplay.avif'
  }
];

const srcs = tracks.map((track) => {return track.src});


const body = document.getElementsByTagName('body')[0];
const main = document.createElement('main');

const player = document.createElement('div');
player.className = 'container';
main.append(player);

const cover = document.createElement('img');
cover.className = 'cover';
cover.width = 250;
cover.height = 250;
cover.src = './images/beirut.jpg';
cover.alt = 'cover';

const trackName = document.createElement('div');
trackName.className = 'title';
const trackTitle = document.createElement('p');
const trackAuthor = document.createElement('p');
trackTitle.className = 'title__title';
trackAuthor.className = 'title__author';
trackName.append(trackTitle, trackAuthor);

const playerProgress = document.createElement('div');
playerProgress.className = 'progress-bar';
const progressFull = document.createElement('div');
const progressCurrent = document.createElement('div');
progressFull.className = 'progress-bar__bar-full';
progressCurrent.className = 'progress-bar__bar-current';
const progressRange = document.createElement('INPUT');
progressRange.setAttribute('type','range');
progressRange.classList = 'input-range';
const timeFull = document.createElement('p');
const timeCurrent = document.createElement('p');
timeFull.className = 'progress-bar__time-full';
timeCurrent.className = 'progress-bar__time-current';
progressFull.append(progressCurrent, progressRange);
playerProgress.append(timeFull, progressFull, timeCurrent);

const playerControls = document.createElement('div');
playerControls.className = 'controls';
const controlPlayPause = document.createElement('button');
const controlPrev = document.createElement('button');
const controlNext = document.createElement('button');
const controlRepeatShuffle = document.createElement('button');
const controlPlaylist = document.createElement('button');
controlPlayPause.className = 'control control-play';
controlPlaylist.className = 'control control-playlist';
controlRepeatShuffle.className = 'control control-repeat';
controlNext.className = 'control control-right';
controlPrev.className = 'control control-left';
playerControls.append(controlRepeatShuffle, controlPrev, controlPlayPause, controlNext, controlPlaylist);

let music = new Audio;
music.preload = 'auto';

const getCurrentTime = (value) => {
  let sec = Math.floor(value);
  let min = Math.floor(sec / 60);
  sec -= min * 60;
  return `${min}:${(sec < 10) ? '0' + sec : sec}`;
}

const playlistContainer = document.createElement('div');
playlistContainer.className = 'playlist';
const playlistButton = document.createElement('button');
playlistButton.className = 'playlist__button';
const playlistList = document.createElement('ul');
playlistList.className = 'playlist__list';
playlistContainer.append(playlistButton, playlistList);

player.append(cover, trackName, playerProgress, playerControls, playlistContainer);

controlPlaylist.addEventListener('click', () => {
  playlistContainer.classList.add('playlist-open');
});

playlistButton.addEventListener('click', () => {
  playlistContainer.classList.remove('playlist-open');
});

/* <footer class="footer">
    <div class="footer__container">
      <div class="footer__year">2023</div>
      <a href = "https://github.com/Alv0425" class="footer__author">alv0425</a>
      <a href="https://rs.school/js-stage0/" class="footer__rss-logo"></a>
    </div>    
</footer> */

const footer = document.createElement('footer');
footer.className = 'footer';
const footerContainer = document.createElement('div');
footerContainer.className = 'footer__container';
const footerYear = document.createElement('div');
const footerAuthor = document.createElement('a');
const footerRSS = document.createElement('a');
footerYear.className = 'footer__year';
footerYear.textContent = '2023';
footerAuthor.className = 'footer__author';
footerAuthor.textContent = 'Alv0425';
footerAuthor.href = 'https://github.com/Alv0425';
footerRSS.className = 'footer__rss-logo';
footerRSS.href = 'https://rs.school/js-stage0/';
footerContainer.append(footerYear, footerAuthor, footerRSS);
footer.append(footerContainer);
body.prepend(main,footer);