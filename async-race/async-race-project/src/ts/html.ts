import { getCars, getCar, getWinners } from './request';
import { rememberOptions } from './member-options';
function getCarImg(color: string, id: number) {
  return `<svg class="car-img" data-car-num="${id}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 -30 172 172" style=" fill:#000000;">
<g transform="translate(-4.3,-4.3) scale(1.05,1.05)">
    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
        font-family="none" font-weight="none" font-size="none" text-anchor="none"
        style="mix-blend-mode: normal">
        <path d="M0,172v-172h172v172z" fill="none"></path>
        <g>
            <g>
                <circle cx="17" cy="42" transform="scale(2.6875,2.6875)" r="6" fill="#57565c">
                </circle>
                <circle cx="49" cy="42" transform="scale(2.6875,2.6875)" r="6" fill="#57565c">
                </circle>
                <path d="M8.0625,102.125v-10.75l10.75,-10.75l-10.75,-8.0625v-8.0625l10.75,-2.6875l40.71563,3.30563l31.84688,47.75687h-29.5625c0,-8.90559 -7.21941,-16.125 -16.125,-16.125c-8.90559,0 -16.125,7.21941 -16.125,16.125h-16.125c-2.96486,-0.00885 -5.36615,-2.41014 -5.375,-5.375z"
                    fill="${color}"></path>
                <path d="M163.9375,102.125v5.375c-0.00885,2.96486 -2.41014,5.36615 -5.375,5.375h-10.75c0,-8.90559 -7.21941,-16.125 -16.125,-16.125c-8.90559,0 -16.125,7.21941 -16.125,16.125h-24.1875l-31.84688,-47.75687l58.72187,4.75687h24.1875c7.67795,-0.00936 14.77346,4.09209 18.5975,10.75h-10.535c-1.48427,0 -2.6875,1.20323 -2.6875,2.6875v5.375c0,1.48427 1.20323,2.6875 2.6875,2.6875h13.4375z"
                    fill="${color}"></path>
                <path d="M48.375,48.375l11.15313,16.74313l-40.71563,-3.30563z" fill="#d1d3d4">
                </path>
                <path d="M163.9375,91.375h-13.4375c-1.48427,0 -2.6875,-1.20323 -2.6875,-2.6875v-5.375c0,-1.48427 1.20323,-2.6875 2.6875,-2.6875h10.535c1.91263,3.25879 2.91503,6.97141 2.9025,10.75z"
                    fill="#e6e7e8"></path>
                <path d="M118.25,69.875l-58.72187,-4.75687l-11.15313,-16.74313l29.5625,-5.375z"
                    fill="#e6e7e8"></path>
                <rect x="29" y="28" transform="scale(2.6875,2.6875)" width="4" height="2"
                    fill="#000000"></rect>
                <rect x="16" y="41" transform="scale(2.6875,2.6875)" width="2" height="2"
                    fill="#000000"></rect>
                <rect x="48" y="41" transform="scale(2.6875,2.6875)" width="2" height="2"
                    fill="#000000"></rect>
                <path d="M142.4375,67.1875h-23.35975l-39.64869,-26.4235c-0.57971,-0.38678 -1.28699,-0.53324 -1.97263,-0.4085l-29.5625,5.375c-0.21779,0.0405 -0.42986,0.10728 -0.63156,0.19888l-29.33944,13.33538l-10.5135,2.62838c-1.19575,0.29955 -2.03441,1.37417 -2.03444,2.60687v8.0625c0,0.84591 0.39827,1.64245 1.075,2.15l8.27213,6.20275l-8.55969,8.55969c-0.50404,0.50389 -0.78729,1.18735 -0.78744,1.90006v16.125c0,4.4528 3.6097,8.0625 8.0625,8.0625h13.6525c1.32842,9.2498 9.25279,16.11742 18.5975,16.11742c9.34471,0 17.26908,-6.86761 18.5975,-16.11742h48.805c1.32842,9.2498 9.25279,16.11742 18.5975,16.11742c9.34471,0 17.26908,-6.86761 18.5975,-16.11742h8.2775c4.4528,0 8.0625,-3.6097 8.0625,-8.0625v-16.125c-0.01629,-13.35163 -10.83587,-24.17121 -24.1875,-24.1875zM159.40906,83.3125c0.81025,1.6993 1.35845,3.51152 1.62594,5.375h-10.535v-5.375zM108.12888,66.35975l-47.07962,-3.81894l-8.17,-12.25231l24.46969,-4.4505zM54.22031,61.98719l-24.86475,-2.01563l18.05194,-8.20494zM10.75,107.5v-2.6875h8.0625v-5.375h-8.0625v-6.94987l9.96256,-9.96256c0.55083,-0.55085 0.83553,-1.3136 0.78036,-2.09065c-0.05517,-0.77705 -0.44479,-1.49192 -1.06792,-1.95942l-9.675,-7.25625v-4.61981l8.28825,-2.07206l38.96875,3.15781l28.34775,42.50281h-22.06975c-1.32842,-9.2498 -9.25279,-16.11742 -18.5975,-16.11742c-9.34471,0 -17.26908,6.86761 -18.5975,16.11742h-13.6525c-1.48427,0 -2.6875,-1.20323 -2.6875,-2.6875zM45.6875,126.3125c-7.42133,0 -13.4375,-6.01617 -13.4375,-13.4375c0,-7.42133 6.01617,-13.4375 13.4375,-13.4375c7.42133,0 13.4375,6.01617 13.4375,13.4375c-0.00889,7.41764 -6.01986,13.42861 -13.4375,13.4375zM131.6875,126.3125c-7.42133,0 -13.4375,-6.01617 -13.4375,-13.4375c0,-7.42133 6.01617,-13.4375 13.4375,-13.4375c7.42133,0 13.4375,6.01617 13.4375,13.4375c-0.00889,7.41764 -6.01986,13.42861 -13.4375,13.4375zM158.5625,110.1875h-8.2775c-1.32842,-9.2498 -9.25279,-16.11742 -18.5975,-16.11742c-9.34471,0 -17.26908,6.86761 -18.5975,16.11742h-20.27719l-27.96613,-41.94919l53.40331,4.32419h24.1875c4.9159,-0.00058 9.63535,1.92966 13.14187,5.375h-5.07937c-2.96853,0 -5.375,2.40647 -5.375,5.375v5.375c0,2.96853 2.40647,5.375 5.375,5.375h10.75v5.375h-8.0625v5.375h8.0625v2.6875c0,1.48427 -1.20323,2.6875 -2.6875,2.6875z"
                    fill="#000000"></path>
            </g>
        </g>
    </g>
</g>
</svg>`;
}
const carsSettings = `<div class="cars-settings">
<div class="cars-settings__container">
    <input type="text" class="cars-settings__input" placeholder="Car name">
    <input type="color" value="#ff0000" class="cars-settings__color-selection">
    <button type="button" class="create-btn button">Create</button>
</div>
<div class="cars-settings__container">
    <input type="text" class="cars-settings__input" placeholder="New car name">
    <input type="color" value="#00ffff" class="cars-settings__color-selection">
    <button type="button" class="update-btn button" disabled>Update</button>
</div>
<div class="cars-settings__container">
    <button type="button" class="race-btn button">Race</button>
    <button type="button" class="reset-btn button">Reset</button>
    <button type="button" class="generate-btn button">Generate cars</button>
</div>
</div>`;

export function getCarCard(name: string, color: string, id: number) {
  return `<div class="car-card" id="${id}" data-anim-is-run="false">
<h3 class="car-card__name">${name}</h3>
<div>
    <button type="button" class="select-btn button">Select</button>
    <button type="button" class="remove-btn button">Remove</button>
</div>
<div>
    <button type="button" class="start-btn button">Start</button>
    <button type="button" class="stop-btn button" disabled>Stop</button>
</div>
${getCarImg(color, id)}
</div>`;
}
// function getGarageSect(amountOfCars: string, pageNum: number) {
//   return `${carsSettings}
// <section class="garage">
//     <h1>Garage(<span id="amountOfCarsEl">${amountOfCars}</span>)</h1>
//     <h2>Page <span id="garagePageNumEl">${pageNum}</span></h2>
//     <div class="cars-cards"></div>
//     <div>
//         <button type="button" class="prev-btn button">Prev</button>
//         <button type="button" class="next-btn button">Next</button>
//     </div></section>`;
// }
function getGarageSect() {
  return `${carsSettings}
<section class="garage">
    <h1>Garage(<span id="amountOfCarsEl"></span>)</h1>
    <h2>Page <span id="garagePageNumEl"></span></h2>
    <div class="cars-cards"></div>
    <div class="container-pages-btns">
        <button type="button" class="prev-btn button"disabled>Prev</button>
        <button type="button" class="next-btn button"disabled>Next</button>
    </div></section>`;
}
function getWinnerSect(amountOfWinners: string, pageNum: number) {
  return `<section class="winners">
    <h1>Winners(<span id="amountOfWinnersEl">${amountOfWinners}</span>)</h1>
    <h2>Page <span id="winnersPageNumEl">${pageNum}</span></h2>
    <table>
        <thead class="table-head">
            <tr>
                <th>Number</th>
                <th>Car</th>
                <th>Name</th>
                <th>Wins</th>
                <th>Best time (sec)</th>
            </tr>
        </thead>
        <tbody id="table-body"></tbody>
    </table></section>`;
}
function getRowOfWinnersTable(num: number, carImg: string, name: string, wins: number, time: number) {
  return `<tr>
            <td>${num}</td>
            <td>${carImg}</td>
            <td>${name}</td>
            <td>${wins}</td>
            <td>${time}</td>
            </tr>`;
}
export async function pasteGenericHtml() {
  document.body.innerHTML = `<header class="header">
<button type="button" class="header__btn-garage button">To garage</button>
<button type="button" class="header__btn-winners button">To winners</button>
</header>
<main></main>`;
}
export async function renderCarsCards(page: number) {
  const carsData = await getCars(page);
  const amountOfCarsEl = document.getElementById('amountOfCarsEl') as HTMLSpanElement;
  const garagePageNumEl = document.getElementById('garagePageNumEl') as HTMLSpanElement;
  const cardsContainer = document.querySelector('.cars-cards') as HTMLDivElement;
  cardsContainer.innerHTML = '';
  amountOfCarsEl.innerHTML = carsData.amount;
  garagePageNumEl.innerHTML = String(page);
  carsData.cars.forEach((car) => {
    cardsContainer.insertAdjacentHTML('beforeend', getCarCard(car.name, car.color, car.id as number));
  });
}
export async function renderHtmlForGarage(page = 1) {
  const main = document.querySelector('main') as HTMLElement;
  main.innerHTML = getGarageSect();
  renderCarsCards(page);
}

export async function renderHtmlForWinners(page = 1) {
  const winnersData = await getWinners(page);
  const main = document.querySelector('main') as HTMLElement;
  main.innerHTML = getWinnerSect(winnersData.amount, page);
  const tableBody: HTMLElement | null = document.getElementById('table-body');
  winnersData.winners.forEach(async (winner, index) => {
    rememberOptions.winners.push({ id: winner.id as number, wins: winner.wins });
    const winCar = await getCar(winner.id as number);
    tableBody?.insertAdjacentHTML(
      'beforeend',
      getRowOfWinnersTable(index + 1, getCarImg(winCar.color, winCar.id), winCar.name, winner.wins, winner.time)
    );
  });
}
