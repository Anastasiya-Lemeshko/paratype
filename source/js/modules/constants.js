export const DESKTOP_WIDTH = window.matchMedia('(min-width: 1024px)');
export const TABLET_WIDTH = window.matchMedia('(min-width: 768px)');
export const MOBILE_BREAKPOINT = 320;
export const SLIDER_GAP = 20;

export const ERROR_TEXT = {
  'empty': 'Это обязательное поле.',
  'email': 'Неверный формат email.',
  'default': 'Неверный формат данных'
};

export const FIELD_STANDARD = {
  'email': /^[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.([\p{L}]{2,}|xn--[a-z0-9-]+)$/u
};
