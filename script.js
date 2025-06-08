// Mobile Navbar

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
});



// Transformations Image Slider

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



// Hero Image Slider

const hero = document.getElementById('hero');
const heroBg = hero.querySelector('::before'); // pseudo elements can't be selected directly

const heroImages = [
  'images/hero-1.jpg',
  'images/hero-2.jpg',
  'images/hero-3.jpg',
  'images/hero-4.jpg',
  'images/hero-5.jpg'
];

let heroIndex = 0;
const heroElement = document.querySelector('header');
const heroBefore = document.createElement('div');
heroBefore.style.position = 'absolute';
heroBefore.style.inset = 0;
heroBefore.style.backgroundSize = 'cover';
heroBefore.style.backgroundPosition = 'center';
heroBefore.style.zIndex = '0';
heroBefore.style.transition = 'opacity 1s ease-in-out';
heroBefore.style.opacity = '1';
heroElement.prepend(heroBefore);

function cycleHeroImages() {
  heroBefore.style.opacity = '0';
  setTimeout(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroBefore.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
    heroBefore.style.opacity = '1';
  }, 1000); // matches the CSS fade transition
}

// Start with first image
heroBefore.style.backgroundImage = `url('${heroImages[0]}')`;

// Autoplay every 5 seconds
setInterval(cycleHeroImages, 5000);
