"use strict";
console.log('%cLibrary #2, Адаптивная вёрстка', 'font-weight:700; color:blue;');
console.log('Оценка 50/50. ')

let p1 = '1. Вёрстка соответствует макету. Ширина экрана 768px +26\n';
let p2 = '2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n';
let p3 = '3. На ширине экрана 768px реализовано адаптивное меню +12  \n'; 


let review = p1+p2+p3;

console.log(review);

const navBar = document.getElementById("navbar");
const navButton = document.getElementById('navbutton');
//const navCont = document.getElementById('navcontainer');
const body = document.getElementById('body');
const navLinks = document.querySelectorAll('li a');
//const mainCont = document.getElementById('main');
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
  //navCont.classList.remove("header__navbar-open");
 // body.classList.remove("body-locked");
  bodyUnlock();
  //mainCont.classList.remove("blur-overlay");
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
        //navCont.classList.add("header__navbar-open");
        //body.classList.add("body-locked");
        bodyLock();
      //mainCont.classList.add("blur-overlay");
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

paginationButtons.forEach((button) => {button.addEventListener('click', () => {
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
    if (touchstart - touchend > 100) {
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
    
    if (touchend - touchstart > 100) {
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
          favcontent.addEventListener('animationend', ()=> {resolve(switchSeasons());},{once:true});
          favcontent.addEventListener('animationcancel', (event)=> {
            if (event.animationName == 'fade-in') {
              favcontent.classList.add('favorites__content-hidden');
              favcontent.classList.remove('favorites__content-show');
              favcontent.addEventListener('animationend', ()=> {resolve(switchSeasons());},{once:true});
            } else {resolve(switchSeasons());}            
          },{once:true});
        }
      }
    })
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


function closeModal() {
  overlayModal.classList.add('modal-hidden');
  bodyUnlock();
}

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
    if (login == readersList[i].libraryCardNumber || login == readersList[i].readerEmail) {
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
      userButton.innerHTML = (currentUser.userFirstName[0] + currentUser.userLastName[0]).toUpperCase();
      userButton.title = currentUser.userFirstName + ' ' + currentUser.userLastName;
      authMenuLogin.classList.add('auth-menu__item-hidden');
      authMenuRegister.classList.add('auth-menu__item-hidden');
      authMenuLogout.classList.remove('auth-menu__item-hidden');
      authMenuMyProfile.classList.remove('auth-menu__item-hidden');
      authMenuTitle.innerHTML = currentUser.userCard;
      //Digital Library Cards section
      getformTitle.innerHTML = 'Visit your profile';
      getformDescription.innerHTML = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
      loginButton.classList.add('get-form__button-hidden');
      signupButton.classList.add('get-form__button-hidden');
      profileButton.classList.remove('get-form__button-hidden');
      //Modal Profile
      authMenuMyProfile.addEventListener('click',()=>{
        console.log('modal profile is opened');
        openProfileModal();
        authMenu.classList.remove('auth-menu-open');
      });
      profileButton.addEventListener('click', ()=>{
        openProfileModal();
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

      bookButtons.forEach((button) => {
        button.disabled = false;
        button.innerHTML = 'Buy';
      });

      getformTitle.innerHTML = 'Get a reader card';
      getformDescription.innerHTML = 'You will be able to see a reader card after logging into account or you can register a new account';
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
  for (let i=0; i < 9; i++) {
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

const openRegisterModal = () => {
  modalType = 'register';
  overlayModal.classList.remove('modal-hidden');
  bodyLock();
  modalContainer.innerHTML = `
  <div class="modal-login-reg" id="modal-reg">
  <div class="modal-login-reg__header">
      <div class="modal-login-reg__close" onclick="closeModal()" id="close-modal-reg"></div>
  </div>
  <form class="modal-login-reg__container modal-form" id="reg-form">
      <div class="modal-login-reg__title">Register</div>
      <label for="reg-first-name" class="modal-form__label">First name</label>
      <input type="text" class="modal-form__input" id="reg-first-name" required>
      <label for="reg-last-name" class="modal-form__label">Last name</label>
      <input type="text" class="modal-form__input" id="reg-last-name" required>
      <label for="reg-email" class="modal-form__label">E-mail</label>
      <input type="email" class="modal-form__input" id="reg-email" required>
      <label for="reg-password" class="modal-form__label">Password</label>
      <input type="password" class="modal-form__input" pattern="[a-zA-Z1-9]{8,}" id="reg-password" required>
      <button type="submit" class="button modal-login-reg__button" id="reg-form-button">Sign Up</button>
      <p class="modal-login-reg__hint modal-login-reg__hint-hidden" id="reg-error-hint">Error: user with same email have already exists.</p>
      <p class="modal-login-reg__footnote">Already have an account?<span class="modal-login-reg__link" id="login-link">Login</span></p>
  </form>
  </div>
  `; 

// Registration of new reader
  const regForm = document.getElementById('reg-form');
  const regFirstName = document.getElementById('reg-first-name');
  const regLastName = document.getElementById('reg-last-name');
  const regEmail = document.getElementById('reg-email');
  const regPassword = document.getElementById('reg-password');

  regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newReader = new Reader();
    newReader.readerFirstName = regFirstName.value;
    newReader.readerLastName = regLastName.value;
    newReader.readerEmail = regEmail.value;
    newReader.readerPassword = regPassword.value;
    if (findIndexOfUserByEmail(regEmail.value) == -1) {
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
      document.getElementById('reg-error-hint').classList.remove('modal-login-reg__hint-hidden');
      console.log('user with same email have already exists');
    }
    
  });

  document.getElementById('login-link').addEventListener('click', () => {
    setTimeout(()=>{
      openLoginModal();
    }, 200);
  })
}

const openLoginModal = () => {
  modalType = 'login';
  bodyLock();
  overlayModal.classList.remove('modal-hidden');
  modalContainer.innerHTML = `
  <div class="modal-login-reg" id="modal-login">
    <div class="modal-login-reg__header">
      <div class="modal-login-reg__close" onclick="closeModal()"></div>
    </div>
    <form class="modal-login-reg__container" id="login-form">
      <div class="modal-login-reg__title">Login</div>
      <label for="login-email" class="modal-form__label">E-mail or readers card</label>
      <input type="text" class="modal-form__input" id="login-email" required>
      <label for="login-password" class="modal-form__label">Password</label>
      <input type="password" class="modal-form__input" id="login-password" required>
      <button type="submit" class="button modal-login-reg__button">Log In</button>
      <p class="modal-login-reg__hint modal-login-reg__hint-hidden" id="login-error-hint">Error: Invalid login or password.</p>
      <p class="modal-login-reg__footnote">Dont have an account?<span class="modal-login-reg__link" id="reg-link">Register</span></p>
    </form>
  </div>
  `;

  //log-in process
  const loginForm = document.getElementById('login-form');
  const loginLogin = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let login = loginLogin.value;
    let password = loginPassword.value;
    let indexOfLoginReader = checkLoginAttempt(login, password);
    switch(indexOfLoginReader){
      case -1:
        console.log('modalopen',indexOfLoginReader);
        document.getElementById('login-error-hint').classList.remove('modal-login-reg__hint-hidden');
        document.getElementById('login-error-hint').innerHTML="Error: invalid login";
        break;
      case -2:
        console.log('modalopen',indexOfLoginReader);
        document.getElementById('login-error-hint').classList.remove('modal-login-reg__hint-hidden');
        document.getElementById('login-error-hint').innerHTML="Error: invalid password";
        break;
      default:
        console.log('modalclose',indexOfLoginReader);
        let currentReadersList = JSON.parse(localStorage.readers);
        let currentLoginStatus = JSON.parse(localStorage.loginstat);
        currentReadersList[indexOfLoginReader].readerVisits += 1;
        currentLoginStatus.loginUserStatus = 1;
        currentLoginStatus.userBonuses = currentReadersList[indexOfLoginReader].readerBonuses;
        currentLoginStatus.userFirstName = currentReadersList[indexOfLoginReader].readerFirstName;
        currentLoginStatus.userLastName = currentReadersList[indexOfLoginReader].readerLastName;
        currentLoginStatus.userVisits = currentReadersList[indexOfLoginReader].readerVisits;
        currentLoginStatus.userCard = currentReadersList[indexOfLoginReader].libraryCardNumber;
        currentLoginStatus.userEmail = currentReadersList[indexOfLoginReader].readerEmail;
        currentLoginStatus.userBooks = currentReadersList[indexOfLoginReader].readerBooks;
        currentLoginStatus.userSubscription = currentReadersList[indexOfLoginReader].readerSubscription;
        console.log(currentReadersList[indexOfLoginReader].readerVisits);
        localStorage.readers = JSON.stringify(currentReadersList);
        localStorage.loginstat = JSON.stringify(currentLoginStatus);
        console.log(JSON.parse(localStorage.readers)[indexOfLoginReader]);
        updateContentWhenStetusChanged();
        closeModal();
        break;
    }    
  });


  document.getElementById('reg-link').addEventListener('click', () => {
    setTimeout(()=>{
      openRegisterModal();
    }, 200);
  });
}

const openProfileModal = () => {
  modalType = 'profile';
  bodyLock();
  overlayModal.classList.remove('modal-hidden');
  let currentUser = JSON.parse(localStorage.loginstat);
  modalContainer.innerHTML = `
  <div class="modal-profile">
    <div class="modal-profile__sidebar">
      <div class="modal-profile__photo">${(currentUser.userFirstName[0]+currentUser.userLastName[0]).toUpperCase()}</div>
      <div class="modal-profile__name">${currentUser.userFirstName+" "+currentUser.userLastName}</div>
    </div>
    <div class="modal-profile__container">
      <div class="modal-profile__close" onclick="closeModal()"></div>
      <div class="modal-profile__title">My profile</div>
      <div class="modal-profile__stats">
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
      </div>
      <div class="modal-profile__rented">
        <p class="modal-profile__label-rented">Rented books</p>
        <ul class="modal-profile__book-list">
          
        </ul>
      </div>
      <div class="modal-profile__card-number">
        <p class="modal-profile__footnote">Card number</p>
        <p class="modal-profile__nubmer">${currentUser.userCard}</p>
        <button class="modal-profile__copy-button" id="copy-number-button"></button>
      </div>
    </div>
  </div>
  `;
  document.getElementById("copy-number-button").addEventListener('click', ()=>{navigator.clipboard.writeText(currentUser.userCard);})
}

const openBuyModal = () => {
  modalType = 'login';
  bodyLock();
  overlayModal.classList.remove('modal-hidden');
  modalContainer.innerHTML = `
  <div class="modal-buy-card">
  <div class="modal-buy-card__header">
      <div class="modal-buy-card__title">Buy a library card</div>
      <div class="modal-buy-card__close" onclick="closeModal()"></div>
  </div>
  <div class="modal-buy-card__container">
      <form class="modal-buy-card__form">
          <label for="buy-card-number" class="modal-form__label">Card number</label>
          <input type="text" class="modal-form__input" id="buy-card-number" pattern="^(\\d{16}|\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4})$" required>
          <label for="buy-card-exp-code-1" class="modal-form__label">Expiration code</label>
          <div class="exp-code-field">
              <input type="text" class="modal-form__input modal-form__input-small" id="buy-card-exp-code-1" pattern="^\\d{2}$" required>
              <input type="text" class="modal-form__input modal-form__input-small" id="buy-card-exp-code-2" pattern="^\\d{2}$" required>
          </div>
          <label for="buy-card-cvc" class="modal-form__label">CVC</label>
          <input type="text" class="modal-form__input modal-form__input-small" id="buy-card-cvc"  pattern="^\\d{3}$" required>
          <label for="buy-card-name" class="modal-form__label">Cardholder name</label>
          <input type="text" class="modal-form__input" id="buy-card-name" required>
          <label for="buy-card-postal-code" class="modal-form__label">Postal code</label>
          <input type="text" class="modal-form__input" id="buy-card-postal-code" required>
          <label for="buy-card-city" class="modal-form__label">City / Town</label>
          <input type="text" class="modal-form__input" id="buy-card-city" required>
          <div class="modal-buy-card__submit"><button type="submit" class="button modal-buy-card__button" id="buy-subscription-button">Buy</button>
              <div class="modal-buy-card__price">&dollar;25.00</div>
          </div>
      </form>
      <div class="modal-buy-card__info">If you are live, work, attend school, or pay property taxes in New York State, you can get a $25 digital library card right now using this online form. Visitors to New York State can also use this form to apply for a temporary card.</div>
    </div>
  </div>
  `;
  document.getElementById('buy-subscription-button').addEventListener('click', (event)=>{
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

function handleClickOutsideModals(event) {
  if (!document.getElementById('modal-container').contains(event.target)) {
 //   event.preventDefault();
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
            break;
          case 0:
            openBuyModal();
            console.log('user havent subscription');
            break;
        }
        break;
      case 0:
        openLoginModal();
        break;
    }
  });
});












