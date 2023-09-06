/*Слайдер в секции About. Изображения позиционированы 
в flex контейнере, со свойством justify-content:center. 
Первый и последний элемент этого контейнера free-space-left, free-space-right 
имеют переменную ширину, через которую обеспечивается нужное смещение блока с картинками.
Код ниже меняет классы этих блоков в зависимости от состояния слайдера.*/
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
  paginationButtons[currentSliderStatus-1].disabled = true;
  paginationButtons[prevSliderStatus-1].disabled = false;
  pagArrowRight.disabled = (currentSliderStatus == 5);
  pagArrowLeft.disabled = (currentSliderStatus == 1);
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

//Обработка жестов (вправо-влево)
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

//Handle onresize: move slider to initial stage
window.addEventListener("resize", () => {
  prevSliderStatus = currentSliderStatus;
  currentSliderStatus = 1;
  handleSlider();
  paginationButtons[0].disabled = true;
});