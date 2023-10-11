import { makeReadonlyInput } from './general-functions';

function getDateString(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let dayOfMonth = date.getDate();
  if (dayOfMonth < 10) dayOfMonth = `0${dayOfMonth}`;
  const dateString = `${year}-${month}-${dayOfMonth}`;
  return dateString;
}

function updateMinAndMaxDate(datePicker) {
  const date = new Date();
  datePicker.setAttribute('min', getDateString(date));
  date.setDate(date.getDate() + 30);
  datePicker.setAttribute('max', getDateString(date));
}
function getFullDayName(str) {
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const dayName = weekDays.filter((day) => day.startsWith(str));
  return dayName[0];
}
function getFullMonthName(str) {
  const monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthsNames.filter((day) => day.startsWith(str));
  return month[0];
}
function getDateAsString(date) {
  const dateAsArray = `${date}`.split(' ');
  const dateAsString = [];
  dateAsString.push(getFullDayName(dateAsArray[0]));
  const monthName = getFullMonthName(dateAsArray[1]);
  dateAsString.push(`${monthName} ${dateAsArray[2]}`);
  return dateAsString.join(', ');
}
export function addInputDateListeners() {
  const form = document.querySelector('.booking__form');
  const inputDatePicker = form.datePicker;
  const inputDate = form.date;
  const dateContainer = inputDate.parentElement;
  const overviewDate = document.querySelector('.overview__date');
  updateMinAndMaxDate(inputDatePicker);
  makeReadonlyInput(inputDate);
  dateContainer.addEventListener('pointerdown', () => {
    if (!dateContainer.classList.contains('arrow-open')) {
      dateContainer.classList.add('arrow-open');
      inputDatePicker.showPicker();
    } else inputDate.blur();
  });
  inputDate.addEventListener('blur', () => {
    dateContainer.classList.remove('arrow-open');
  });
  inputDatePicker.addEventListener('change', () => {
    if (inputDatePicker.value !== '') {
      inputDate.value = inputDatePicker.value;
      overviewDate.innerHTML = getDateAsString(inputDatePicker.valueAsDate);
    }
    if (inputDatePicker.value === '') {
      inputDate.value = '';
      overviewDate.innerHTML = 'Select date';
    }
    inputDate.blur();
  });
}
