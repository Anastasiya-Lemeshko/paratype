import { DESKTOP_WIDTH } from './constants.js';

const footer = document.querySelector('.footer');
const social = footer ? footer.querySelector('.footer__social') : null;
const footerInfo = footer ? footer.querySelector('.footer__info') : null;
let isSocialMoved = false;

const moveSocial = () => {
  if (footer && DESKTOP_WIDTH.matches && !isSocialMoved) {
    footerInfo.appendChild(social);
    isSocialMoved = true;
  }

  if (footer && !DESKTOP_WIDTH.matches && isSocialMoved) {
    footerInfo.prepend(social);
    isSocialMoved = false;
  }
};

DESKTOP_WIDTH.addEventListener('change', moveSocial);

export { moveSocial };
