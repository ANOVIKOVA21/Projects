import data from './data';
import { GetBallOptions, createCard } from './toysCards';

interface GetFilters {
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
  quantity: number[];
  years: number[];
  sortValue: string;
}

const filters: GetFilters = {
  shape: [],
  color: [],
  size: [],
  favorite: false,
  quantity: [],
  years: [],
  sortValue: 'abc',
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
  console.log(toysArr);
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
  console.log(toysArr);
  return toysArr;
}
function updateToysCards() {
  const cardsContainer = document.querySelector('.toys-page__cards') as HTMLDivElement;
  cardsContainer.innerHTML = '';
  const sortAndFilterToys = sortToys(filterToys(data));
  if (sortAndFilterToys.length !== 0) {
    sortAndFilterToys.forEach((filterToy) => {
      const filterCard = createCard(filterToy);
      cardsContainer.appendChild(filterCard);
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
  console.log(filters);
  updateToysCards();
});

const filterColor = document.querySelector('.filters-by-values__colors') as HTMLUListElement;

filterColor.addEventListener('click', (ev: Event) => {
  const colorToy = (ev.target as HTMLElement).closest('.filters-by-values__color');
  if (!colorToy) return;
  colorToy.classList.toggle('color-active');
  if (colorToy.classList.contains('color-active')) filters.color.push(colorToy.getAttribute('data-color') as string);
  else filters.color = filters.color.filter((str) => str !== (colorToy.getAttribute('data-color') as string));
  console.log(filters);
  updateToysCards();
});

const filterSize = document.querySelector('.filters-by-values__sizes') as HTMLUListElement;

filterSize.addEventListener('click', (ev: Event) => {
  const sizeToy = (ev.target as HTMLElement).closest('.filters-by-values__size');
  if (!sizeToy) return;
  sizeToy.classList.toggle('size-active');
  if (sizeToy.classList.contains('size-active')) filters.size.push(sizeToy.getAttribute('data-size') as string);
  else filters.size = filters.size.filter((str) => str !== (sizeToy.getAttribute('data-size') as string));
  console.log(filters);
  updateToysCards();
});

const filterFavorite = document.querySelector('#favorite') as HTMLInputElement;

filterFavorite.addEventListener('click', () => {
  filterFavorite.classList.toggle('favorite-active');
  if (filterFavorite.classList.contains('favorite-active')) filters.favorite = true;
  else filters.favorite = false;
  console.log(filters);
  updateToysCards();
});

const selectSort = document.querySelector('.sort__list') as HTMLSelectElement;
selectSort.addEventListener('click', () => {
  console.log(selectSort.value);
  filters.sortValue = selectSort.value;
  updateToysCards();
});

export { filters, updateToysCards, sortToys };
