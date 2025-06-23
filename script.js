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

  // THREE.JS 3D HERO ART (REFINED)
  const canvas = document.getElementById('hero-3d');
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // High-poly TorusKnot + Physical material for that liquid-glass vibe
  const geometry = new THREE.TorusKnotGeometry(
    /* radius */      0.6,
    /* tube */        0.12,
    /* tubularSegments */  400,
    /* radialSegments */    128
  );

  const material = new THREE.MeshPhysicalMaterial({
    color: 0x9d4edd,             // base purple
    emissive: 0x6d28d9,          // subtle glow
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9
  });

  const knot = new THREE.Mesh(geometry, material);
  scene.add(knot);

  // Lighting
  const keyLight = new THREE.PointLight(0xffffff, 1.0);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xffffff, 0.4);
  fillLight.position.set(-3, -2, 2);
  scene.add(fillLight);

  const ambient = new THREE.AmbientLight(0x222222);
  scene.add(ambient);

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animate
  function animate3D() {
    knot.rotation.x += 0.003;
    knot.rotation.y += 0.005;
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
