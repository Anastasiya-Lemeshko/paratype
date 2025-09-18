const getScrollWidth = () => {
  const div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);

  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
};

export {getScrollWidth};
