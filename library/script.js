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