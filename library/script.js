"use strict";
console.log('%cLibrary #3, Добавление функционала при помощи JavaScript', 'font-weight:700; color:blue;');
console.log('Оценка 200/200. ')

let p1 = '1. Реализован слайдер в блоке about и в блоке favorites. Верстка и функционал соответствует ТЗ.\n';
let p2 = '2. Реализована возможность регистрации. Данные всех зарегистрированных пользователей хранятся в localstorage в виде JSON массива объектов (readers). Текущее состояние сессии хранится в поле loginstat как JSON объект.\n';
let p3 = '3. Зарегистрированные пользователи могут проматтривать статистику своих посещений, купить абонемент и взять книги из блока favorites.\n'; 


let review = p1+p2+p3;

console.log(review);

const navBar = document.getElementById("navbar");
const navButton = document.getElementById('navbutton');
const body = document.getElementById('body');
const navLinks = document.querySelectorAll('li a');
let navBarstatus = 0;

const bPLBooks = [
  {title: 'The Book Eaters', author: 'By Sunyi Dean'},{title: 'Cackle', author: 'By Rachel Harrison'},
  {title:'Dante: Poet of the Secular World', author:'By Erich Auerbach'},{title:'The Last Queen', author: 'By Clive Irving'},
  {title: 'The Body', author:'By Stephen King'},{title: 'Carry: A Memoir of Survival on Stolen Land',author:'By Toni Jenson'},
  {title:'Days of Distraction',author:'By Alexandra Chang'},{title:'Dominicana',author:'By Angie Cruz'},
  {title:'Crude: A Memoir',author:'By Pablo Fajardo &amp; Sophie Tardy-Joubert'},{title:'Let My People Go Surfing',author:'By Yvon Chouinard'},
  {title:'The Octopus Museum: Poems',author:'By Brenda Shaughnessy'},{title:'Shark Dialogues: A Novel',author:'By Kiana Davenport'},
  {title:'Casual Conversation',author:'By Renia White'},{title:'The Great Fire',author:'By Lou Ureneck'},
  {title:'Rickey: The Life and Legend',author:'By Howard Bryant'},{title:'Slug: And Other Stories',author: 'By Megan Milks'}
];

function bodyLock() {
  body.classList.add("body-locked");
}

function bodyUnlock() {
  body.classList.remove("body-locked");
}

const handleCloseMenu = () => {
  navBar.classList.remove("navbar-open");
  navButton.classList.remove("close");
  bodyUnlock();
  navBarstatus = 0;
}

const handleClickOutsideMunu = (event) => {
  if (navBarstatus == 1){
    if (!navBar.contains(event.target) && !navButton.contains(event.target)) {
        handleCloseMenu();
    }
  }
}

navButton.addEventListener('click', () => {
    if (navBarstatus == 0){  
        navBar.classList.add("navbar-open");
        navButton.classList.add("close");
        bodyLock();
        navBarstatus = 1;
    } else {
      handleCloseMenu();
    }
});

document.addEventListener('touchend', handleClickOutsideMunu);
document.addEventListener('click', handleClickOutsideMunu);

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        handleCloseMenu();
        setTimeout(waitAnimation, 300);
        function waitAnimation() {
          window.location = link.href;  
        }
    });
});

//About slider
const paginationButtons = document.querySelectorAll('.pagination-button');
const spaceLeft = document.getElementById('free-space-left');
const spaceRight = document.getElementById('free-space-right');
const pagArrowLeft = document.getElementById('arrow-left');
const pagArrowRight = document.getElementById('arrow-right');
let currentSliderStatus = 1;
let prevSliderStatus = 1;
const handleSlider = () => {
  spaceLeft.classList.remove(`free-space-left-stage${prevSliderStatus}`);
  spaceRight.classList.remove(`free-space-right-stage${prevSliderStatus}`);
  spaceLeft.classList.add(`free-space-left-stage${currentSliderStatus}`);
  spaceRight.classList.add(`free-space-right-stage${currentSliderStatus}`);
  paginationButtons[currentSliderStatus-1].classList.add('pagination-button-active');
  paginationButtons[prevSliderStatus-1].classList.remove('pagination-button-active');
}
paginationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    prevSliderStatus = currentSliderStatus;
    currentSliderStatus = button.id[button.id.length-1]*1;
    if (currentSliderStatus !== prevSliderStatus) {
      handleSlider();
    }
  });
});

pagArrowLeft.addEventListener('click', () => {
  if (currentSliderStatus > 1) {
    prevSliderStatus = currentSliderStatus;
    currentSliderStatus -= 1;
    handleSlider();
  }
});

pagArrowRight.addEventListener('click', () => {
  if (currentSliderStatus < 5) {
    prevSliderStatus = currentSliderStatus;
    currentSliderStatus += 1;
    handleSlider();
  }
});


//touches handler
const carouselContainer = document.getElementById('carousel-container');
let touchstart = 0;
let touchend = 0;

carouselContainer.addEventListener('touchstart', function(event) {
  touchstart = event.changedTouches[0].screenX;
}, false);

carouselContainer.addEventListener('touchend', function(event) {
  touchend = event.changedTouches[0].screenX;
  touchesType();
}, false); 

function touchesType() {
  if (touchstart - touchend > 70) {
    let maxStageNum = 5;
    if (screen.width > 1024) {
      maxStageNum = 4;
    }
    if (screen.width > 1430) {
      maxStageNum = 3;
    }
    if (currentSliderStatus < maxStageNum) {
      prevSliderStatus = currentSliderStatus;
      currentSliderStatus += 1;
      handleSlider();
    }
  }  
  if (touchend - touchstart > 70) {
    if (currentSliderStatus > 1) {
      prevSliderStatus = currentSliderStatus;
      currentSliderStatus -= 1;
      handleSlider();
    }
  }
}

//Handle onresize: move slider on initial stage
window.addEventListener("resize", () => {
  prevSliderStatus = currentSliderStatus;
  currentSliderStatus = 1;
  handleSlider();
  paginationButtons[0].classList.add('pagination-button-active');
});

//Favorites slider
const seasonButtons = document.getElementsByName('season');
const favcontent = document.getElementById("fav-content");
const booksAll = {
  'winter': document.querySelectorAll('.book.winter'),
  'spring': document.querySelectorAll('.book.spring'),
  'summer': document.querySelectorAll('.book.summer'),
  'autumn': document.querySelectorAll('.book.autumn')
}
let seasonChecked = 'winter';
let previousSeasonChecked = 'winter';
  
function hideShowBooks(event){
  previousSeasonChecked = seasonChecked;
  seasonChecked = event.target.value;
  function switchSeasons(){
    booksAll[seasonChecked].forEach((book)=>{
      book.classList.remove('favorites-hide');
      book.classList.add('favorites-show');
    });
    for (let season in booksAll) {
      if (season !== seasonChecked){
        booksAll[season].forEach((book)=>{
          book.classList.add('favorites-hide');
          book.classList.remove('favorites-show');
        });
      }
    }
  }
  function hideAll(){
      return new Promise((resolve)=>{
        if (previousSeasonChecked !== seasonChecked){
          if(!favcontent.classList.contains('favorites__content-hidden')){
            favcontent.classList.add('favorites__content-hidden');
            favcontent.classList.remove('favorites__content-show');
            setTimeout(()=>{resolve(switchSeasons());},500);
          } else {
            setTimeout(()=>{resolve(switchSeasons());},500);
          }
        }
      });
    }
  hideAll().then(()=>{
    favcontent.classList.remove('favorites__content-hidden');
    favcontent.classList.add('favorites__content-show');
  });
}

seasonButtons.forEach((rbutton) => {
  rbutton.addEventListener('click', (event) => {
    hideShowBooks(event);
  });
});

//Auth menu
const userButton = document.getElementById('user-button');
const authMenu = document.getElementById('auth-menu');
let modalType = '';
userButton.addEventListener('click', () => {
  authMenu.classList.toggle('auth-menu-open');
});

const clickOutsideAuthMenu = (event) => {
    if (!authMenu.contains(event.target) && !userButton.contains(event.target)) {
      authMenu.classList.remove('auth-menu-open');
    }
}

document.addEventListener('touchend', clickOutsideAuthMenu);
document.addEventListener('click', clickOutsideAuthMenu);

//Register and login modals
const authMenuRegister = document.getElementById('auth-reg');
const authMenuLogin = document.getElementById('auth-login');
const authMenuMyProfile = document.getElementById('auth-my-profile');
const authMenuLogout = document.getElementById('auth-logout');
const authMenuTitle = document.getElementById('auth-menu-title');
const overlayModal = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');
//Favorites content
const bookButtons = document.querySelectorAll('.book__button');

//Digital library cards elements
const signupButton = document.getElementById('signup-getform');
const loginButton = document.getElementById('login-getform');
const getformTitle = document.getElementById('get-form-title');
const getformDescription = document.getElementById('get-form-description');
const profileButton = document.getElementById('profile-getform');
const checkCardButtonContainer = document.getElementById('check-form-button-container');
const checkCardButton = document.getElementById('check-form__button');
const checkReaderNameInput = document.getElementById('readers-name');
const checkReaderNumberInput = document.getElementById('card-number');


class LoginStat {
  constructor() {
    this.loginUserStatus = 0;
    this.userCard = '';
    this.userEmail = '';
    this.userFirstName = '';
    this.userLastName = '';
    this.userBonuses = 0;
    this.userVisits = 0;
    this.userBooks = [];
    this.userSubscription = 0;
  }
}

function checkLoginAttempt(login, password) {
  let readersList = JSON.parse(localStorage.readers);
  let indexOfReader = -1;
  for (let i=0; i<readersList.length; i++){
    if (login == readersList[i].libraryCardNumber || login.toLowerCase() == readersList[i].readerEmail.toLowerCase()) {
      indexOfReader = i;
    }
  }
  if (indexOfReader == -1) {
    return -1;
  }
  if (readersList[indexOfReader].readerPassword == password){
    return indexOfReader;
  }
  return -2;
}

class Reader {
  constructor() {
    this.readerFirstName = 'readerFirstName';
    this.readerLastName = 'readerLastName';
    this.readerEmail = 'readerEmail';
    this.readerPassword = 'readerPassword';
    this.readerVisits = 1;
    this.readerBooks = [];
    this.readerBonuses = 0;
    this.libraryCardNumber = 'libraryCardNumber';
    this.readerSubscription = 0;
  }
}

function updateContentWhenStetusChanged() {
  let currentUser = JSON.parse(localStorage.loginstat);
  switch (currentUser.loginUserStatus) {
    case 1:
      console.log("logined");
      userButton.classList.remove('user-button');
      userButton.classList.add('user-button-logged-in');
      userButton.textContent = (currentUser.userFirstName[0] + currentUser.userLastName[0]).toUpperCase();
      userButton.title = currentUser.userFirstName + ' ' + currentUser.userLastName;
      authMenuLogin.classList.add('auth-menu__item-hidden');
      authMenuRegister.classList.add('auth-menu__item-hidden');
      authMenuLogout.classList.remove('auth-menu__item-hidden');
      authMenuMyProfile.classList.remove('auth-menu__item-hidden');
      authMenuTitle.textContent = currentUser.userCard;
      //Digital Library Cards section
      getformTitle.textContent = 'Visit your profile';
      getformDescription.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
      loginButton.classList.add('get-form__button-hidden');
      signupButton.classList.add('get-form__button-hidden');
      profileButton.classList.remove('get-form__button-hidden');
      showUserStats(currentUser.userVisits,currentUser.userBonuses,currentUser.userBooks.length,`${currentUser.userFirstName} ${currentUser.userLastName}`, currentUser.userCard);

      //Modal Profile
      authMenuMyProfile.addEventListener('click',()=>{
        console.log('modal profile is opened');
        openProfileModal();
        authMenu.classList.remove('auth-menu-open');
      });
      //book buttons
      profileButton.addEventListener('click', ()=>{
        openProfileModal();
      });
      bookButtons.forEach((button) => {
        button.disabled = false;
        button.textContent = 'Buy';
        currentUser.userBooks.forEach((bookData) => {
          if (button.dataset.book == bookData) {
            button.disabled = true;
            button.textContent = 'Own';
          }
        });
      });
      break;
    case 0:
      console.log("not logined");
      userButton.classList.remove('user-button-logged-in');
      userButton.classList.add('user-button');
      userButton.innerHTML = '';
      userButton.title = 'Profile';
      authMenuLogin.classList.remove('auth-menu__item-hidden');
      authMenuRegister.classList.remove('auth-menu__item-hidden');
      authMenuLogout.classList.add('auth-menu__item-hidden');
      authMenuMyProfile.classList.add('auth-menu__item-hidden');
      authMenuTitle.innerHTML = 'Profile';
      showCheckCardButton();
      document.getElementById('readers-name').value = '';
      document.getElementById('card-number').value = '';
      document.getElementById('readers-name').readOnly = false;
      document.getElementById('card-number').readOnly = false;
      bookButtons.forEach((button) => {
        button.disabled = false;
        button.textContent = 'Buy';
      });

      getformTitle.textContent = 'Get a reader card';
      getformDescription.textContent = 'You will be able to see a reader card after logging into account or you can register a new account';
      loginButton.classList.remove('get-form__button-hidden');
      signupButton.classList.remove('get-form__button-hidden');
      profileButton.classList.add('get-form__button-hidden');
      break;  
  }
}

window.addEventListener('load', () => {
  if(localStorage.hasOwnProperty('readers')) {
    console.log(localStorage.readers);
  } else {
    localStorage.readers = JSON.stringify([]);
  }
  if(localStorage.hasOwnProperty('loginstat')) {
    console.log(localStorage.loginstat);
  } else {
    localStorage.loginstat = JSON.stringify(new LoginStat);
  }
  updateContentWhenStetusChanged();
});

const cardNumberDigits = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
function generateCardNumber() {
  let cardNum = '';
  let randomDigits = cardNumberDigits.sort(()=>0.5-Math.random());
  for (let i = 0; i < 9; i++) {
    cardNum += randomDigits[i];
  }
  return cardNum;
}

function loginStatusUpdate(loginStatus,cReadersList,indexOfReader) {
  loginStatus.loginUserStatus = 1;
  loginStatus.userBonuses = cReadersList[indexOfReader].readerBonuses;
  loginStatus.userFirstName = cReadersList[indexOfReader].readerFirstName;
  loginStatus.userLastName = cReadersList[indexOfReader].readerLastName;
  loginStatus.userVisits = cReadersList[indexOfReader].readerVisits;
  loginStatus.userCard = cReadersList[indexOfReader].libraryCardNumber;
  loginStatus.userEmail = cReadersList[indexOfReader].readerEmail;
  loginStatus.userBooks = cReadersList[indexOfReader].readerBooks;
  loginStatus.userSubscription = cReadersList[indexOfReader].readerSubscription;
  localStorage.readers = JSON.stringify(cReadersList);
  localStorage.loginstat = JSON.stringify(loginStatus);
}

function findIndexOfUserByEmail(email) {
  let readersList = JSON.parse(localStorage.readers);
  let index = -1;
  for (let i = 0; i<readersList.length; i++) {
    if (readersList[i].readerEmail == email){
      index = i;
    }
  }
  return index;
}

// Registration form modal elements
let registerModal = document.createElement('div');
registerModal.className = 'modal-login-reg';
let loginRegHeader = document.createElement('div');
loginRegHeader.className = 'modal-login-reg__header';
let closeRegModalButton = document.createElement('button');
closeRegModalButton.className = 'modal-login-reg__close';
closeRegModalButton.setAttribute('onclick', 'closeModal()');
console.log(closeRegModalButton);
let regModalForm = document.createElement('FORM');
regModalForm.className = 'modal-login-reg__container modal-form';
regModalForm.setAttribute('id','reg-form');
let regFormTitle = document.createElement('div');
regFormTitle.textContent = 'Register';
regFormTitle.className = 'modal-login-reg__title';
let regFormFieldsText = ['First name','Last name','E-mail','Password'];
let regFormInputTypes = ['text','text','email','password'];
let regFormFields = regFormFieldsText.map((field, index) => {
  let inputlabel = document.createElement('LABEL');
  inputlabel.textContent = field;
  inputlabel.className = 'modal-form__label';
  let input = document.createElement('INPUT');
  input.className = 'modal-form__input';
  input.setAttribute('id', field.replace(/\s/g, ''));
  input.setAttribute('type', regFormInputTypes[index]);
  input.required = true;
  inputlabel.setAttribute('for', field.replace(/\s/g, ''));
  return [inputlabel, input];
});
let regSubmitButton = document.createElement('button');
regSubmitButton.setAttribute('type', 'submit');
regSubmitButton.className = 'button modal-login-reg__button';
regSubmitButton.textContent = 'Sign Up';
let regFootnote = document.createElement('p');
regFootnote.className = 'modal-login-reg__footnote';
regFootnote.innerHTML = 'Already have an account?';
let regErrorHint = document.createElement('p');
regErrorHint.className = 'modal-login-reg__hint modal-login-reg__hint-hidden';
regErrorHint.setAttribute('id','reg-error-hint');
let regFooterLink = document.createElement('span');
regFooterLink.textContent = 'Login';
regFooterLink.className = 'modal-login-reg__link';
regFootnote.append(regFooterLink);


const openRegisterModal = () => {
  overlayModal.classList.remove('modal-hidden');
  removeChilds(modalContainer);
  bodyLock();
  modalContainer.append(registerModal);
  registerModal.append(loginRegHeader, regModalForm);
  loginRegHeader.append(closeRegModalButton);
  regModalForm.append(regFormTitle);
  regFormFields.forEach(labelInputPair => {
    regModalForm.append(...labelInputPair);  
    labelInputPair[1].value = '';
  });
  regModalForm.append(regSubmitButton, regErrorHint, regFootnote);
  regErrorHint.className = 'modal-login-reg__hint modal-login-reg__hint-hidden';
    regModalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newReader = new Reader();
    newReader.readerFirstName = regFormFields[0][1].value;
    newReader.readerLastName = regFormFields[1][1].value;
    newReader.readerEmail = regFormFields[2][1].value;
    newReader.readerPassword = regFormFields[3][1].value;
    if (regFormFields[3][1].value.length >= 8) {
      if (findIndexOfUserByEmail(regFormFields[2][1].value) == -1) {
        newReader.libraryCardNumber = generateCardNumber();
        let readersList = JSON.parse(localStorage.readers);
        readersList.push(newReader);
        let indexOfNewReader = readersList.length-1;
        let curLoginStat = new LoginStat;
        console.log(JSON.stringify(readersList));
        loginStatusUpdate(curLoginStat,readersList,indexOfNewReader);
        console.log(JSON.parse(localStorage.loginstat).loginStatus);
        updateContentWhenStetusChanged();
        setTimeout(()=>{
          closeModal();
        }, 200);
      } else {
        regErrorHint.classList.remove('modal-login-reg__hint-hidden');
        regErrorHint.textContent = 'This email is already associated with an account.';
        console.log('user with same email have already exists');
      }
    } else {
      regErrorHint.classList.remove('modal-login-reg__hint-hidden');
      regErrorHint.textContent = 'Password should be at least 8 characters long.';
    }
  });

  regFooterLink.addEventListener('click', () => {
    setTimeout(()=>{
      openLoginModal();
    }, 200);
  });
}

//Elements for Login modal
let loginModal = document.createElement('div');
loginModal.className = 'modal-login-reg';
let loginModalForm = document.createElement('FORM');
loginModalForm.className = 'modal-login-reg__container modal-form';
loginModalForm.setAttribute('id','login-form');
let loginFormTitle = document.createElement('div');
loginFormTitle.textContent = 'Login';
loginFormTitle.className = 'modal-login-reg__title';
let loginEmailLabel = document.createElement('LABEL');
loginEmailLabel.textContent = 'E-mail or readers card';
let loginPasswordLabel = document.createElement('LABEL');
loginPasswordLabel.textContent = 'Password';
[loginEmailLabel, loginPasswordLabel].forEach((loginlabel) => {loginlabel.className = 'modal-form__label'});
let loginEmailInput = document.createElement('INPUT');
let loginPasswordInput = document.createElement('INPUT');
[loginEmailInput, loginPasswordInput].forEach((logininput) => {
  logininput.className = 'modal-form__input';
  logininput.required = true;
});
loginEmailInput.setAttribute('type', 'text');
loginPasswordInput.setAttribute('type', 'password');
loginEmailInput.setAttribute('id','login-email');
loginPasswordInput.setAttribute('id', 'login-password');
loginEmailLabel.setAttribute('for','login-email');
loginPasswordLabel.setAttribute('for', 'login-password');
let loginSubmitButton = document.createElement('button');
loginSubmitButton.setAttribute('type', 'submit');
loginSubmitButton.className = 'button modal-login-reg__button';
loginSubmitButton.textContent = 'Login';
let loginFootnote = document.createElement('p');
loginFootnote.className = 'modal-login-reg__footnote';
loginFootnote.innerHTML = 'Dont have an account?';
let loginFooterLink = document.createElement('span');
loginFooterLink.textContent = 'Register';
loginFooterLink.className = 'modal-login-reg__link';
loginFootnote.append(loginFooterLink);
let loginErrorHint = document.createElement('p');
loginErrorHint.className = 'modal-login-reg__hint modal-login-reg__hint-hidden';
loginErrorHint.setAttribute('id','login-error-hint');
console.log(loginModalForm);


loginModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let login = loginEmailInput.value;
  let password = loginPasswordInput.value;
  let indexOfLoginReader = checkLoginAttempt(login, password);
  switch(indexOfLoginReader){
    case -1:
      console.log('modalopen',indexOfLoginReader);
      loginErrorHint.classList.remove('modal-login-reg__hint-hidden');
      loginErrorHint.textContent="Error: invalid login";
      break;
    case -2:
      console.log('modalopen',indexOfLoginReader);
      loginErrorHint.classList.remove('modal-login-reg__hint-hidden');
      loginErrorHint.textContent="Error: invalid password";
      break;
    default:
      console.log('modalclose',indexOfLoginReader);
      let currentReadersList = JSON.parse(localStorage.readers);
      let currentLoginStatus = JSON.parse(localStorage.loginstat);
      currentReadersList[indexOfLoginReader].readerVisits = currentReadersList[indexOfLoginReader].readerVisits + 1;
      console.log(currentReadersList[indexOfLoginReader].readerVisits);
      currentLoginStatus.loginUserStatus = 1;
      currentLoginStatus.userBonuses = currentReadersList[indexOfLoginReader].readerBonuses;
      currentLoginStatus.userFirstName = currentReadersList[indexOfLoginReader].readerFirstName;
      currentLoginStatus.userLastName = currentReadersList[indexOfLoginReader].readerLastName;
      currentLoginStatus.userVisits = currentReadersList[indexOfLoginReader].readerVisits;
      currentLoginStatus.userCard = currentReadersList[indexOfLoginReader].libraryCardNumber;
      currentLoginStatus.userEmail = currentReadersList[indexOfLoginReader].readerEmail;
      currentLoginStatus.userBooks = currentReadersList[indexOfLoginReader].readerBooks;
      currentLoginStatus.userSubscription = currentReadersList[indexOfLoginReader].readerSubscription;
      localStorage.readers = JSON.stringify(currentReadersList);
      localStorage.loginstat = JSON.stringify(currentLoginStatus);
      console.log(JSON.parse(localStorage.readers)[indexOfLoginReader]);
      updateContentWhenStetusChanged();
      closeModal();
      break;
  }    
});

const openLoginModal = () => {
  bodyLock();
  overlayModal.classList.remove('modal-hidden');
  removeChilds(modalContainer);
  modalContainer.append(loginModal);
  loginModal.append(loginRegHeader,loginModalForm);
  loginRegHeader.append(closeRegModalButton);
  loginModalForm.append(loginFormTitle, loginEmailLabel, loginEmailInput, loginPasswordLabel, loginPasswordInput, loginSubmitButton, loginErrorHint, loginFootnote);
  loginPasswordInput.value = '';
  loginEmailInput.value = '';
  loginErrorHint.className = 'modal-login-reg__hint modal-login-reg__hint-hidden';
  loginFooterLink.addEventListener('click', () => {
    setTimeout(()=>{
      openRegisterModal();
    }, 200);
  });
}

//Profile Modal elements
let profileModal = document.createElement('div');
profileModal.className = 'modal-profile';
let profileModalSidebar = document.createElement('div');
profileModalSidebar.className = 'modal-profile__sidebar';
let profileModalContainer = document.createElement('div');
profileModalContainer.className = 'modal-profile__container';
let profileModalClose = document.createElement('button');
profileModalClose.setAttribute('type','button');
profileModalClose.setAttribute('onclick', 'closeModal()');
profileModalClose.className = 'modal-profile__close';
let profileModalTitle = document.createElement('h2');
profileModalTitle.className = 'modal-profile__title';
profileModalTitle.textContent = 'My profile';
let profileModalStats = document.createElement('div');
profileModalStats.className = 'modal-profile__stats';
let profileModalRentedBooks = document.createElement('div');
profileModalRentedBooks.className = 'modal-profile__rented';
let profileModalCardNumberCont = document.createElement('div');
profileModalCardNumberCont.className = 'modal-profile__card-number';
let profileModalFootnote = document.createElement('p');
profileModalFootnote.className = 'modal-profile__footnote';
profileModalFootnote.textContent = 'Card number';
let profileModalNumber = document.createElement('p');
profileModalNumber.className = 'modal-profile__nubmer';
let profileModalCopyButton = document.createElement('button');
profileModalCopyButton.className = 'modal-profile__copy-button';


const openProfileModal = () => {
  modalType = 'profile';
  bodyLock();
  overlayModal.classList.remove('modal-hidden');
  let currentUser = JSON.parse(localStorage.loginstat);
  removeChilds(modalContainer);
  modalContainer.append(profileModal);
  profileModal.append(profileModalSidebar, profileModalContainer);
  profileModalSidebar.innerHTML = `
    <div class="modal-profile__photo">${(currentUser.userFirstName[0]+currentUser.userLastName[0]).toUpperCase()}</div>
    <div class="modal-profile__name">${currentUser.userFirstName+" "+currentUser.userLastName}</div>
  `;
  profileModalContainer.append(profileModalClose, profileModalTitle, profileModalStats, profileModalRentedBooks, profileModalCardNumberCont);
  let booksList = '';
  currentUser.userBooks.forEach((bookData)=>{
    booksList += "<li>" + bookData + "</li>"; 
  });
  profileModalStats.innerHTML = `
    <div class="stats-icon">
      <div class="stats-icon__label">Visits</div>
      <div class="stats-icon__icon icon-visits"></div>
      <div class="stats-icon__value">${currentUser.userVisits}</div>
    </div>
    <div class="stats-icon">
      <div class="stats-icon__label">Bonuses</div>
      <div class="stats-icon__icon icon-bonuses"></div>
      <div class="stats-icon__value">${currentUser.userBonuses}</div>
    </div>
    <div class="stats-icon">
      <div class="stats-icon__label">Books</div>
      <div class="stats-icon__icon icon-books"></div>
      <div class="stats-icon__value">${currentUser.userBooks.length}</div>
    </div>
  `;
  profileModalRentedBooks.innerHTML = `
    <p class="modal-profile__label-rented">Rented books</p>
    <ul class="modal-profile__book-list">
      ${booksList}
    </ul>
  `;
  profileModalCardNumberCont.append(profileModalFootnote,profileModalNumber,profileModalCopyButton);
  profileModalNumber.textContent = currentUser.userCard;
  profileModalCopyButton.addEventListener('click', ()=>{navigator.clipboard.writeText(currentUser.userCard);});
}

//Byu Modal elements
let buyModal = document.createElement('div');
buyModal.className = 'modal-buy-card';
let buyModalHeader = document.createElement('div');
buyModalHeader.className = 'modal-buy-card__header';
let buyModalHeaderTitle = document.createElement('div');
buyModalHeaderTitle.className = 'modal-buy-card__title';
buyModalHeaderTitle.textContent = 'Buy a library card';
let buyModalClose = document.createElement('button');
buyModalClose.setAttribute('onclick','closeModal()');
buyModalClose.className = 'modal-buy-card__close';
buyModalHeader.append(buyModalHeaderTitle,buyModalClose);
let buyModalContainer = document.createElement('div');
buyModalContainer.className = 'modal-buy-card__container';
let buyModalForm = document.createElement('FORM');
buyModalForm.className = 'modal-buy-card__form';
let buyModalInputsAttrs = [
  {id: 'buy-card-number', pattern: '^(\\d{16}|\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4})$'},
  {id: 'buy-card-exp-code-1', pattern: '^\\d{2}$'},{id: 'buy-card-exp-code-2', pattern: '^\\d{2}$'},
  {id: 'buy-card-cvc', pattern: '^\\d{3}$'},
  {id: 'buy-card-name', pattern: '^[a-zA-Z]{2,}$'},
  {id: 'buy-card-postal-code', pattern: '^[\\d]{2,}$'},
  {id: 'buy-card-city', pattern: '^[a-zA-Z]{2,}$'}
];
let buyModalHints = ['Card number should be 16 digits long, XXXXXXXXXXXXXXXX or XXXX XXXX XXXX XXXX',
'Expiration date should be in format MM / YY.','Expiration date should be in format MM / YY.',
'CVV should have 3 digits.','','',''];
let buyInputs = [];
let buyLabels = [];
let buyModalLabels = ['Bank card number', 'Expiration code', '', 'CVC', 'Cardholder name', 'Postal code', 'City / Town'];
let buyModalHint = document.createElement('p');
buyModalHint.className = 'modal-buy-card__hint modal-buy-card__hint-hidden';
function showHint(){
  buyModalHint.classList.remove('modal-buy-card__hint-hidden');
  setTimeout(()=>{buyModalHint.classList.add('modal-buy-card__hint-hidden');},200);
}
buyModalInputsAttrs.forEach((inputField, index) => {
  let newInput = document.createElement('INPUT');
  let newLabel = document.createElement('LABEL');
  newInput.className = 'modal-form__input';
  newInput.setAttribute('type', 'text');
  for (let attrs in inputField) {
    newInput.setAttribute(attrs, inputField[attrs]);
    newInput.required = true;
    if (attrs == 'id') {newLabel.setAttribute('for',inputField[attrs]);}
    newLabel.textContent = buyModalLabels[index];
    newLabel.className = 'modal-form__label';
  }
  buyInputs.push(newInput);
  buyLabels.push(newLabel);
});
buyInputs.slice(1,4).forEach(input => input.className = 'modal-form__input modal-form__input-small');
let buyModalExpCodeField = document.createElement('div');
buyModalExpCodeField.className = 'exp-code-field';
buyModalExpCodeField.append(buyInputs[1],buyInputs[2]);
buyModalForm.append(buyLabels[0],buyInputs[0],buyLabels[1],buyModalExpCodeField);
for (let i=3; i<buyLabels.length; i++) {buyModalForm.append(buyLabels[i],buyInputs[i]);}
let modalBuyCardContainer = document.createElement('div');
modalBuyCardContainer.className = 'modal-buy-card__submit';
let modalBuyCardButton = document.createElement('button');
modalBuyCardButton.textContent = 'Buy';
modalBuyCardButton.className = 'button modal-buy-card__button';
modalBuyCardButton.setAttribute('type','submit');
let modalBuyCardPrice = document.createElement('div');
modalBuyCardPrice.className = 'modal-buy-card__price';
modalBuyCardPrice.textContent = '$ 25.00';
let modalBuyCardInfo = document.createElement('div');
modalBuyCardContainer.append(modalBuyCardButton,modalBuyCardPrice);
buyModalForm.append(modalBuyCardContainer);
modalBuyCardInfo.className = 'modal-buy-card__info';
modalBuyCardInfo.textContent = 'If you are live, work, attend school, or pay property taxes in New York State, you can get a $25 digital library card right now using this online form. Visitors to New York State can also use this form to apply for a temporary card.';



const openBuyModal = () => {
  bodyLock();
  overlayModal.classList.remove('modal-hidden');
  removeChilds(modalContainer);
  modalContainer.append(buyModal);
  buyModal.append(buyModalHeader,buyModalContainer);
  buyModalContainer.append(buyModalForm,modalBuyCardInfo);
  modalBuyCardButton.disabled=true;
  const checkFields = () => {
    if (!buyInputs.map(input => input.value).includes(''))
    modalBuyCardButton.disabled=false;
  }
  buyInputs.forEach((input) => {
    input.value = '';
    input.addEventListener('keyup', ()=>{checkFields()});
  });
  
  buyModalForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let currLoginStat = JSON.parse(localStorage.loginstat);
    let currReadersList = JSON.parse(localStorage.readers);
    let indexOfCurrentUser = findIndexOfUserByEmail(currLoginStat.userEmail);
    currReadersList[indexOfCurrentUser].readerSubscription = 1;
    currLoginStat.userSubscription = 1;
    localStorage.readers = JSON.stringify(currReadersList);
    localStorage.loginstat = JSON.stringify(currLoginStat);
    closeModal();
  });
}

function showUserStats(visits, bonuses, books, name, number) {
  checkCardButtonContainer.innerHTML = `
  <div class="check-form__stats-icon">
    <div class="stats-icon__value">Visits</div>
    <div class="stats-icon__icon icon-visits"></div>
    <div class="stats-icon__value">${visits}</div>
  </div>
    <div class="check-form__stats-icon">
    <div class="stats-icon__value">Bonuses</div>
    <div class="stats-icon__icon icon-bonuses"></div>
  <div class="stats-icon__value">${bonuses}</div>
  </div>
  <div class="check-form__stats-icon">
    <div class="stats-icon__value">Books</div>
    <div class="stats-icon__icon icon-books"></div>
    <div class="stats-icon__value">${books}</div>
  </div>
  `;

  document.getElementById('readers-name').value = name;
  document.getElementById('card-number').value = number;
  document.getElementById('readers-name').readOnly = true;
  document.getElementById('card-number').readOnly = true;
}

function showCheckCardButton(){
  checkCardButtonContainer.innerHTML = `<button type="submit" class="button check-form__button" id='check-form__button'>Check the card</button>`;
}

document.getElementById('check-form').addEventListener("submit", (event)=>{
  event.preventDefault();
  handleClickOnCheckCard();
})

function handleClickOnCheckCard(){
  let currList = JSON.parse(localStorage.readers);
  let testResult = 0;
  let showStats = new Promise((resolve) => {
    resolve(currList.forEach((reader) => {
      let readerFullName = `${reader.readerFirstName} ${reader.readerLastName}`;
      if (checkReaderNameInput.value == readerFullName && checkReaderNumberInput.value == reader.libraryCardNumber){
        testResult = testResult + 1;
        showUserStats(reader.readerVisits,reader.readerBonuses,reader.readerBooks.length,readerFullName,reader.libraryCardNumber);
        checkReaderNameInput.readOnly = true;
        checkReaderNumberInput.readOnly = true;
        setTimeout(()=>{
        showCheckCardButton();
        checkReaderNameInput.value = '';
        checkReaderNumberInput.value = '';
        checkReaderNameInput.readOnly = false;
        checkReaderNumberInput.readOnly = false;
        },10000);
      }
    }));
  })
  showStats.then(()=>{
      if(testResult == 0) {
        checkCardButtonContainer.innerHTML = `<p class="check-form__error-hint">Error: invalid name and card number pair</p>`
        setTimeout(()=>{
          showCheckCardButton();
        },3000);
      }
    });
}

function handleClickOutsideModals(event) {
  if (!document.getElementById('modal-container').contains(event.target)) {
    closeModal();
  } 
}

//handle click outside any modal
overlayModal.addEventListener('click', (event) => {
  handleClickOutsideModals(event);
});

//handle click event on button Register in auth dropdown
authMenuRegister.addEventListener('click', () => {
  openRegisterModal();
  authMenu.classList.remove('auth-menu-open');
});

//handle click event on button Log In in auth dropdown
authMenuLogin.addEventListener('click', () => {
  openLoginModal();
  authMenu.classList.remove('auth-menu-open');
});

function logOut(){
  localStorage.loginstat = JSON.stringify(new LoginStat);
  updateContentWhenStetusChanged();
  authMenu.classList.remove('auth-menu-open');
}

authMenuLogout.addEventListener('click', () => {
  logOut();
});

//handle click event on button Sign Up in Digital Library Cards section
signupButton.addEventListener('click', () => {
  openRegisterModal();
});

//handle click event on button Log In in Digital Library Cards section
loginButton.addEventListener('click', () => {
  openLoginModal();
});

function addBook(bookdata, currentStatus, currentreaders){
  currentStatus.userBooks.push(bookdata);
  let indexOfCurrentUser = findIndexOfUserByEmail(currentStatus.userEmail);
  currentreaders[indexOfCurrentUser].readerBooks.push(bookdata);
  localStorage.loginstat = JSON.stringify(currentStatus);
  localStorage.readers = JSON.stringify(currentreaders);
}


//handle click on book buttons
bookButtons.forEach((book) => {
  book.addEventListener('click',() => {
    let currStatus = JSON.parse(localStorage.loginstat);
    let currReadersList = JSON.parse(localStorage.readers);
    switch (currStatus.loginUserStatus) {
      case 1:
        switch(currStatus.userSubscription) {
          case 1:
            console.log('user have subscription');
            console.log(book.dataset.book);
            addBook(book.dataset.book, currStatus, currReadersList);
            updateContentWhenStetusChanged();
            break;
          case 0:
            openBuyModal();
            console.log('user have no subscription');
            break;
        }
        break;
      case 0:
        openLoginModal();
        break;
    }
  });
});

function removeChilds(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild);   
  }
}

function closeModal() {
  overlayModal.classList.add('modal-hidden');
  bodyUnlock();
}