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
const seasons = ['winter','spring','summer','autumn'];
const winter = document.querySelectorAll('.book.winter');
const spring = document.querySelectorAll('.book.spring');
const summer = document.querySelectorAll('.book.summer');
const autumn = document.querySelectorAll('.book.autumn');
const seasonBooks = [winter, spring, summer, autumn];
let seasonChecked = 'winter';
let previousSeasonChecked = 'winter';
const radioCheck = () => {
  for (let i = 0; i < seasonButtons.length; i++) {
    if (seasonButtons[i].checked) {
      previousSeasonChecked = seasonChecked;
      seasonChecked = seasonButtons[i].value;
    }
  }
  if (previousSeasonChecked !== seasonChecked) {
    seasonBooks[seasons.indexOf(previousSeasonChecked)].forEach(book => {
      book.classList.remove('favorites-show');
      book.classList.add('fav-hidden');
      setTimeout(() => {
        for (let i = 0; i < seasonButtons.length; i++) {
          if (seasonButtons[i].checked) {
            seasonChecked = seasonButtons[i].value;
          }
        }
        book.classList.remove('fav-hidden');
        book.classList.add('favorites-hide');
        seasonBooks[seasons.indexOf(seasonChecked)].forEach(book => {
          book.classList.remove('favorites-hide');
          book.classList.add('fav-hidden');
          book.classList.add('favorites-show');
          setTimeout(() => {
            book.classList.remove('fav-hidden');
          }, 200);
        });
      }, 200);           
    });
  }
}

seasonButtons.forEach((rbutton) => {
  rbutton.addEventListener('click', () => {
    radioCheck();
  })
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
const overlayModal = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');
const signupButton = document.getElementById('signup-getform');
const loginButton = document.getElementById('login-getform');

function closeModal() {
  overlayModal.classList.add('modal-hidden');
  bodyUnlock();
}

const readersList = [];
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
  }
}
const loginStatDefault = new LoginStat();

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
    this.readerStatus = 'readerStatus';
    this.libraryCardNumber = 'libraryCardNumber';
  }
}


window.addEventListener('load', () => {
  if(localStorage.hasOwnProperty('readers')) {
    console.log(localStorage.readers);
  } else {
    localStorage.readers = JSON.stringify([]);
  }
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
    newReader.readerVisits = 1;
    newReader.readerStatus = 0;
    newReader.libraryCardNumber = generateCardNumber();
    readersList.push(newReader);
    console.log(JSON.stringify(readersList));
    localStorage.readers = JSON.stringify(readersList);
    localStorage.loginstat = JSON.stringify(loginStatDefault);
    setTimeout(()=>{
      openLoginModal();
    }, 200);
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

function handleClickOutsideModals(event) {
  if (!document.getElementById('modal-container').contains(event.target)) {
    event.preventDefault();
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

//handle click event on button Sign Up in Digital Library Cards section
signupButton.addEventListener('click', () => {
  openRegisterModal();
});

//handle click event on button Log In in Digital Library Cards section
loginButton.addEventListener('click', () => {
  openLoginModal();
});













