import data from './data';
import { GetBallOptions, createCard } from './toysCards';
import { setSliderValues } from './sliders';

interface GetFilters {
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
  quantity: number[];
  years: number[];
  sortValue: string;
  activeCardsNums: string[];
  searchValue: string;
}

let filters: GetFilters = {
  shape: [],
  color: [],
  size: [],
  favorite: false,
  quantity: [1, 12],
  years: [1940, 2020],
  sortValue: 'abc',
  activeCardsNums: [],
  searchValue: '',
};

function filterToys(toysArr: GetBallOptions[]) {
  if (filters.shape.length > 0) {
    toysArr = toysArr.filter((toy) => filters.shape.indexOf(toy.shape) !== -1);
  }
  if (filters.color.length > 0) {
    toysArr = toysArr.filter((toy) => filters.color.indexOf(toy.color) !== -1);
  }
  if (filters.size.length > 0) {
    toysArr = toysArr.filter((toy) => filters.size.indexOf(toy.size) !== -1);
  }
  if (filters.favorite === true) {
    toysArr = toysArr.filter((toy) => toy.favorite === true);
  }
  if (filters.quantity[0] !== 1 || filters.quantity[1] !== 12) {
    toysArr = toysArr.filter((toy) => toy.count >= filters.quantity[0] && toy.count <= filters.quantity[1]);
  }
  if (filters.years[0] !== 1940 || filters.years[1] !== 2020) {
    toysArr = toysArr.filter((toy) => toy.year >= filters.years[0] && toy.year <= filters.years[1]);
  }
  return toysArr;
}
function sortToys(toysArr: GetBallOptions[]) {
  if (filters.sortValue === 'abc') {
    toysArr.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (filters.sortValue === 'abc-revert') {
    toysArr.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (filters.sortValue === 'increase') {
    toysArr.sort((a, b) => a.year - b.year);
  }
  if (filters.sortValue === 'decrease') {
    toysArr.sort((a, b) => b.year - a.year);
  }
  return toysArr;
}
function searchCards(toysArr: GetBallOptions[]) {
  const searchValue = (filters.searchValue as string).toLowerCase().trim();
  toysArr = toysArr.filter((toy) => toy.name.toLocaleLowerCase().indexOf(searchValue) !== -1);
  return toysArr;
}
function updateToysCards() {
  const cardsContainer = document.querySelector('.toys-page__cards') as HTMLDivElement;
  cardsContainer.innerHTML = '';
  let sortAndFilterToys = sortToys(filterToys(data));
  if (filters.searchValue !== '') {
    sortAndFilterToys = searchCards(sortAndFilterToys);
  }
  if (sortAndFilterToys.length !== 0) {
    sortAndFilterToys.forEach((filterToy) => {
      const filterCard = createCard(filterToy);
      if (filters.activeCardsNums.length !== 0 && filters.activeCardsNums.includes(filterToy.num)) {
        filterCard.setAttribute('data-is-active', 'true');
        filterCard.classList.add('card-active');
        filterCard.style.opacity = '0';
      }
      cardsContainer.appendChild(filterCard);
      setTimeout(() => {
        filterCard.style.opacity = '1';
      }, 500);
    });
  } else cardsContainer.innerHTML = '<p class="message">Извините, совпадений не обнаружено</p>';
}
const filterForm = document.querySelector('.filters-by-values__forms') as HTMLUListElement;

filterForm.addEventListener('click', (ev: Event) => {
  const shapeToy = (ev.target as HTMLElement).closest('.filters-by-values__form');
  if (!shapeToy) return;
  shapeToy.classList.toggle('form-active');
  if (shapeToy.classList.contains('form-active')) filters.shape.push(shapeToy.getAttribute('data-shape') as string);
  else filters.shape = filters.shape.filter((str) => str !== (shapeToy.getAttribute('data-shape') as string));
  updateToysCards();
});

const filterColor = document.querySelector('.filters-by-values__colors') as HTMLUListElement;

filterColor.addEventListener('click', (ev: Event) => {
  const colorToy = (ev.target as HTMLElement).closest('.filters-by-values__color');
  if (!colorToy) return;
  colorToy.classList.toggle('color-active');
  if (colorToy.classList.contains('color-active')) filters.color.push(colorToy.getAttribute('data-color') as string);
  else filters.color = filters.color.filter((str) => str !== (colorToy.getAttribute('data-color') as string));
  updateToysCards();
});

const filterSize = document.querySelector('.filters-by-values__sizes') as HTMLUListElement;

filterSize.addEventListener('click', (ev: Event) => {
  const sizeToy = (ev.target as HTMLElement).closest('.filters-by-values__size');
  if (!sizeToy) return;
  sizeToy.classList.toggle('size-active');
  if (sizeToy.classList.contains('size-active')) filters.size.push(sizeToy.getAttribute('data-size') as string);
  else filters.size = filters.size.filter((str) => str !== (sizeToy.getAttribute('data-size') as string));
  updateToysCards();
});

const filterFavorite = document.querySelector('#favorite') as HTMLInputElement;

filterFavorite.addEventListener('click', () => {
  filterFavorite.classList.toggle('favorite-active');
  if (filterFavorite.classList.contains('favorite-active')) filters.favorite = true;
  else filters.favorite = false;
  updateToysCards();
});

const selectSort = document.querySelector('.sort__list') as HTMLSelectElement;
selectSort.addEventListener('change', () => {
  filters.sortValue = selectSort.value;
  updateToysCards();
});

const search = document.querySelector('.header__search') as HTMLInputElement;
search.addEventListener('input', () => {
  filters.searchValue = search.value;
  updateToysCards();
});
const resetSettingsBtn = document.querySelector('.toys-page__reset-settings') as HTMLButtonElement;
resetSettingsBtn.addEventListener('click', () => {
  document.location.reload();
  window.localStorage.clear();
});
window.addEventListener('beforeunload', () => {
  localStorage.clear();
  localStorage.setItem('thisFilters', JSON.stringify(filters));
  const pages = Array.from(document.querySelectorAll('section'));
  const currentPage = pages.filter((page) => !page.classList.contains('hide'));
  sessionStorage.setItem('currentPage', currentPage[0].classList[0]);
});

function getLocalStorage() {
  if (localStorage.getItem('thisFilters')) {
    const filtersJson = localStorage.getItem('thisFilters');
    filters = JSON.parse(filtersJson as string);
    const selectedShapes = document.querySelectorAll('.filters-by-values__form');
    const selectedColors = document.querySelectorAll('.filters-by-values__color');
    const selectedSizes = document.querySelectorAll('.filters-by-values__size');
    const selectedBallsEl = document.querySelector('.selected-balls__num') as HTMLSpanElement;

    selectedShapes.forEach((element) => {
      if (filters.shape.includes(element.getAttribute('data-shape') as string)) {
        element.classList.add('form-active');
      }
    });
    selectedColors.forEach((element) => {
      if (filters.color.includes(element.getAttribute('data-color') as string)) {
        (element as HTMLElement).click();
      }
    });
    selectedSizes.forEach((element) => {
      if (filters.size.includes(element.getAttribute('data-size') as string)) {
        element.classList.add('size-active');
      }
    });
    if (filters.favorite === true) {
      filterFavorite.click();
    }
    selectSort.value = filters.sortValue;
    selectedBallsEl.textContent = filters.activeCardsNums.length.toString();
    search.value = filters.searchValue;
    setSliderValues('sliderQuantity', filters.quantity);
    setSliderValues('sliderYear', filters.years);
  }
  updateToysCards();
}
export { filters, updateToysCards, sortToys, getLocalStorage };
