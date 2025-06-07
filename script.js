const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let autoplayInterval;
let slidesToShow = window.innerWidth <= 768 ? 1 : 3;
const totalSlides = track.children.length;

function updateSlider() {
  const slideWidth = track.clientWidth / slidesToShow;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function showNextSlide() {
  const maxIndex = totalSlides - slidesToShow;
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlider();
}

function showPrevSlide() {
  const maxIndex = totalSlides - slidesToShow;
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = maxIndex;
  }
  updateSlider();
}

nextBtn.addEventListener('click', () => {
  showNextSlide();
  restartAutoplay();
});

prevBtn.addEventListener('click', () => {
  showPrevSlide();
  restartAutoplay();
});

window.addEventListener('resize', () => {
  slidesToShow = window.innerWidth <= 768 ? 1 : 3;
  currentIndex = 0;
  updateSlider();
});

// Autoplay
function startAutoplay() {
  autoplayInterval = setInterval(showNextSlide, 4000);
}

function restartAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

startAutoplay();
updateSlider();


// === Swipe support ===
let startX = 0;
let isSwiping = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
}, { passive: true });

track.addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  const currentX = e.touches[0].clientX;
  const diffX = currentX - startX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      showPrevSlide();
    } else {
      showNextSlide();
    }
    isSwiping = false;
    restartAutoplay();
  }
}, { passive: true });

track.addEventListener('touchend', () => {
  isSwiping = false;
});
