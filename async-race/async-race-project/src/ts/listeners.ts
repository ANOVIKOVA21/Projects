import { getCars, createCar, deleteCar, updateCar, createWinner, updateWinner, deleteWinner } from './request';
import { renderCarsCards, getCarCard } from './html';
import { brandsCars, modelsCars } from './models-brands-cars';
import { getRandomNum, getRandomColor, showWinner } from './general-functions';
import { rememberOptions } from './member-options';
import { GetSuccessCars, startAnimation, stopAnimation, checkAnimation } from './animation';
let resetRace = false;
export async function updateNavigation() {
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const minAmountOfPages = 1;
  if (rememberOptions.currentGaragePage === minAmountOfPages) {
    prevBtn.disabled = true;
  }
  if (rememberOptions.currentGaragePage === rememberOptions.totalPages) {
    nextBtn.disabled = true;
  }
  if (rememberOptions.currentGaragePage > minAmountOfPages) {
    prevBtn.disabled = false;
  }
  if (rememberOptions.currentGaragePage < rememberOptions.totalPages) {
    nextBtn.disabled = false;
  }
  if (rememberOptions.totalPages > minAmountOfPages && rememberOptions.currentGaragePage < rememberOptions.totalPages) {
    nextBtn.disabled = false;
  }
  if (rememberOptions.totalPages === minAmountOfPages) {
    nextBtn.disabled = true;
    prevBtn.disabled = true;
  }
}
async function controlAmountOfCars(page = rememberOptions.currentGaragePage) {
  const amountOfCars = (await getCars(page)).amount;
  const amountOfCarsEl = document.getElementById('amountOfCarsEl') as HTMLSpanElement;
  amountOfCarsEl.innerHTML = amountOfCars;
  const maxAmountPerPage = 7;
  const amountOfPages = Math.ceil(Number(amountOfCars) / maxAmountPerPage);
  rememberOptions.totalPages = amountOfPages;
  if (Number(amountOfCars) >= maxAmountPerPage) await renderCarsCards(page);
  updateNavigation();
}
async function createCarCard(name: string, color: string, container: HTMLDivElement | null) {
  const newCarInfo = await createCar({ name: name, color: color });
  container?.insertAdjacentHTML('beforeend', getCarCard(newCarInfo.name, newCarInfo.color, newCarInfo.id));
}

export async function updateBtnsBehavior(eventName: string, target?: HTMLElement) {
  const carCard: HTMLDivElement | null = target?.closest('.car-card') ?? null;
  const winnersPageBtn: HTMLButtonElement | null = document.querySelector('.header__btn-winners');
  const startBtn = carCard?.querySelector('.start-btn') as HTMLButtonElement;
  const stopBtn = carCard?.querySelector('.stop-btn') as HTMLButtonElement;
  if (eventName === 'transitionstart') {
    winnersPageBtn && (winnersPageBtn.disabled = true);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else if (eventName === 'clickStop') {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  } else {
    winnersPageBtn && (winnersPageBtn.disabled = false);
  }
}

export async function addListeners() {
  const createBtn: HTMLButtonElement | null = document.querySelector('.create-btn');
  const updateBtn: HTMLButtonElement | null = document.querySelector('.update-btn');
  const generateCarsBtn: HTMLButtonElement | null = document.querySelector('.generate-btn');
  const raceBtn: HTMLButtonElement | null = document.querySelector('.race-btn');
  const resetBtn: HTMLButtonElement | null = document.querySelector('.reset-btn');
  const inputCarName = document.querySelectorAll<HTMLInputElement>('.cars-settings__input');
  const inputColor = document.querySelectorAll<HTMLInputElement>('.cars-settings__color-selection');
  const carCardsAll = document.querySelectorAll<HTMLElement>('.car-card');
  const cardsContainer: HTMLDivElement | null = document.querySelector('.cars-cards');
  const btnsContainer: HTMLDivElement | null = document.querySelector('.container-pages-btns');
  let selectedCarId: number;

  createBtn?.addEventListener('click', async () => {
    createCarCard(inputCarName[0].value, inputColor[0].value, cardsContainer);
    inputCarName[0].value = '';
    controlAmountOfCars();
  });
  updateBtn?.addEventListener('click', async () => {
    const newCarData = await updateCar(selectedCarId, { name: inputCarName[1].value, color: inputColor[1].value });
    const selectedCard = document.getElementById(String(selectedCarId)) as HTMLElement;
    selectedCard.outerHTML = getCarCard(newCarData.name, newCarData.color, newCarData.id);
    updateBtn.disabled = true;
    inputCarName[1].value = '';
  });
  generateCarsBtn?.addEventListener('click', async () => {
    const amountOfNewCars = 100;
    for (let i = 0; i < amountOfNewCars; i++) {
      const randomBrand = brandsCars[getRandomNum(0, brandsCars.length - 1)];
      const randomModel = modelsCars[getRandomNum(0, modelsCars.length - 1)];
      const randomColor = getRandomColor();
      createCarCard(`${randomBrand} ${randomModel}`, randomColor, cardsContainer);
    }
    controlAmountOfCars(rememberOptions.currentGaragePage);
  });
  raceBtn?.addEventListener('click', async () => {
    const carsData = await getCars(rememberOptions.currentGaragePage);
    const promises: Promise<GetSuccessCars | void>[] = [];
    carsData.cars.forEach((car) => {
      const carCard = document.getElementById(`${car.id}`) as HTMLDivElement;
      promises.push(startAnimation(car.id as number, carCard, carCardsAll));
    });

    const successCars = (await Promise.all(promises)).filter((carInfo) => carInfo !== undefined) as GetSuccessCars[];
    if (resetRace) {
      resetRace = false;
      return;
    }
    if (successCars.length < 1) return;
    const winner = successCars.sort((a, b) => a.time - b.time)[0];

    showWinner(winner.name, winner.time);
    if (rememberOptions.winners.some((win) => win.id === winner.id)) {
      rememberOptions.winners.forEach((win) => {
        if (win.id === winner.id) {
          win.wins++;
          updateWinner(winner.id, { wins: win.wins, time: winner.time });
        }
      });
    } else {
      createWinner({ id: winner.id, wins: 1, time: winner.time });
      rememberOptions.winners.push({ id: winner.id, wins: 1 });
    }
  });
  resetBtn?.addEventListener('click', async () => {
    const carsData = await getCars(rememberOptions.currentGaragePage);
    carsData.cars.forEach((car) => {
      stopAnimation(car.id as number);
      updateBtnsBehavior('clickStop', document.getElementById(`${car.id}`) as HTMLElement);
    });
    updateBtnsBehavior('activeWinnersBtn', resetBtn);
    if (!checkAnimation(carCardsAll)) resetRace = true;
  });
  cardsContainer?.addEventListener('click', async (ev) => {
    const target = ev.target as HTMLElement;
    if (target.tagName != 'BUTTON') return;
    const carCard: HTMLDivElement | null = target.closest('.car-card');
    const idCard = Number(carCard?.id);
    if (target === target.closest('.remove-btn')) {
      await deleteCar(idCard);
      carCard?.remove();
      rememberOptions.winners.forEach((winner, index) => {
        if (winner.id === idCard) {
          deleteWinner(idCard);
          rememberOptions.winners.splice(index, 1);
        }
      });
      controlAmountOfCars();
    }
    if (target === target.closest('.select-btn')) {
      carCard?.classList.toggle('selected');
      if (selectedCarId && selectedCarId !== idCard) {
        const prevCard = document.getElementById(String(selectedCarId));
        prevCard?.classList.remove('selected');
      }
      if (carCard?.classList.contains('selected')) {
        (updateBtn as HTMLButtonElement).disabled = false;
        selectedCarId = idCard;
      } else (updateBtn as HTMLButtonElement).disabled = true;
    }
    if (target === target.closest('.start-btn')) {
      startAnimation(idCard, carCard, carCardsAll);
    }
    if (target === target.closest('.stop-btn')) {
      stopAnimation(idCard);
      updateBtnsBehavior('clickStop', target);
      checkAnimation(carCardsAll);
    }
  });
  cardsContainer?.addEventListener('transitionstart', (ev) => {
    const target = ev.target as HTMLElement;
    updateBtnsBehavior('transitionstart', target);
  });
  btnsContainer?.addEventListener('click', (ev) => {
    const target = ev.target as HTMLElement;
    if (target.tagName != 'BUTTON') return;
    const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
    const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
    if (target === prevBtn && rememberOptions.currentGaragePage > 1) {
      rememberOptions.currentGaragePage--;
    }
    if (target === nextBtn && rememberOptions.currentGaragePage < rememberOptions.totalPages) {
      rememberOptions.currentGaragePage++;
    }
    controlAmountOfCars(rememberOptions.currentGaragePage);
  });
  inputCarName[0].addEventListener('input', () => {
    rememberOptions.inputName = inputCarName[0].value;
  });
  inputCarName[1].addEventListener('input', () => {
    rememberOptions.inputNewName = inputCarName[1].value;
  });
  inputColor[0].addEventListener('input', () => {
    console.log('color');
    rememberOptions.inputColor = inputColor[0].value;
  });
  inputColor[1].addEventListener('input', () => {
    rememberOptions.inputNewColor = inputColor[1].value;
  });
}
