const navButton = document.querySelector('.nav__hamburger');
const overlay = document.querySelector('.nav__overlay');
const navEl = document.querySelector('.nav');

navButton.addEventListener('click', () => {
  navEl.classList.add('nav--active');
  overlay.classList.add('nav__overlay--active');
});

overlay.addEventListener('click', () => {
  navEl.classList.remove('nav--active');
  overlay.classList.remove('nav__overlay--active');
});
