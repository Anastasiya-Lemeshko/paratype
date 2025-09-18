const theme = document.querySelector('.theme');
const toggle = theme ? theme.querySelector('.theme__toggle') : null;

const toggleTheme = () => {
  if (!theme) {
    return;
  }

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('theme__toggle--dark');

    if (toggle.classList.contains('theme__toggle--dark')) {
      toggle.setAttribute('aria-pressed', 'true');
    } else {
      toggle.setAttribute('aria-pressed', 'false');
    }
  });
};

export { toggleTheme };
