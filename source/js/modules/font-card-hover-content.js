import { DESKTOP_WIDTH } from './constants';

const bestPicks = document.querySelector('.best-picks');
const cardContentWrapper = bestPicks ? bestPicks.querySelectorAll('.font-card:not(.font-card--big) .font-card__content-wrapper') : null;
const cardContent = bestPicks ? bestPicks.querySelectorAll('.font-card:not(.font-card--big) .font-card__content') : null;
let isContentListener = false;

const onEnter = (evt) => {
  const currentDetails = evt.target.querySelector('.font-card__details');
  currentDetails.classList.add('font-card__details--opened');
  currentDetails.style.maxHeight = `${currentDetails.scrollHeight }px`;
};

const onLeave = (evt) => {
  const currentDetails = evt.target.querySelector('.font-card__details');
  currentDetails.classList.remove('font-card__details--opened');
  currentDetails.style.maxHeight = null;
};

const setContentListeners = () => {
  if (cardContentWrapper && DESKTOP_WIDTH.matches && !isContentListener) {
    cardContentWrapper.forEach((wrapper) => {
      wrapper.addEventListener('mouseenter', onEnter);
      wrapper.addEventListener('mouseleave', onLeave);
    });
    cardContent.forEach((content) => {
      content.addEventListener('focus', onEnter);
      content.addEventListener('focusout', onLeave);
    });
    isContentListener = true;
  }
  if (cardContentWrapper && !DESKTOP_WIDTH.matches && isContentListener) {
    cardContentWrapper.forEach((wrapper) => {
      wrapper.removeEventListener('mouseenter', onEnter);
      wrapper.removeEventListener('mouseleave', onLeave);
    });
    cardContent.forEach((content) => {
      content.removeEventListener('focus', onEnter);
      content.removeEventListener('focusout', onLeave);
    });
    isContentListener = false;
  }
};

DESKTOP_WIDTH.addEventListener('change', setContentListeners);

export { setContentListeners };
