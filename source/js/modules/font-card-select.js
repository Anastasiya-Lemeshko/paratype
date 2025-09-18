import {
  isEscapeKey,
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
} from './../utils/keydown.js';
import { DESKTOP_WIDTH } from './constants';

const bestPicks = document.querySelector('.best-picks');
const select = bestPicks ? bestPicks.querySelector('.select') : null;
const selectButton = select.querySelector('.select__button');
const customSelect = select.querySelector('.select__list');
const optionItems = Array.from(customSelect.querySelectorAll('li'));
const options = Array.from(customSelect.querySelectorAll('button'));
let isSelect = false;

const setTabIndex = () => {
  if (select.classList.contains('select--open')) {
    options.forEach((option) => {
      option.setAttribute('tabindex', '0');
    });
  } else {
    options.forEach((option) => {
      option.setAttribute('tabindex', '-1');
    });
  }
};

const openSelect = () => {
  select.classList.add('select--open');
  setTabIndex();
  customSelect.addEventListener('click', onSelectOptionClick);
  document.addEventListener('keydown', onSelectKeydown);
  document.addEventListener('click', onDocumentClick);
  customSelect.addEventListener('focusout', onSelectFocusOut);
};

const closeSelect = () => {
  select.classList.remove('select--open');
  setTabIndex();
  selectButton.focus();
  customSelect.removeEventListener('click', onSelectOptionClick);
  document.removeEventListener('keydown', onSelectKeydown);
  document.removeEventListener('click', onDocumentClick);
  customSelect.removeEventListener('focusout', onSelectFocusOut);

};

const chooseOption = (option) => {
  const selectedText = option.textContent;
  const currentItem = option.parentElement;
  const selectedItem = optionItems.find((item) => item.getAttribute('aria-selected') === 'true');
  selectedItem.setAttribute('aria-selected', 'false');
  currentItem.setAttribute('aria-selected', 'true');
  selectButton.textContent = selectedText;
  closeSelect();
};

function onSelectKeydown(evt) {
  const open = select.classList.contains('select--open');
  const currentIndex = options.indexOf(document.activeElement);

  if (!open) {
    return;
  }

  if (isArrowDownKey(evt)) {
    evt.preventDefault();

    if (currentIndex < options.length - 1) {
      options[currentIndex + 1].focus();
    } else {
      options[0].focus();
    }
    return;
  }

  if (isArrowUpKey(evt)) {
    evt.preventDefault();

    if (currentIndex > 0) {
      options[currentIndex - 1].focus();
    } else {
      options[options.length - 1].focus();
    }
    return;
  }

  if (isEnterKey(evt)) {
    evt.preventDefault();

    if (currentIndex > 0) {
      chooseOption(options[currentIndex]);
    }
    return;
  }

  if (isEscapeKey(evt)) {
    closeSelect();
  }
}

function onSelectOptionClick(evt) {
  if (evt.target.tagName === 'BUTTON') {
    chooseOption(evt.target);
  }
}

function onDocumentClick(evt) {
  if (!select.contains(evt.target)) {
    closeSelect();
  }
}

function onSelectFocusOut(evt) {
  if (evt.relatedTarget === null || !select.contains(evt.relatedTarget)) {
    closeSelect();
  }
}

const toggleSelect = () => {
  if (select.classList.contains('select--open')) {
    closeSelect();
  } else {
    openSelect();
  }
};

const setSelect = () => {
  customSelect.setAttribute('role', 'listbox');
  customSelect.setAttribute('aria-label', 'Выберите категорию');
  selectButton.textContent = options[0].textContent;
  selectButton.addEventListener('click', toggleSelect);
  optionItems.forEach((option) => {
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');
  });
  optionItems[0].setAttribute('aria-selected', 'true');
  setTabIndex();
};

const destroySelect = () => {
  if (select.classList.contains('select--open')) {
    closeSelect();
  }
  options.forEach((option) => {
    option.setAttribute('tabindex', '0');
  });
  optionItems.forEach((option) => {
    option.removeAttribute('role');
    option.removeAttribute('aria-selected');
  });
  selectButton.removeEventListener('click', toggleSelect);
  customSelect.removeAttribute('role');
  customSelect.removeAttribute('aria-label');
};

const checkSelect = () => {
  if (bestPicks && !DESKTOP_WIDTH.matches && !isSelect) {
    setSelect();
    isSelect = true;
  }
  if (bestPicks && DESKTOP_WIDTH.matches && isSelect) {
    destroySelect();
    isSelect = false;
  }
};

DESKTOP_WIDTH.addEventListener('change', checkSelect);

export { checkSelect };
