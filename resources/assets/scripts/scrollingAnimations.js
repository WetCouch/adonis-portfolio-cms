// const fadingElements = document.getElementsByClassName('fade-in');
const nav = document.querySelector('.nav');
const showNavEl = document.getElementById('show-nav');
// const SHOW_ON_DISTANCE_FROM_BOTTOM = 64;

// function animateElements() {
//   Array.from(fadingElements).forEach(el => {
//     const bottomBounding = el.getBoundingClientRect().bottom;
//
//     //Add class when the top of the element is specified distance above the bottom window border
//     if (bottomBounding - el.clientHeight + SHOW_ON_DISTANCE_FROM_BOTTOM <= (window.innerHeight || document.documentElement.clientHeight)) {
//       el.classList.add('fade-in--active');
//     }
//
//   });
// }

function showNavBackground() {
  const topBounding = showNavEl.getBoundingClientRect().top;

  //Show navigation background if on the same Y position within window as showNavEl
  if (topBounding - nav.clientHeight <= 0) {
    nav.classList.add('nav--show-bg');
  } else if (nav.classList.contains('nav--show-bg')) {
    nav.classList.remove('nav--show-bg');
  }
}

document.addEventListener('scroll', () => {
  //debounce to limit the function execution on scroll event
  let waiting = false;
  if (!waiting) {
    // animateElements();
    showNavBackground();
    waiting = true;
    setTimeout(() => waiting = false, 500)
  }
});

// scrollTopAboveFooter();
showNavBackground();