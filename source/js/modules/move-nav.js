import { DESKTOP_WIDTH } from './constants.js';

const header = document.querySelector('.header');
const userNav = header ? header.querySelector('.user-nav') : null;
const headerTop = header ? header.querySelector('.header__top') : null;
const mainNav = header ? header.querySelector('.main-nav__menu') : null;
const mainNavItem = header ? header.querySelector('.main-nav__user') : null;
const theme = mainNav ? mainNav.querySelector('.theme') : null;
let isUserNavMoved = false;

const moveNav = () => {
  if (header && DESKTOP_WIDTH.matches && !isUserNavMoved) {
    headerTop.appendChild(userNav);
    mainNav.appendChild(theme);
    mainNavItem.setAttribute('aria-hidden', 'true');
    isUserNavMoved = true;
  }

  if (header && !DESKTOP_WIDTH.matches && isUserNavMoved) {
    mainNavItem.appendChild(userNav);
    mainNav.prepend(theme);
    mainNavItem.removeAttribute('aria-hidden');
    isUserNavMoved = false;
  }
};

DESKTOP_WIDTH.addEventListener('change', moveNav);

export { moveNav };
