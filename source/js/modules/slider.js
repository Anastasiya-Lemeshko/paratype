import { SLIDER_GAP } from './constants';

const setSlider = (block, screenWidth) => {
  const slider = block.querySelector('.slider');
  const sliderList = slider.querySelector('.slider__list');
  const slides = sliderList.querySelectorAll('.slider__item');
  const bullitList = slider.querySelector('.slider-pagination');
  const bullits = bullitList.querySelectorAll('.slider-pagination__button');

  let isSlider = false;
  let startX = 0;

  const hideTabindex = () => {
    slides.forEach((item) => {
      item.querySelectorAll('a').forEach((link) => {
        link.tabIndex = -1;
      });
    });

    sliderList.querySelector('.slider-item-current').querySelectorAll('a').forEach((link) => {
      link.tabIndex = 0;
    });
  };

  const setTabindex = () => {
    slides.forEach((item) => {
      item.querySelectorAll('a').forEach((link) => {
        link.tabIndex = 0;
      });
    });
  };

  const addClasses = () => {
    slider.classList.add('slider');
    sliderList.classList.add('slider__list');
  };

  const removeClasses = () => {
    slider.classList.remove('slider');
    sliderList.classList.remove('slider__list');
  };

  const setActiveBullet = (index) => {
    slider.querySelector('.slider-pagination__button--current').classList.remove('slider-pagination__button--current');
    Array.from(bullits)[index].classList.add('slider-pagination__button--current');
  };

  const shiftSlider = (index) => {
    const totalWidth = slides[0].clientWidth + SLIDER_GAP;
    sliderList.style.transform = `translateX(${-1 * totalWidth * index}px)`;
  };

  const setActiveScreen = (index) => {
    sliderList.querySelector('.slider-item-current').classList.remove('slider-item-current');
    Array.from(slides)[index].classList.add('slider-item-current');
    hideTabindex();
  };

  const onBullitClick = (evt) => {
    if (evt.target.classList.contains('slider-pagination__button')) {
      evt.preventDefault();
      const activeBullit = evt.target;
      const indexCurrentBullit = Array.from(bullits).indexOf(activeBullit);
      setActiveScreen(indexCurrentBullit);
      shiftSlider(indexCurrentBullit);
      setActiveBullet(indexCurrentBullit);
    }
  };

  const onTouchStart = (evt) => {
    startX = evt.touches[0].clientX;
  };

  const onTouchEnd = (evt) => {
    const endX = evt.changedTouches[0].clientX;
    const deltaX = endX - startX;
    const activeBullet = slider.querySelector('.slider-pagination__button--current');
    const indexCurrentBullit = Array.from(bullits).indexOf(activeBullet);

    if (deltaX <= 0 && indexCurrentBullit < slides.length - 1) {
      const nextIndex = indexCurrentBullit + 1;
      setActiveScreen(nextIndex);
      shiftSlider(nextIndex);
      setActiveBullet(nextIndex);
    }

    if (deltaX > 0 && indexCurrentBullit > 0) {
      const prevIndex = indexCurrentBullit - 1;
      setActiveScreen(prevIndex);
      shiftSlider(prevIndex);
      setActiveBullet(prevIndex);
    }
  };

  const initSlider = () => {
    hideTabindex();
    addClasses();
    bullitList.addEventListener('click', onBullitClick);
    sliderList.addEventListener('touchstart', onTouchStart);
    sliderList.addEventListener('touchend', onTouchEnd);
  };

  const destroySlider = () => {
    setTabindex();
    removeClasses();
    bullitList.removeEventListener('click', onBullitClick);
    sliderList.removeEventListener('touchstart', onTouchStart);
    sliderList.removeEventListener('touchend', onTouchEnd);
    sliderList.style.transform = 'translateX(0)';
    setActiveBullet(0);
  };

  const checkSlider = () => {
    if (screenWidth.matches && isSlider) {
      destroySlider();
      isSlider = false;
    } else if (!screenWidth.matches && !isSlider) {
      initSlider();
      isSlider = true;
    }
  };

  screenWidth.addEventListener('change', checkSlider);

  checkSlider();
};

export { setSlider };
