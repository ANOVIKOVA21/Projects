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
  const overviewDate = document.querySelector('.overview__date');
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
    if (inputDate.value !== '') {
      inputDate.classList.add('has-value');
      overviewDate.innerHTML = getDateAsString(inputDate.valueAsDate);
    }
    if (inputDate.value === '' && inputDate.classList.contains('has-value')) {
      inputDate.classList.remove('has-value');
      overviewDate.innerHTML = 'Select date';
    }
    inputDate.style.background =
      'url(./svg/arrow_down.svg) no-repeat center right';
  });
}
