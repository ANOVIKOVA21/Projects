import { addRippleEffect } from './animation';
import { ticketInfo } from './ticket-price-calculation';

const ticketsSection = document.getElementById('tickets');
const form = document.querySelector('.booking__form');

function updateMinAndMaxYear() {
  const inputCardYear = document.querySelector('.overview__card-year');
  const year = new Date().getFullYear();
  inputCardYear.setAttribute('min', year);
  inputCardYear.setAttribute('max', year + 5);
}
export function updateTotalPrice() {
  const overviewPrice = ticketsSection.querySelectorAll('.overview__price');
  const overviewTotalPrice = ticketsSection.querySelector(
    '.overview__total-price'
  );
  const { basicAmount, seniorAmount, typeOfTicket, prices } = ticketInfo;
  const basicAmountTotalPrice = basicAmount * prices[typeOfTicket];
  const seniorAmountTotalPrice = (seniorAmount * prices[typeOfTicket]) / 2;
  overviewPrice[0].textContent = `${basicAmountTotalPrice} €`;
  overviewPrice[1].textContent = `${seniorAmountTotalPrice} €`;
  overviewTotalPrice.textContent = `${
    basicAmountTotalPrice + seniorAmountTotalPrice
  } €`;
}
export function updateTicketType() {
  const selectType = form.typeOfTicket;
  const overviewType = ticketsSection.querySelector('.overview__type');
  const basicPrice = ticketsSection.querySelectorAll('.basic-price');
  const seniorPrice = ticketsSection.querySelectorAll('.senior-price');
  const { typeOfTicket, prices } = ticketInfo;
  selectType.selectedIndex = typeOfTicket;
  overviewType.textContent = selectType.value;
  basicPrice.forEach((el) => {
    el.textContent = prices[typeOfTicket];
  });
  seniorPrice.forEach((el) => {
    el.textContent = prices[typeOfTicket] / 2;
  });
  updateTotalPrice();
}
function updateTicketAmount() {
  const overviewAmount = ticketsSection.querySelectorAll('.overview__amount');
  const { basicAmount, seniorAmount } = ticketInfo;
  overviewAmount[0].textContent = basicAmount;
  overviewAmount[1].textContent = seniorAmount;
}

export function addFormListeners() {
  updateMinAndMaxYear();
  const ticketsBuyButton = ticketsSection.querySelector('.tickets__buy');
  const ticketsForm = ticketsSection.querySelector('.booking__tickets');
  const basicAmountInput = form.basicAmount;
  const seniorAmountInput = form.seniorAmount;
  const closeFormButton = ticketsForm.querySelector('.booking__close');
  const bookButton = ticketsForm.querySelector('.overview__button');

  ticketsBuyButton.addEventListener('click', () => {
    ticketsForm.hidden = false;
    ticketsSection.style.contentVisibility = 'visible';
    const { basicAmount, seniorAmount } = ticketInfo;
    basicAmountInput.value = basicAmount;
    seniorAmountInput.value = seniorAmount;
    updateTicketAmount();
    updateTicketType();
    setTimeout(() => {
      ticketsForm.style.right = '0';
    }, 500);
  });
  closeFormButton.addEventListener('click', () => {
    ticketsForm.style.right = '-100%';
    setTimeout(() => {
      ticketsForm.hidden = true;
    }, 1000);
  });
  const inputMonth = document.getElementById('card-month');
  inputMonth.addEventListener('input', () => {
    const { value } = inputMonth;
    if (value < 10) inputMonth.value = `0${value}`;
  });
  basicAmountInput.addEventListener('input', () => {
    ticketInfo.basicAmount = basicAmountInput.value;
    updateTicketAmount();
    updateTotalPrice();
  });
  seniorAmountInput.addEventListener('input', () => {
    ticketInfo.seniorAmount = seniorAmountInput.value;
    updateTicketAmount();
    updateTotalPrice();
  });
  bookButton.addEventListener('click', (ev) => addRippleEffect(ev, bookButton));
}
