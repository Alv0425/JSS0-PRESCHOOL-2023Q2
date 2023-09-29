'use strict';

//Open-close filter menu
filterButton.addEventListener('click', () => {
  filterButton.classList.toggle('header__filter-button-rot');
  searchFilter.classList.toggle('search__filter-show');
  body.classList.toggle('body-lock');
});

document.addEventListener('click', (event) => {
  if (!filterButton.contains(event.target) && !searchFilter.contains(event.target) && !searchContainer.contains(event.target)){
    filterButton.classList.remove('header__filter-button-rot');
    searchFilter.classList.remove('search__filter-show');
    body.classList.remove('body-lock');
  }
});

//Reset button in search form
headerSearchInput.onkeyup = () => {
  if (headerSearchInput.value) {
    headerSearchButton.disabled = false;
  } else {
    headerSearchButton.disabled = true;
  }
}

headerSearchButton.onclick = (event) => {
  event.preventDefault();
  headerSearchInput.value = '';
  headerSearchButton.disabled = true;
}