function updateMinAndMaxYear() {
  const inputCardYear = document.querySelector('.overview__card-year');
  const year = new Date().getFullYear();
  inputCardYear.setAttribute('min', year);
  inputCardYear.setAttribute('max', year + 5);
}

export function addFormListeners() {
  updateMinAndMaxYear();
  const ticketsBuyButton = document.querySelector('.tickets__buy');
  const ticketsForm = document.querySelector('.booking__tickets');
  const closeFormButton = document.querySelector('.booking__close');
  ticketsBuyButton.addEventListener('click', () => {
    ticketsForm.hidden = false;
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
}
