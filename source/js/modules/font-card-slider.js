import { setSlider } from './slider.js';
import { DESKTOP_WIDTH } from './constants';

const fontCards = document.querySelectorAll('.font-card');

const initFontSlider = () => {
  if (fontCards) {
    fontCards.forEach((card) => {
      setSlider(card, DESKTOP_WIDTH);
    });
  }
};

export { initFontSlider };
