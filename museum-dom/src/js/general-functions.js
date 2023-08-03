export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export function showMessage(parent, message) {
  const messageEl = document.createElement('p');
  messageEl.classList.add('message');
  messageEl.textContent = message;
  parent.appendChild(messageEl);
  setTimeout(() => {
    messageEl.remove();
  }, 500);
}
export function showError(elem, error) {
  const sibling = elem.nextElementSibling;
  if (sibling === null || !sibling.classList.contains('error')) {
    const html = `<p class="error">${error}</p>`;
    elem.insertAdjacentHTML('afterend', html);
  }
}
export function deleteError(elem) {
  const sibling = elem.nextElementSibling;
  if (sibling !== null && sibling.classList.contains('error')) {
    sibling.remove();
  }
}
