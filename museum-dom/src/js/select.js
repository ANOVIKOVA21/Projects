import { ticketInfo } from './ticket-price-calculation';
import { updateTicketType } from './other-form-listeners';
import { validate } from './validation';
import { deleteError, makeReadonlyInput } from './general-functions';

function hideOptions(container, listEl) {
  if (!container.classList.contains('arrow-open')) return;
  container.classList.remove('arrow-open');
  listEl.classList.remove('select-active');
  listEl.classList.add('select-not-active');
}

function showOptions(listEl, container) {
  if (container.classList.contains('arrow-open'))
    return hideOptions(container, listEl);
  container.classList.add('arrow-open');
  listEl.classList.remove('select-not-active');
  listEl.classList.add('select-active');
  listEl.focus();
}
function showSelectedValues(target, input, container, listEl) {
  input.value = target.textContent;
  const prevValue = container.querySelector('.selected');
  if (prevValue) prevValue.classList.remove('selected');
  target.classList.add('selected');
  hideOptions(container, listEl);
}
export function addSelectListeners() {
  const form = document.querySelector('.booking__form');
  const timeInput = form.time;
  const timeContainer = timeInput.parentElement;
  const timeList = form.querySelector('.booking__time');
  const selectType = form.querySelector('.booking__ticket-type');
  const ticketTypeInput = form.ticketType;
  const ticketTypeContainer = ticketTypeInput.parentElement;
  makeReadonlyInput(timeInput);
  timeList.addEventListener('blur', (ev) => {
    if (ev.relatedTarget === timeContainer || ev.relatedTarget === timeInput)
      return;
    hideOptions(timeContainer, timeList);
    validate(timeInput, timeInput.name);
  });
  selectType.addEventListener('blur', (ev) => {
    if (
      ev.relatedTarget === ticketTypeContainer ||
      ev.relatedTarget === ticketTypeInput
    )
      return;
    hideOptions(ticketTypeContainer, selectType);
  });
  timeContainer.addEventListener('click', (ev) => {
    const { target } = ev;
    if (target.closest('li')) {
      deleteError(timeInput);
      showSelectedValues(target, timeInput, timeContainer, timeList);
      const overviewTime = document.querySelector('.overview__time');
      overviewTime.innerHTML = timeInput.value;
    } else showOptions(timeList, timeContainer);
  });
  ticketTypeContainer.addEventListener('click', (ev) => {
    const { target } = ev;
    if (target.closest('li')) {
      showSelectedValues(
        target,
        ticketTypeInput,
        ticketTypeContainer,
        selectType
      );
      ticketInfo.typeOfTicket = target.dataset.selectedIndex;
      updateTicketType();
    } else showOptions(selectType, ticketTypeContainer);
  });
}
