document.addEventListener('DOMContentLoaded', function() {
  // 1) Scroll-reveal setup
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const revealOnIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = ('IntersectionObserver' in window)
    ? new IntersectionObserver(revealOnIntersect, observerOptions)
    : null;

  if (observer) {
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
  } else {
    // Fallback: show all immediately
    document.querySelectorAll('section').forEach(sec => sec.classList.add('visible'));
  }

  // 2) Video play/pause overlay
  const wrapper = document.querySelector('.hero-video-wrapper');
  const video   = document.getElementById('assistant-video');
  if (wrapper && video) {
    wrapper.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        wrapper.classList.add('playing');
      } else {
        video.pause();
        wrapper.classList.remove('playing');
      }
    });
    video.addEventListener('ended', () => {
      wrapper.classList.remove('playing');
    });
  }
});
