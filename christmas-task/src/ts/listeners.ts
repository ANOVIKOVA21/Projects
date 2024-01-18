import data from './data';
import { createCard } from './toysCards';
import { filters, sortToys, getLocalStorage } from './filters';
import { showWarning } from './general-fn';

export function addListeners() {
  const mainEl = document.querySelector('main') as HTMLElement;
  const startPage = mainEl.querySelector('.start-page') as HTMLElement;
  const toysPage = mainEl.querySelector('.toys-page') as HTMLElement;
  const treesPage = mainEl.querySelector('.decoration-page') as HTMLElement;
  const startBtn = startPage.querySelector('.start-page__btn') as HTMLButtonElement;
  const menu = document.querySelector('.header__menu') as HTMLUListElement;
  const hiddenElements = document.querySelectorAll('.hide');
  const cardsContainer = toysPage.querySelector('.toys-page__cards') as HTMLDivElement;

  function generatePage(page: HTMLElement) {
    const headerHideEl = document.querySelectorAll('.header .hide');
    mainEl.style.height = 'auto';
    if (page === toysPage) {
      if (localStorage.getItem('thisFilters')) getLocalStorage();
      else {
        const sortData = sortToys(data);
        sortData.forEach((toy) => {
          const card = createCard(toy);
          cardsContainer.appendChild(card);
          card.style.opacity = '1';
        });
      }
      treesPage.classList.add('hide');
      toysPage.classList.remove('hide');
      headerHideEl.forEach((el) => el.classList.remove('hide'));
    } else if (page === treesPage) {
      toysPage.classList.add('hide');
      treesPage.classList.remove('hide');
      headerHideEl.forEach((el) => {
        if (el.classList.contains('header__menu-item')) el.classList.remove('hide');
      });
    }
  }
  startBtn.addEventListener('click', () => {
    hiddenElements.forEach((el) => {
      if (!el.classList.contains('decoration-page')) el.classList.remove('hide');
    });
    startPage.classList.add('hide');
    generatePage(toysPage);
  });
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('currentPage')) {
      const currentPage = document.querySelector(`.${sessionStorage.getItem('currentPage')}`) as HTMLElement;
      if (currentPage === startPage) return;
      currentPage.classList.remove('hide');
      startPage.classList.add('hide');
      generatePage(currentPage);
    }
  });
  menu.addEventListener('click', (ev: Event) => {
    const target = ev.target as HTMLElement;
    if (target.closest('.menu-item-toys')) {
      generatePage(toysPage);
    } else if (target.closest('.menu-item-tree')) {
      generatePage(treesPage);
    }
  });
  cardsContainer.addEventListener('click', (ev: Event) => {
    const card = (ev.target as HTMLElement).closest('.card');
    if (card != null) {
      const selectedBallsEl = document.querySelector('.selected-balls__num') as HTMLSpanElement;
      card.classList.toggle('card-active');
      const atr = card.getAttribute('data-card-num') as string;
      let chosenToy = filters.activeCardsNums.length;
      if (card.classList.contains('card-active')) {
        if (chosenToy === 20) {
          showWarning(cardsContainer);
          card.classList.remove('card-active');
        } else {
          chosenToy++;
          card.setAttribute('data-is-active', 'true');
          filters.activeCardsNums.push(atr);
        }
      } else {
        chosenToy--;
        card.setAttribute('data-is-active', 'false');
        console.log(filters.activeCardsNums);
        filters.activeCardsNums = filters.activeCardsNums.filter((num) => num !== atr);
        console.log(filters.activeCardsNums);
      }
      selectedBallsEl.textContent = chosenToy.toString();
    }
  });
}
