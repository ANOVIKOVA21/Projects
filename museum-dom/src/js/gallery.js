const animItems = document.querySelectorAll('.gallery__img img');

function scrollPosition(element) {
  const coords = element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: coords.top + scrollTop, left: coords.left + scrollLeft };
}

export function animAndScroll() {
  for (let i = 0; i < animItems.length; i++) {
    const animItem = animItems[i];
    const animItemHeight = animItem.offsetHeight;
    const animItemTop = scrollPosition(animItem).top;
    const animCoef = 5;
    let animPointStart = window.innerHeight - animItemHeight / animCoef;
    if (animItemHeight > window.innerHeight) {
      animPointStart = window.innerHeight - window.innerHeight / animCoef;
    }
    if (
      window.pageYOffset > animItemTop - animPointStart &&
      window.pageYOffset < animItemTop + animItemHeight
    ) {
      animItem.classList.add('active-img');
    } else {
      animItem.classList.remove('active-img');
    }
  }
}
