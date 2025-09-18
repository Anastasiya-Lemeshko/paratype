import {
  ERROR_TEXT,
  FIELD_STANDARD
} from './constants.js';

const subscribe = document.querySelector('.subscribe');
const subscribeForm = subscribe ? subscribe.querySelector('.subscribe__form') : null;
const subscribeFields = subscribeForm ? subscribeForm.querySelectorAll('input') : null;

const setFormValidate = () => {
  const validateForm = () => {
    let formIsValid = true;

    subscribeFields.forEach((input) => {
      const value = input.value.trim();

      if (value === '') {
        input.classList.add('input--error');
        input.setCustomValidity(ERROR_TEXT.empty);
        formIsValid = false;
      } else if (FIELD_STANDARD[input.id] && !FIELD_STANDARD[input.id].test(value)) {
        input.classList.add('input--error');
        input.setCustomValidity(ERROR_TEXT[input.id] || ERROR_TEXT.default);
        formIsValid = false;
      } else {
        input.setCustomValidity('');
      }
    });

    return formIsValid;
  };

  subscribeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formIsValid = validateForm();

    if (formIsValid) {
      subscribeForm.submit();
      subscribeForm.reset();
    } else {
      subscribeForm.reportValidity();
    }
  });

  subscribeFields.forEach((input) => {
    input.addEventListener('input', () => {
      input.setCustomValidity(' ');
      input.classList.remove('input--error');
      input.blur();
      input.focus();
    });
  });
};

export { setFormValidate };
