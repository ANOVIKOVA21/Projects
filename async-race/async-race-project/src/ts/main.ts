import '../styles.css';
import { pasteGenericHtml, renderHtmlForGarage, renderHtmlForWinners } from './html';
import { addListeners } from './listeners';
import { rememberOptions } from './member-options';

async function start() {
  await pasteGenericHtml();
  await renderHtmlForGarage();
  await addListeners();
  const garagePageBtn: HTMLButtonElement | null = document.querySelector('.header__btn-garage');
  const winnersPageBtn: HTMLButtonElement | null = document.querySelector('.header__btn-winners');
  const carCardsAll = document.querySelectorAll('.car-card');
  console.log('main carCards', carCardsAll);
  garagePageBtn?.addEventListener('click', async () => {
    await renderHtmlForGarage(rememberOptions.currentGaragePage);
    addListeners();
    const inputCarName = document.querySelectorAll<HTMLInputElement>('.cars-settings__input');
    const inputColor = document.querySelectorAll<HTMLInputElement>('.cars-settings__color-selection');
    inputCarName[0].value = rememberOptions.inputName;
    inputCarName[1].value = rememberOptions.inputNewName;
    inputColor[0].value = rememberOptions.inputColor;
    inputColor[1].value = rememberOptions.inputNewColor;
  });
  winnersPageBtn?.addEventListener('click', () => {
    renderHtmlForWinners();
  });
}
start();
