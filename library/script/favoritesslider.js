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
          setTimeout(()=>{resolve(switchSeasons());},700);
        } else {
          setTimeout(()=>{resolve(switchSeasons());},700);
        }
      }
    });
  }
  //После того как анимация затухания закончилась, карточки заменились, класс контейнера с opacity = 0 удаляется.
  hideAll().then(()=>{
    favcontent.classList.remove('favorites__content-hidden');
    favcontent.classList.add('favorites__content-show');
  });
}

//Обработчик событий по клику на радиокнопку
seasonButtons.forEach((rbutton) => {
  rbutton.addEventListener('click', (event) => {
    hideShowBooks(event);
  });
});