const inputDate = document.querySelector('.booking__date');

function getDateString(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let dayOfMonth = date.getDate();
  if (dayOfMonth < 10) dayOfMonth = `0${dayOfMonth}`;
  const dateString = `${year}-${month}-${dayOfMonth}`;
  return dateString;
}

function updateMinAndMaxDate() {
  const date = new Date();
  inputDate.setAttribute('min', getDateString(date));
  date.setDate(date.getDate() + 30);
  inputDate.setAttribute('max', getDateString(date));
}

export function addInputDateListeners() {
  updateMinAndMaxDate();
  inputDate.addEventListener('click', () => {
    inputDate.style.background =
      'url(./svg/arrow_top.svg) no-repeat center right';
  });
  inputDate.addEventListener('blur', () => {
    inputDate.style.background =
      'url(./svg/arrow_down.svg) no-repeat center right';
  });
  inputDate.addEventListener('change', () => {
    if (inputDate.value !== '') inputDate.classList.add('has-value');
    if (inputDate.value === '' && inputDate.classList.contains('has-value')) {
      inputDate.classList.remove('has-value');
    }
    inputDate.style.background =
      'url(./svg/arrow_down.svg) no-repeat center right';
  });
}
