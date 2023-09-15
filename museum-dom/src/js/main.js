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
