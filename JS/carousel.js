// Video Carousel
const carouselContainer = document.getElementById('div-three');

// Create carousel container
const carousel = document.createElement('div');
carousel.id = 'carousel-container';
carouselContainer.appendChild(carousel);

// Video data - replace with your actual video paths
const videos = [
  {
    src: 'attributes/videos/video1.mp4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
  },
  {
    src: 'attributes/videos/video2.mp4',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
  },
  {
    src: 'attributes/videos/video3.mp4',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.'
  },
  {
    src: 'attributes/videos/video4.mp4',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.'
  },
  {
    src: 'attributes/videos/video5.mp4',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
  }
];

// Create video cards
const cards = videos.map((video, index) => {
  const card = document.createElement('div');
  card.className = 'video-card';
  
  const videoEl = document.createElement('video');
  videoEl.src = video.src;
  videoEl.loop = true;
  videoEl.muted = true;
  videoEl.autoplay = true;
  videoEl.playsInline = true;
  
  const overlay = document.createElement('div');
  overlay.className = 'video-overlay';
  
  const description = document.createElement('p');
  description.className = 'video-description';
  description.textContent = video.description;
  
  overlay.appendChild(description);
  card.appendChild(videoEl);
  card.appendChild(overlay);
  carousel.appendChild(card);
  
  return card;
});

// Carousel animation
let currentPosition = 0;
const cardHeight = carousel.clientHeight * 0.5; // Each card takes 50% of container height
const spacing = 30;

function updateCarousel() {
  cards.forEach((card, index) => {
    const position = (index * (cardHeight + spacing)) - currentPosition;
    card.style.transform = `translateY(${position}px)`;
    
    // Fade out cards that are too far off screen
    const containerHeight = carousel.clientHeight;
    if (position < -cardHeight || position > containerHeight) {
      card.style.opacity = '0';
    } else {
      card.style.opacity = '1';
    }
  });
}

// Auto-scroll upward
function autoScroll() {
  currentPosition += 0.5;
  
  // Reset when we've scrolled past all cards
  const totalHeight = videos.length * (cardHeight + spacing);
  if (currentPosition > totalHeight) {
    currentPosition = 0;
  }
  
  updateCarousel();
  requestAnimationFrame(autoScroll);
}

// Initialize
updateCarousel();
autoScroll();