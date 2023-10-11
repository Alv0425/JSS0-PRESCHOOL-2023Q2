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

const overlay = document.createElement('div');
overlay.className = 'overlay';
const tubes = document.createElement('div');