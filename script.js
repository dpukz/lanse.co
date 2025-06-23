document.addEventListener('DOMContentLoaded', () => {
  // SMOOTH CUSTOM CURSOR
  const cursor = document.querySelector('.custom-cursor');
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  (function animateCursor() {
    posX += (mouseX - posX) * 0.2;
    posY += (mouseY - posY) * 0.2;
    cursor.style.transform = `translate(${posX}px, ${posY}px) scale(1.2)`;
    requestAnimationFrame(animateCursor);
  })();

  // THREE.JS 3D HERO ART (REFINED)
  const canvas = document.getElementById('hero-3d');
  if (canvas) {
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.TorusKnotGeometry(0.6, 0.12, 400, 128);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x9d4edd,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    const keyLight = new THREE.PointLight(0xffffff, 1.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0xffffff, 0.4);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);
    scene.add(new THREE.AmbientLight(0x222222));

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    (function animate3D() {
      knot.rotation.x += 0.003;
      knot.rotation.y += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate3D);
    })();
  }

  // ONLY scroll‐reveal on Home page
  const isHome = location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === '/index.html';
  if (isHome && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
  } else {
    // everywhere else: just show all sections immediately
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
