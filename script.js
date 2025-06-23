document.addEventListener('DOMContentLoaded', () => {
  // Scroll-reveal
  const observer = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 })
    : null;

  if (observer) {
    document.querySelectorAll('section').forEach(s => observer.observe(s));
  } else {
    document.querySelectorAll('section').forEach(s => s.classList.add('visible'));
  }

  // Custom cursor movement
  const cursor = document.querySelector('.custom-cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Hero black-hole follow
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
      const y = ((e.clientY - rect.top) / rect.height) * 100 + '%';
      hero.style.setProperty('--cursor-x', x);
      hero.style.setProperty('--cursor-y', y);
    });
  }

  // Video play/pause overlay
  const wrap = document.querySelector('.hero-video-wrapper');
  const vid  = document.getElementById('assistant-video');
  if (wrap && vid) {
    wrap.addEventListener('click', () => {
      if (vid.paused) {
        vid.play(); wrap.classList.add('playing');
      } else {
        vid.pause(); wrap.classList.remove('playing');
      }
    });
    vid.addEventListener('ended', () => wrap.classList.remove('playing'));
  }
});