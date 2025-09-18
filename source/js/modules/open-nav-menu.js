import { isEscapeKey } from '../utils/keydown.js';
import { getScrollWidth } from '../utils/scroll-lock.js';
import { DESKTOP_WIDTH } from './constants.js';

const header = document.querySelector('.header');
const nav = header ? header.querySelector('.main-nav') : null;
const burger = nav ? nav.querySelector('.burger') : null;
const mobileMenu = nav ? nav.querySelector('.menu') : null;
const navLinks = mobileMenu ? mobileMenu.querySelectorAll('a, button') : null;

let scrollSize = 0;

const removeTabIndex = () => {
  mobileMenu.setAttribute('tabindex', '-1');
  navLinks.forEach((button) => {
    button.setAttribute('tabindex', '-1');
  });
};

const setTabIndex = () => {
  navLinks.forEach((button) => {
    button.setAttribute('tabindex', '0');
  });
};

const updateHeight = () => {
  const height = header.scrollHeight;
  nav.style.setProperty('--header-height', `${height}px`);
};

const openMobileMenu = () => {
  nav.classList.add('main-nav--opened');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  nav.addEventListener('focusout', onNavFocusOut);
  setTabIndex();
  updateHeight();

  scrollSize = getScrollWidth();
  document.body.style.paddingRight = `${scrollSize}px`;
};

const closeMobileMenu = () => {
  nav.classList.remove('main-nav--opened');
  document.body.style.overflow = 'visible';
  document.body.style.paddingRight = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  nav.removeEventListener('focusout', onNavFocusOut);
  removeTabIndex();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMobileMenu();
  }
}

function onNavFocusOut(evt) {
  if (evt.relatedTarget === null || !nav.contains(evt.relatedTarget)) {
    closeMobileMenu();
  }
}

function onDocumentClick(evt) {
  if (!nav.contains(evt.target)) {
    closeMobileMenu();
  }
}

if (!DESKTOP_WIDTH.matches) {
  removeTabIndex();
}


DESKTOP_WIDTH.addEventListener('change', () => {
  if (DESKTOP_WIDTH.matches) {
    setTabIndex();
  } else {
    removeTabIndex();
  }
});

const toggleBurgerMenu = () => {
  if (nav) {
    burger.addEventListener('click', () => {
      if (nav.classList.contains('main-nav--opened')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }
};

export { toggleBurgerMenu };
