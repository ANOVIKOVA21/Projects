export function initComparisons() {
  function compareImages(img) {
    const exploreSlider = document.querySelector('.explore__img-slider');
    // let exploreSlider,
    let clicked = 0;
    /* get the width and height of the img element */
    const imgWidth = img.offsetWidth;
    /* set the width of the img element to 50%: */
    img.style.width = `${imgWidth / 2 + exploreSlider.style.width / 2}px`;
    exploreSlider.style.left = `${
      imgWidth / 2 - exploreSlider.offsetWidth / 2
    }px`;
    function getCursorPos(event) {
      let cursorX = 0;
      event = event || window.event;
      /* get the x positions of the image: */
      const imgX = img.getBoundingClientRect();
      /* calculate the cursor's x coordinate, relative to the image: */
      cursorX = event.pageX - imgX.left;
      /* consider any page scrolling: */
      cursorX -= window.pageXOffset;
      return cursorX;
    }
    function slide(x) {
      /* resize the image: */
      img.style.width = `${x}px`;
      /* position the slider: */
      exploreSlider.style.left = `${
        img.offsetWidth - exploreSlider.offsetWidth / 2
      }px`;
    }
    function slideMove(event) {
      let pos;
      /* if the slider is no longer clicked, exit this function: */
      if (clicked === 0) return false;
      /* get the cursor's x position: */
      pos = getCursorPos(event);
      /* prevent the slider from being positioned outside the image: */
      if (pos < 0) pos = 0;
      if (pos > imgWidth) pos = imgWidth;
      /* execute a function that will resize the overlay image according to the cursor: */
      slide(pos);
    }
    function slideReady(event) {
      /* prevent any other actions that may occur when moving over the image: */
      event.preventDefault();
      /* the slider is now clicked and ready to move: */
      clicked = 1;
      /* execute a function when the slider is moved: */
      window.addEventListener('mousemove', slideMove);
      window.addEventListener('touchmove', slideMove);
    }
    /* execute a function when the mouse button is pressed: */
    exploreSlider.addEventListener('mousedown', slideReady);
    /* and another function when the mouse button is released: */
    function slideFinish() {
      /* the slider is no longer clicked: */
      clicked = 0;
    }
    window.addEventListener('mouseup', slideFinish);
    /* or touched (for touch screens: */
    exploreSlider.addEventListener('touchstart', slideReady);
    /* and released (for touch screens: */
    window.addEventListener('touchstop', slideFinish);
  }
  /* find all elements with an "overlay" class: */
  const x = document.getElementsByClassName('img-overlay');
  for (let i = 0; i < x.length; i++) {
    /* once for each "overlay" element:
                                    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i]);
  }
}
