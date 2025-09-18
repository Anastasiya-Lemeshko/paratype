import { DESKTOP_WIDTH } from './constants';

const linksContainers = document.querySelectorAll('.js-accent-list');

const animateLink = () => {
  if (linksContainers) {
    linksContainers.forEach((container) => {
      const accentLinks = container.querySelectorAll('.link-accent');
      let currentLink = null;
      let isSetLinks = false;

      const onEnter = () => {
        currentLink = container.querySelector('.link-accent--current');
        if (currentLink) {
          currentLink.classList.remove('link-accent--current');
        }
      };

      const onLeave = () => {
        if (currentLink) {
          currentLink.classList.add('link-accent--current');
        }
      };

      const onFocusIn = (evt) => {
        const previousElement = evt.relatedTarget;
        if (previousElement && !container.contains(previousElement)) {
          onEnter();
        }
      };

      const onFocusOut = (evt) => {
        const nextElement = evt.relatedTarget;
        if (nextElement === null || !container.contains(nextElement)) {
          onLeave();
        }
      };

      const onLinkClick = (evt) => {
        if (currentLink) {
          currentLink.classList.remove('link-accent--current');
        }
        evt.target.classList.add('link-accent--current');
        currentLink = evt.target;
      };

      const onLinkHover = () => {
        if (currentLink) {
          currentLink.classList.remove('link-accent--current');
        }
      };

      const setAccentLink = () => {
        if (DESKTOP_WIDTH.matches && !isSetLinks) {
          container.addEventListener('mouseenter', onEnter);
          container.addEventListener('mouseleave', onLeave);
          container.addEventListener('focusin', onFocusIn);
          container.addEventListener('focusout', onFocusOut);

          accentLinks.forEach((link) => {
            link.addEventListener('mouseenter', onLinkHover);
            link.addEventListener('click', onLinkClick);
          });

          isSetLinks = true;
        }
        if (!DESKTOP_WIDTH.matches && isSetLinks) {
          container.removeEventListener('mouseenter', onEnter);
          container.removeEventListener('mouseleave', onLeave);
          container.removeEventListener('focusin', onFocusIn);
          container.removeEventListener('focusout', onFocusOut);

          accentLinks.forEach((link) => {
            link.removeEventListener('mouseenter', onLinkHover);
            link.removeEventListener('click', onLinkClick);
          });

          isSetLinks = false;
        }
      };

      setAccentLink();

      DESKTOP_WIDTH.addEventListener('change', setAccentLink);
    });
  }
};

export { animateLink };
