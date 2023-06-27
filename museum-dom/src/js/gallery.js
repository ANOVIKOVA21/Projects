import { shuffle } from './general-functions';

function scrollPosition(element) {
  const coords = element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: coords.top + scrollTop, left: coords.left + scrollLeft };
}

function animAndScroll() {
  const animItems = document.querySelectorAll('.gallery__img img');
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
function addMarginTop() {
  const imgs = document.querySelectorAll('.gallery__img img');
  const sortedByTop = [...imgs].sort((a, b) => a.offsetTop - b.offsetTop);
  const filtered = sortedByTop.filter(
    (img) => img.offsetTop === sortedByTop[1].offsetTop
  );
  const result = filtered.sort((a, b) => b.offsetLeft - a.offsetLeft);
  console.log(result[0]);
  result[0].style.marginTop = '50px';
}
const IntObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        addMarginTop();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.0 }
);

export function shuffleAndShowPictures() {
  const imgsContainer = document.querySelector('.gallery__img');
  const galleryImgs = [
    './img/galery1.jpg',
    './img/galery2.jpg',
    './img/galery3.jpg',
    './img/galery4.jpg',
    './img/galery5.jpg',
    './img/galery6.jpg',
    './img/galery7.jpg',
    './img/galery8.jpg',
    './img/galery9.jpg',
    './img/galery10.jpg',
    './img/galery11.jpg',
    './img/galery12.jpg',
    './img/galery13.jpg',
    './img/galery14.jpg',
    './img/galery15.jpg',
  ];
  shuffle(galleryImgs);
  galleryImgs.forEach((imgSrc) => {
    const img = `<img src=${imgSrc} alt="picture" loading="lazy" width="456" height="456">`;
    imgsContainer.insertAdjacentHTML('beforeend', img);
  });
  if (window.innerWidth > 768) IntObserver.observe(imgsContainer);
  window.addEventListener('scroll', animAndScroll);
}
