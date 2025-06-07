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
  currentIndex = 0; // Reset index on resize to prevent overflow
  updateSlider();
});

function startAutoplay() {
  autoplayInterval = setInterval(showNextSlide, 4000);
}

function restartAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

updateSlider();
startAutoplay();
