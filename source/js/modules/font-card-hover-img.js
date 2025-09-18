import { DESKTOP_WIDTH } from './constants';
import { debounce } from './../utils/debounce.js';

const fontListArray = document.querySelectorAll('.font-card__list');
const handlerMap = new Map();
let isMouseListener = false;

const createMouseMoveHandler = () => {
  let fontList = null;
  let containerRect = null;
  let sectionWidth = 0;

  const onMouseEnter = (evt) => {
    fontList = evt.target.closest('.font-card__list');
    if (!fontList) {
      return;
    }

    containerRect = fontList.getBoundingClientRect();
    const width = containerRect.width;
    sectionWidth = width / 3;
  };

  const onMouseMove = (evt) => {
    if (!fontList || !containerRect || sectionWidth === 0) {
      return;
    }

    fontList.classList.remove('font-card--first', 'font-card--middle', 'font-card--last');

    const x = evt.clientX - containerRect.left;

    if (x < sectionWidth) {
      fontList.classList.add('font-card--first');
    } else if (x < sectionWidth * 2) {
      fontList.classList.add('font-card--middle');
    } else {
      fontList.classList.add('font-card--last');
    }
  };

  const debouncedOnMouseMove = debounce(onMouseMove, 20);

  return {
    onMouseEnter,
    debouncedOnMouseMove
  };
};

const setMouseListener = () => {
  if (DESKTOP_WIDTH.matches && !isMouseListener) {
    fontListArray.forEach((item) => {
      const handlers = createMouseMoveHandler();
      handlerMap.set(item, handlers);

      item.addEventListener('mouseenter', handlers.onMouseEnter);
      item.addEventListener('mousemove', handlers.debouncedOnMouseMove);
    });
    isMouseListener = true;
  } else if (!DESKTOP_WIDTH.matches && isMouseListener) {
    fontListArray.forEach((item) => {
      const handlers = handlerMap.get(item);
      if (handlers) {
        item.removeEventListener('mouseenter', handlers.onMouseEnter);
        item.removeEventListener('mousemove', handlers.debouncedOnMouseMove);
        handlerMap.delete(item);
      }
    });
    isMouseListener = false;
  }
};

DESKTOP_WIDTH.addEventListener('change', setMouseListener);

export { setMouseListener };
