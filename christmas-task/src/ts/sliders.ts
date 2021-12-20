import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { filters, updateToysCards } from './filters';

const sliderQuantity = <target>document.querySelector('.filters-by-range__quantity');
const sliderQuantityValues = document.querySelectorAll('.filters-by-range__quantity-value');

noUiSlider.create(sliderQuantity, {
  start: [1, 12],
  connect: true,
  range: {
    min: 1,
    max: 12,
  },
  step: 1,
});

sliderQuantity.noUiSlider.on('update', function (values, handle) {
  sliderQuantityValues[handle].innerHTML = parseInt(values[handle] as string).toString();
  filters.quantity[handle] = parseInt(values[handle] as string);
  console.log(filters);
  updateToysCards();
});

const sliderYear = <target>document.querySelector('.filters-by-range__year');
const sliderYearValues = document.querySelectorAll('.filters-by-range__year-value');
noUiSlider.create(sliderYear, {
  start: [1940, 2020],
  connect: true,
  range: {
    min: 1940,
    max: 2020,
  },
  step: 1,
});

sliderYear.noUiSlider.on('update', function (values, handle) {
  sliderYearValues[handle].innerHTML = parseInt(values[handle] as string).toString();
  filters.years[handle] = parseInt(values[handle] as string);
  console.log(filters);
  updateToysCards();
});

const resetBtn = document.querySelector('.toys-page__reset') as HTMLButtonElement;
resetBtn.addEventListener('click', () => {
  const forms: NodeListOf<HTMLElement> = document.querySelectorAll('.filters-by-values__form');
  const colors: NodeListOf<HTMLElement> = document.querySelectorAll('.filters-by-values__color');
  const sizes: NodeListOf<HTMLElement> = document.querySelectorAll('.filters-by-values__size');
  const favorite = document.getElementById('favorite') as HTMLInputElement;
  const search = document.querySelector('.header__search') as HTMLInputElement;
  forms.forEach((el) => {
    if (el.classList.contains('form-active')) el.click();
  });
  colors.forEach((el) => {
    if (el.classList.contains('color-active')) el.click();
  });
  sizes.forEach((el) => {
    if (el.classList.contains('size-active')) el.click();
  });
  if (favorite.classList.contains('favorite-active')) favorite.click();
  sliderQuantity.noUiSlider.set([1, 12]);
  sliderYear.noUiSlider.set([1940, 2020]);
  search.value = '';

  updateToysCards();
});
