'use strict';
const main = document.createElement('main');
document.getElementsByTagName('body')[0].appendChild(main);

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

player.append(cover, trackName, playerProgress, playerControls);
