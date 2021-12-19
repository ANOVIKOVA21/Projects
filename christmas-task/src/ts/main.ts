import '../styles.css';
import data from './data';
import { createCard } from './toysCards';
import './sliders';
import { sortToys } from './filters';

let chosenToy = 0;

function showWarning(parent: HTMLDivElement) {
  const warningEl = document.createElement('div');
  warningEl.classList.add('warning');
  warningEl.textContent = 'Извините, все слоты заполнены';
  parent.appendChild(warningEl);
  setTimeout(() => {
    warningEl.remove();
  }, 3000);
}
document.addEventListener('DOMContentLoaded', function () {
  const cardsContainer = document.querySelector('.toys-page__cards') as HTMLDivElement;
  const sortData = sortToys(data);
  console.log(sortData);
  sortData.forEach((toy) => {
    const card = createCard(toy);
    cardsContainer.appendChild(card);
  });

  cardsContainer.addEventListener('click', (ev: Event) => {
    const card = (ev.target as HTMLElement).closest('.card');

    if (card != null) {
      const selectedBallsEl = document.querySelector('.selected-balls__num') as HTMLSpanElement;
      card.classList.toggle('card-active');
      if (card.classList.contains('card-active')) {
        if (chosenToy === 20) {
          showWarning(cardsContainer);
          card.classList.remove('card-active');
        } else chosenToy++;
      } else chosenToy--;

      selectedBallsEl.textContent = chosenToy.toString();
    }
  });
});
