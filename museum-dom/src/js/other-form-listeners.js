import { addRippleEffect } from './animation';

function updateMinAndMaxYear() {
  const inputCardYear = document.querySelector('.overview__card-year');
  const year = new Date().getFullYear();
  inputCardYear.setAttribute('min', year);
  inputCardYear.setAttribute('max', year + 5);
}

export function addFormListeners() {
  updateMinAndMaxYear();
  const ticketsSection = document.getElementById('tickets');
  const ticketsBuyButton = ticketsSection.querySelector('.tickets__buy');
  const ticketsForm = ticketsSection.querySelector('.booking__tickets');
  const closeFormButton = ticketsForm.querySelector('.booking__close');
  const bookButton = ticketsForm.querySelector('.overview__button');
  ticketsBuyButton.addEventListener('click', () => {
    ticketsForm.hidden = false;
    ticketsSection.style.contentVisibility = 'visible';
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
  bookButton.addEventListener('click', (ev) => addRippleEffect(ev, bookButton));
}
