import { DESKTOP_WIDTH, TABLET_WIDTH } from './constants';

const bestPicks = document.querySelector('.best-picks');
const fontCardButtons = bestPicks ? bestPicks.querySelectorAll('.font-card__button-open') : null;
let isAccordeonTogglesSet = false;

const openVisibleFontCardContent = () => {
  if (bestPicks && !DESKTOP_WIDTH.matches) {
    const visibleFontCardContent = document.querySelectorAll('.font-card__details--opened');
    visibleFontCardContent.forEach((element) => {
      element.style.maxHeight = `${element.scrollHeight}px`;
    });
  }

  if (bestPicks && DESKTOP_WIDTH.matches) {
    const visibleFontCardContent = document.querySelectorAll('.font-card__details--opened');
    visibleFontCardContent.forEach((element) => {
      element.style.maxHeight = 0;
    });
  }
};

const openCardDetails = (evt) => {
  evt.preventDefault();

  const currentContent = evt.target.parentElement.querySelector('.font-card__details');

  currentContent.classList.toggle('font-card__details--opened');
  evt.target.classList.toggle('button-accordeon--active');

  if (currentContent.classList.contains('font-card__details--opened')) {
    currentContent.style.maxHeight = `${currentContent.scrollHeight }px`;
  } else {
    currentContent.style.maxHeight = null;
  }
};

const setAccordeonToggles = () => {
  if (fontCardButtons && !DESKTOP_WIDTH.matches && !isAccordeonTogglesSet) {
    fontCardButtons.forEach((button) => {
      button.addEventListener('click', openCardDetails);
    });
    isAccordeonTogglesSet = true;
  }
  if (fontCardButtons && DESKTOP_WIDTH.matches && isAccordeonTogglesSet) {
    fontCardButtons.forEach((button) => {
      button.removeEventListener('click', openCardDetails);
    });
    isAccordeonTogglesSet = false;
  }
};

DESKTOP_WIDTH.addEventListener('change', () => {
  openVisibleFontCardContent();
  setAccordeonToggles();
});

TABLET_WIDTH.addEventListener('change', openVisibleFontCardContent);

export { openVisibleFontCardContent, setAccordeonToggles };
