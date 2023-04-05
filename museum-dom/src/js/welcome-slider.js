export function addWelcomeSliderListener() {
  const welcomeImages = [
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
  ];
  const welcomeImgContainer = document.querySelector('.welcome__img');
  const welcomeSlider = document.querySelector('.welcome__slider');
  const numOfImg = document.querySelector('.welcome__num');
  const squares = document.querySelectorAll('.welcome__square');
  const welcomeArrows = document.querySelectorAll('.welcome__arrow');
  let indexCurImg = 0;
  let currentImg = welcomeImages[indexCurImg];

  welcomeSlider.addEventListener('click', (event) => {
    const { target } = event;
    if (
      !target.closest('.welcome__arrow') &&
      !target.closest('.welcome__square')
    )
      return;
    const targetArrow = target.closest('.welcome__arrow');
    const targetSquare = target.closest('.welcome__square');
    const screenWidth = window.screen.width;
    squares[indexCurImg].classList.remove('sq-active');
    welcomeImgContainer.style.opacity = '0';
    if (targetArrow) {
      if (targetArrow === welcomeArrows[0]) {
        indexCurImg === 0
          ? (indexCurImg = welcomeImages.length - 1)
          : indexCurImg--;
      } else {
        indexCurImg === welcomeImages.length - 1
          ? (indexCurImg = 0)
          : indexCurImg++;
      }
    }

    if (targetSquare) {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === target) {
          indexCurImg = i;
          break;
        }
      }
    }

    numOfImg.innerHTML = `0${indexCurImg + 1}`;
    squares[indexCurImg].classList.add('sq-active');
    currentImg = welcomeImages[indexCurImg];
    setTimeout(() => {
      welcomeImgContainer.style.opacity = '1';
      if (screenWidth > 950) {
        welcomeImgContainer.style.background = `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.5) 16.19%, rgba(0, 0, 0, 0) 30.73%),center / contain url(${currentImg}) no-repeat`;
      } else {
        welcomeImgContainer.style.background = `center / contain url(${currentImg}) no-repeat`;
      }
    }, 500);
  });
}
