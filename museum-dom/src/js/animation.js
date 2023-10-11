export function addRippleEffect(event, element) {
  if (!element.closest('[data-ripple]')) return;
  const ripple = document.createElement('span');
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${
    event.pageX - (element.getBoundingClientRect().left + scrollX) - radius
  }px`;
  ripple.style.top = `${
    event.pageY - (element.getBoundingClientRect().top + scrollY) - radius
  }px`;
  ripple.classList.add('ripple');

  element.appendChild(ripple);
  setTimeout(() => {
    ripple ? ripple.remove() : null;
  }, 2000);
}
