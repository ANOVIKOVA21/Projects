import { ticketInfo } from './ticket-price-calculation';
import { updateTicketType } from './other-form-listeners';

function hideOptions(container, select) {
  if (!container.classList.contains('arrow-open')) return;
  select.style.display = 'none';
  container.classList.remove('arrow-open');
}

function showOptions(target, select, container, textEl) {
  container.classList.add('arrow-open');
  select.style.display = 'block';
  select.focus();
  if (target.closest('option')) {
    textEl.textContent = target.textContent;
    select.style.display = 'none';
  }
}
export function addSelectListeners() {
  const timeContainer = document.querySelector('.booking__time-container');
  const selectTime = document.querySelector('.booking__time');
  const ticketTypeContainer = document.querySelector(
    '.booking__type-container'
  );
  const selectType = document.querySelector('.booking__ticket-type');
  selectTime.addEventListener('blur', () => {
    hideOptions(timeContainer, selectTime);
  });
  selectType.addEventListener('blur', () => {
    hideOptions(ticketTypeContainer, selectType);
  });
  selectTime.addEventListener('click', (ev) => {
    const { target } = ev;
    const timeText = document.querySelector('.booking__time-text');
    showOptions(target, selectTime, timeContainer, timeText);
    if (!target.closest('option')) return;
    const overviewTime = document.querySelector('.overview__time');
    overviewTime.innerHTML = selectTime.selectedOptions[0].value;
  });
  selectType.addEventListener('click', (ev) => {
    const { target } = ev;
    const typeText = document.querySelector('.booking__type-text');
    showOptions(target, selectType, ticketTypeContainer, typeText);
    if (!target.closest('option')) return;
    ticketInfo.typeOfTicket = selectType.selectedIndex;
    updateTicketType();
  });
}
