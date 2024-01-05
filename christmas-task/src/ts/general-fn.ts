export function showWarning(parent: HTMLDivElement) {
  const warningEl = document.createElement('div');
  warningEl.classList.add('warning');
  warningEl.textContent = 'Извините, все слоты заполнены';
  parent.appendChild(warningEl);
  setTimeout(() => {
    warningEl.remove();
  }, 3000);
}
