import { addRippleEffect } from './animation';
import { ticketInfo } from './ticket-price-calculation';
import {
  checkValidation,
  validate,
  checkAmount,
  validateAmount,
} from './validation';
import { deleteError, makeReadonlyInput } from './general-functions';

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
  const typeOptions = form.querySelectorAll('.booking__ticket-type li');
  const ticketTypeInput = form.ticketType;
  const overviewType = ticketsSection.querySelector('.overview__type');
  const basicPrice = ticketsSection.querySelectorAll('.basic-price');
  const seniorPrice = ticketsSection.querySelectorAll('.senior-price');
  const { typeOfTicket, prices } = ticketInfo;
  ticketTypeInput.value = typeOptions[typeOfTicket].textContent;
  overviewType.textContent = ticketTypeInput.value;
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
  checkAmount(form);
  overviewAmount[0].textContent = basicAmount;
  overviewAmount[1].textContent = seniorAmount;
}

export function addFormListeners() {
  updateMinAndMaxYear();
  const ticketsBuyButton = ticketsSection.querySelector('.tickets__buy');
  const ticketsForm = ticketsSection.querySelector('.booking__tickets');
  const fieldsToCheck = ticketsSection.querySelectorAll('.field-validation');
  const ticketsAmountElem = form.querySelectorAll('.booking__num');
  const basicAmountInput = form.basicAmount;
  const seniorAmountInput = form.seniorAmount;
  const expirationDate = ticketsSection.querySelectorAll(
    '.overview__total input[type="number"]'
  );
  const closeFormButton = ticketsForm.querySelector('.booking__close');
  const bookButton = ticketsForm.querySelector('.overview__button');

  ticketsBuyButton.addEventListener('click', () => {
    ticketsForm.hidden = false;
    ticketsSection.style.contentVisibility = 'visible';
    basicAmountInput.value = ticketInfo.basicAmount;
    seniorAmountInput.value = ticketInfo.seniorAmount;
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
  ticketsAmountElem.forEach((amountEl) => {
    amountEl.addEventListener('input', (ev) => {
      validateAmount(amountEl, ev);
      updateTicketAmount();
      updateTotalPrice();
    });
  });
  fieldsToCheck.forEach((input) => {
    if (input.name !== 'time') {
      input.addEventListener('blur', (ev) => {
        const { target } = ev;
        if (target.validity.valid) return;
        validate(target, target.name);
      });
    }
  });
  fieldsToCheck.forEach((input) =>
    input.addEventListener('focus', (ev) => deleteError(ev.target))
  );
  fieldsToCheck.forEach((input) => {
    if (input.name !== 'time' && input.name !== 'date') {
      input.addEventListener('input', (ev) => {
        const validityState = input.validity;
        if (!validityState.valueMissing && !validityState.patternMismatch) {
          input.setCustomValidity('');
          deleteError(ev.target);
        }
      });
    }
  });
  expirationDate.forEach((el) => makeReadonlyInput(el));
  bookButton.addEventListener('click', (ev) => {
    addRippleEffect(ev, bookButton);
    const validationState = form.checkValidity();
    if (!validationState) {
      ev.preventDefault();
      checkValidation();
    }
  });
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const validationState = form.checkValidity();
    if (validationState) {
      if (checkAmount(form)) {
        console.log('submit form');
        form.submit();
      }
    } else {
      console.log('submit form was not submitted');
    }
  });
}
