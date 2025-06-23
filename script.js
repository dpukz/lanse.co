document.addEventListener('DOMContentLoaded', () => {
  // SMOOTH CUSTOM CURSOR
  const cursor = document.querySelector('.custom-cursor');
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animateCursor() {
    posX += (mouseX - posX) * 0.2;
    posY += (mouseY - posY) * 0.2;
    cursor.style.transform = `translate(${posX}px, ${posY}px) scale(1.2)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // THREE.JS 3D HERO ART
  const canvas = document.getElementById('hero-3d');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 2.5;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    emissive: 0x8b5cf6,
    emissiveIntensity: 0.7,
    roughness: 0.5,
    metalness: 0.2
  });
  const knot = new THREE.Mesh(geometry, material);
  scene.add(knot);

  const light1 = new THREE.PointLight(0xffffff, 0.8);
  light1.position.set(5,5,5);
  scene.add(light1);
  const light2 = new THREE.AmbientLight(0x444444);
  scene.add(light2);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate3D() {
    knot.rotation.x += 0.005;
    knot.rotation.y += 0.007;
    renderer.render(scene, camera);
    requestAnimationFrame(animate3D);
  }
  animate3D();

  // SCROLL REVEAL
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

  // VIDEO PLAY/PAUSE OVERLAY
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
