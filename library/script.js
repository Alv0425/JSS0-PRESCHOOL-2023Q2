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




