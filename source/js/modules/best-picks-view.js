const bestPicks = document.querySelector('.best-picks');
const controlsContainer = bestPicks ? bestPicks.querySelector('.best-picks__view') : null;
const controls = controlsContainer ? controlsContainer.querySelectorAll('.best-picks__view-button') : null;

const setViewControls = () => {
  if (controlsContainer) {
    controlsContainer.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('best-picks__view-button')) {
        controls.forEach((control) => {
          control.classList.remove('best-picks__view-button--active');
        });

        evt.target.classList.add('best-picks__view-button--active');
      }
    });
  }
};

export { setViewControls };
