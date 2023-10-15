'use strict';
const COLORS = ['red','blue','yellow','magenta','violet','orange', 'cyan', 'sky','green'];

const body = document.getElementById('body');
const header = document.createElement('header');
const headerLogo = document.createElement('h1');
headerLogo.className = 'header__logo';
headerLogo.textContent = 'Water Sort';
header.append(headerLogo);
const main = document.createElement('main');
const footer =  document.createElement('footer');
footer.className = 'footer';
const footerContainer = document.createElement('div');
footerContainer.className = 'footer__container';
const footerRSSLink = document.createElement('a');
footerRSSLink.className = 'footer__rss-link';
const footerDate = document.createElement('p');
footerDate.className = 'footer__date';
const footerGithub = document.createElement('a');
footerGithub.className = 'footer__github';
footerContainer.append(footerRSSLink,footerDate,footerGithub);
footer.append(footerContainer);
body.append(header,main,footer);
footerRSSLink.href = 'https://rs.school/js-stage0/';
footerRSSLink.target = '_blank';
footerGithub.textContent = 'alv0425';
footerGithub.href = 'https://github.com/Alv0425';
footerGithub.target = '_blank';
footerDate.textContent = 'Сreated in 2023 as part of an assignment from the Rolling Scopes School course';

const gameContainer = document.createElement('div');
gameContainer.className = 'game__container';
main.append(gameContainer);
const tubes = document.createElement('div');
const gameSettings = document.createElement('div');
gameSettings.className = 'game__settings';
const gameLevel = document.createElement('div');
gameLevel.className = 'game__levels-container';
const gameLevelButton = document.createElement('button');
gameLevelButton.className = 'game__levels';
const gameLevelThree = document.createElement('button');
gameLevelThree.className = 'game__level';
gameLevelThree.textContent = '3 colors';
const gameLevelFive = document.createElement('button');
gameLevelFive.className = 'game__level';
gameLevelFive.textContent = '5 colors';
const gameLevelSeven = document.createElement('button');
gameLevelSeven.className = 'game__level';
gameLevelSeven.textContent = '7 colors';
const gameLevelNine = document.createElement('button');
gameLevelNine.className = 'game__level';
gameLevelNine.textContent = '9 colors';
const gameLevelList = document.createElement('div');
gameLevelList.className = 'levels__list';
gameSettings.append(gameLevel);
gameLevel.append(gameLevelButton, gameLevelList);
gameLevelList.append(gameLevelThree,gameLevelFive,gameLevelSeven,gameLevelNine);

const scoreContainer = document.createElement('div');
scoreContainer.classList = 'score_container';
const scoreLabel = document.createElement('div');
const movesLabel = document.createElement('div');
scoreContainer.append(scoreLabel,movesLabel);
gameSettings.append(scoreContainer);

const repeatButton = document.createElement('button');
repeatButton.classList = 'repeat-button';
repeatButton.title = 'repeat';
gameSettings.append(repeatButton);

const plusTubeButton = document.createElement('button');
plusTubeButton.classList = 'plus-button';
plusTubeButton.title = 'add tube';
gameSettings.append(plusTubeButton);

const showInfo = document.createElement('button');
showInfo.classList = 'info-button';
showInfo.title = 'show score';
gameSettings.append(showInfo);

const showHistory = document.createElement('button');
showHistory.classList = 'history-button';
showHistory.title = 'show score';
gameSettings.append(showHistory);

const overlay = document.createElement('div');
overlay.className = 'overlay';

const gameHistory = document.createElement('div');
gameHistory.className = 'game-history';
const gameHistoryList = document.createElement('ul');
gameHistory.append(gameHistoryList);

const gameTopLabel = document.createElement('div');
gameTopLabel.className = 'game-history__label-top';
const gameBottomLabel = document.createElement('div');
gameBottomLabel.className = 'game-history__label-bottom';
gameHistory.append(gameTopLabel);

const gameRules = document.createElement('div');
gameRules.className = 'game-rules';
gameRules.innerHTML = `
<p>Try to sort the colored liquids in the tubes until all colors in the same tube.</p>
<p>HOW TO PLAY: Tap any test tube, next tap another one to pour liquid in.</p>
<p>You can only merge the liquids if they are same-colored and there're enough space in the test tube.</p>
` 
main.append(gameHistory);

const infoModal = document.createElement('div');
infoModal.className = 'info-modal';
const infoModalHeader = document.createElement('div');
infoModalHeader.className = 'info-modal__header';
const infoModalClose = document.createElement('button');
infoModalClose.className = 'info-modal__close';
infoModalHeader.textContent = 'Water Sort Puzzle';
const gameInfo = document.createElement('div');
gameInfo.className = 'game-rules';
gameInfo.innerHTML = `
<p><b>Water Sort Puzzle</b> is a popular logic puzzle consisting of several test tubes 
(or glasses) containing liquids of multiple colors. Each container works like a stack. A layer of colored liquid has to follow the last-in first-out order. The player has to sort the liquids by color such that each test tube contains only liquids of a same color. </p>
<p>HOW TO PLAY: Tap any test tube, next tap another one to pour liquid in.</p>
<p>RULES: You can only merge the liquids if they are same-colored and there're enough space in the test tube.</p>
` ;

const resetBlock = document.createElement('div');
resetBlock.className = 'reset-history';
const resetBlockLabel = document.createElement('p');
resetBlockLabel.textContent = 'To reset games history and clear localStorage press this button:'
const resetBlockButton = document.createElement('button');
resetBlockButton.textContent = 'RESET';
resetBlock.append(resetBlockLabel, resetBlockButton);
infoModal.append(infoModalHeader, infoModalClose, gameInfo, resetBlock);

