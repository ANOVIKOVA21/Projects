export function getRandomNum(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomColor() {
  const maxValue = 255;
  const mimValue = 0;
  return `rgb(${getRandomNum(mimValue, maxValue)},${getRandomNum(mimValue, maxValue)},${getRandomNum(
    mimValue,
    maxValue
  )})`;
}
export function showWinner(carName: string, time: number) {
  const messageEl = document.createElement('div');
  messageEl.classList.add('message');
  messageEl.textContent = `${carName} won in ${time} sec`;
  document.body.appendChild(messageEl);
  setTimeout(() => {
    messageEl.remove();
  }, 3000);
}
