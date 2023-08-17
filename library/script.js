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

const handleCloseMenu = () => {
  navBar.classList.remove("navbar-open");
  navButton.classList.remove("close");
  //navCont.classList.remove("header__navbar-open");
  body.classList.remove("body-locked");
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
        body.classList.add("body-locked");
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
})
});

pagArrowLeft.addEventListener('click', () => {
  if(currentSliderStatus > 1) {
    prevSliderStatus = currentSliderStatus;
    currentSliderStatus -= 1;
    handleSlider();
  }
});

pagArrowRight.addEventListener('click', () => {
  if(currentSliderStatus < 5) {
    prevSliderStatus = currentSliderStatus;
    currentSliderStatus += 1;
    handleSlider();
  }
});



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
    if(seasonButtons[i].checked){
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
          if(seasonButtons[i].checked){
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

//Register modal
const authMenuRegister = document.getElementById('auth-reg');
const overlayModal = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');
const signupButton = document.getElementById('signup-getform');

function closeModal() {
  overlayModal.classList.add('modal-hidden');
}

const openRegisterModal = () => {
  modalType = 'register';
  overlayModal.classList.remove('modal-hidden');
  modalContainer.innerHTML = `
  <div class="modal-login-reg" id="modal-reg">
  <div class="modal-login-reg__header">
      <div class="modal-login-reg__close" onclick="closeModal()" id="close-modal-reg"></div>
  </div>
  <form class="modal-login-reg__container modal-form">
      <div class="modal-login-reg__title">Register</div>
      <label for="reg-first-name" class="modal-form__label">First name</label>
      <input type="text" class="modal-form__input" id="reg-first-name">
      <label for="reg-last-name" class="modal-form__label">Last name</label>
      <input type="text" class="modal-form__input" id="reg-last-name">
      <label for="reg-email" class="modal-form__label">E-mail</label>
      <input type="email" class="modal-form__input" id="reg-email">
      <label for="reg-password" class="modal-form__label">Password</label>
      <input type="password" class="modal-form__input" id="reg-password">
      <button type="button" class="button modal-login-reg__button">Sign Up</button>
      <p class="modal-login-reg__footnote">Already have an account?<span class="modal-login-reg__link" id="login-link">Login</span></p>
  </form>
  </div>
  `; 
  document.getElementById('login-link').addEventListener('click', () => {
    setTimeout(()=>{
      openLoginModal();
    }, 200);
  })
}

const openLoginModal = () => {
  modalType = 'login';
  overlayModal.classList.remove('modal-hidden');
  modalContainer.innerHTML = `
  <div class="modal-login-reg" id="modal-login">
    <div class="modal-login-reg__header">
      <div class="modal-login-reg__close" onclick="closeModal()"></div>
    </div>
    <form class="modal-login-reg__container">
      <div class="modal-login-reg__title">Login</div>
      <label for="login-email" class="modal-form__label">E-mail or readers card</label>
      <input type="text" class="modal-form__input" id="login-email">
      <label for="login-password" class="modal-form__label">Password</label>
      <input type="password" class="modal-form__input" id="login-password">
      <button type="button" class="button modal-login-reg__button">Log In</button>
      <p class="modal-login-reg__footnote">Dont have an account?<span class="modal-login-reg__link" id="reg-link">Register</span></p>
    </form>
  </div>
  `;
  document.getElementById('reg-link').addEventListener('click', () => {
    setTimeout(()=>{
      openRegisterModal();
    }, 200);
  })
}

function handleClickOutsideModals(event) {
  if (!document.getElementById('modal-container').contains(event.target)) {
    closeModal();
  } 
}

overlayModal.addEventListener('click', (event) => {
  handleClickOutsideModals(event);
})

authMenuRegister.addEventListener('click', () => {
  openRegisterModal();
  authMenu.classList.remove('auth-menu-open');
});

signupButton.addEventListener('click', () => {
  openRegisterModal();
});









