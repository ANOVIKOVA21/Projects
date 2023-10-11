export function addMenuListeners() {
  const menuButton = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__nav');
  const welcomeContent = document.querySelector('.welcome__content');

  menuButton.addEventListener('click', () => {
    if (menu.classList.contains('-open')) {
      menuButton.style.background =
        'url(./svg/burger.svg) no-repeat right transparent';
      welcomeContent.style.opacity = '1';
    } else {
      welcomeContent.style.opacity = '0';
      menuButton.style.background =
        'url(./svg/close-white.svg) no-repeat right transparent';
    }
    menu.classList.toggle('-open');
    document.body.classList.toggle('lock');
  });
  menu.addEventListener('click', (ev) => {
    const { target } = ev;
    if (menu.classList.contains('-open') && target.tagName === 'A') {
      menuButton.click();
    }
  });
}
