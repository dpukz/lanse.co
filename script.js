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
