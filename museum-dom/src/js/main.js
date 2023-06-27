import '../css/fonts.css';
import '../css/style.css';

import { addWelcomeSliderListener } from './welcome-slider';
import { addInputDateListeners } from './inputDate';
import { addSelectListeners } from './select';
import { addFormListeners } from './other-form-listeners';
import { addMenuListeners } from './menu';
import { shuffleAndShowPictures } from './gallery';
import { initComparisons } from './image-comparison-slider';
import './video-slider';
import { addVideoListeners } from './video';
import './lazyLoadIframe';
import { addTicketListeners } from './ticket-price-calculation';

function addListeners() {
  addWelcomeSliderListener();
  addInputDateListeners();
  addSelectListeners();
  addFormListeners();
  addMenuListeners();
  shuffleAndShowPictures();
  initComparisons();
  addVideoListeners();
  addTicketListeners();
}
addListeners();

// const animateCSS = (element, animation, prefix = 'animate__') =>
//   // We create a Promise and return it
//   new Promise((resolve) => {
//     const animationName = `${prefix}${animation}`;
//     const node = document.querySelector(element);

//     node.classList.add(`${prefix}animated`, animationName);

//     // When the animation ends, we clean the classes and resolve the Promise
//     function handleAnimationEnd(event) {
//       event.stopPropagation();
//       node.classList.remove(`${prefix}animated`, animationName);
//       resolve('Animation ended');
//     }

//     node.addEventListener('animationend', handleAnimationEnd, { once: true });
//   });
