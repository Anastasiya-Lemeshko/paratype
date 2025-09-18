import { setSlider } from './slider.js';
import { TABLET_WIDTH } from './constants';

const promo = document.querySelector('.promo');

const initPromoSlider = () => {
  if (promo) {
    setSlider(promo, TABLET_WIDTH);
  }
};

export { initPromoSlider };
