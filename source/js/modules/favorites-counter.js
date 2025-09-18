const hearts = document.querySelectorAll('.favorites-button');

const setFavoritesButtons = () => {
  if (hearts) {
    hearts.forEach((heart) => {
      heart.addEventListener('click', () => {
        heart.classList.toggle('favorites-button--active');
      });
    });
  }
};

export { setFavoritesButtons };
