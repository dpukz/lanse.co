// Simple scroll-reveal for sections:
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const revealOnIntersect = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // stop observing once revealed
      }
    });
  };
  const observer = ('IntersectionObserver' in window) 
    ? new IntersectionObserver(revealOnIntersect, observerOptions) 
    : null;
  if (observer) {
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
  } else {
    // Fallback: if IntersectionObserver unsupported, just show all sections
    document.querySelectorAll('section').forEach(sec => sec.classList.add('visible'));
  }
});

// Hero video play overlay logic
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.hero-video-wrapper');
  const video   = document.getElementById('hero-video');

  // on click anywhere in wrapper, play/pause
  wrapper.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      wrapper.classList.add('playing');
    } else {
      video.pause();
      wrapper.classList.remove('playing');
    }
  });

  // when video ends, show the overlay again
  video.addEventListener('ended', () => {
    wrapper.classList.remove('playing');
  });
});
