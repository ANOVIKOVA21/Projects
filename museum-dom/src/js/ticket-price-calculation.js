const ticketInfo = {
  typeOfTicket: 0,
  prices: [20, 25, 40],
  basicAmount: 1,
  seniorAmount: 1,
};

function countSumOfTicket() {
  const sumOfTicket = document.querySelector('.tickets__total-price');
  const { basicAmount, seniorAmount, typeOfTicket, prices } = ticketInfo;
  const sum =
    basicAmount * prices[typeOfTicket] +
    (seniorAmount * prices[typeOfTicket]) / 2;
  sumOfTicket.innerHTML = `${sum}`;
}

function less(element) {
  element.value === '0' ? (element.value = 0) : element.value--;
  element.dispatchEvent(new Event('input', { bubbles: true }));
}

function more(element) {
  element.value === '20' ? (element.value = 20) : element.value++;
  element.dispatchEvent(new Event('input', { bubbles: true }));
}
export function addTicketListeners() {
  const ticketsTypeContainer = document.querySelector('.tickets__type');
  const typesOfTicketElem = document.querySelectorAll('.tickets__type label');
  const ticketBasic = document.querySelector('#basic');
  const ticketSenior = document.querySelector('#senior');
  const btnPlus = document.querySelectorAll('.btn-plus');
  const btnMinus = document.querySelectorAll('.btn-minus');
  function getTicketType(element) {
    for (let i = 0; i < typesOfTicketElem.length; i++) {
      if (typesOfTicketElem[i] === element) {
        ticketInfo.typeOfTicket = i;
      }
    }
  }
  btnPlus.forEach((btn) => {
    btn.addEventListener('click', () => more(btn.previousElementSibling));
  });
  btnMinus.forEach((btn) => {
    btn.addEventListener('click', () => less(btn.nextElementSibling));
  });
  ticketsTypeContainer.addEventListener('click', (event) => {
    if (!(event.target.tagName === 'LABEL')) return;
    getTicketType(event.target);
    countSumOfTicket();
  });
  ticketBasic.addEventListener('input', () => {
    ticketInfo.basicAmount = ticketBasic.value;
    countSumOfTicket();
  });
  ticketSenior.addEventListener('input', () => {
    ticketInfo.seniorAmount = ticketSenior.value;
    countSumOfTicket();
  });
}
