export function addMenuListeners() {
  const menuButton = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__nav');
  const welcomeContent = document.querySelector('.welcome__content');

  menuButton.addEventListener('click', () => {
    if (menuButton.dataset.isOpen === 'true') {
      menuButton.dataset.isOpen = false;
      menu.style.transform = 'translateX(-100%)';
      menuButton.style.background =
        'url(./svg/burger.svg) no-repeat right transparent';

      setTimeout(() => {
        menu.hidden = true;
        welcomeContent.style.opacity = '1';
      }, 500);
    } else {
      menuButton.dataset.isOpen = true;
      menu.hidden = false;
      menuButton.style.background =
        'url(./svg/close-white.svg) no-repeat right transparent';

      setTimeout(() => {
        menu.style.transform = 'translateX(0)';
        welcomeContent.style.opacity = '0';
      }, 1000);
    }
  });
}
