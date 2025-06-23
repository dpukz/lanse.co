document.addEventListener('DOMContentLoaded', () => {
  // ===== SMOOTH CUSTOM CURSOR =====
  const cursor = document.querySelector('.custom-cursor');
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    (function animateCursor() {
      posX += (mouseX - posX) * 0.2;
      posY += (mouseY - posY) * 0.2;
      cursor.style.transform = `translate(${posX}px, ${posY}px) scale(1.2)`;
      requestAnimationFrame(animateCursor);
    })();
  }

  // ===== THREE.JS 3D HERO ART: Procedural Black Hole Shader =====
  // Make sure your HTML includes: <canvas id="hero-3d"></canvas>
  // and that Three.js is loaded before this script.
  const canvas = document.getElementById('hero-3d');
  if (canvas && window.THREE) {
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Orthographic camera for fullscreen quad
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Scene and fullscreen plane
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // ShaderMaterial: glowing accretion ring over dark center
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float u_time;
        uniform vec2 u_resolution;

        // Simple hash-based noise
        float rand(vec2 co) {
          return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          // Normalize coords to [-1,1], preserving aspect ratio
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= u_resolution.x / u_resolution.y;
          float r = length(uv);
          float angle = atan(uv.y, uv.x);

          // Add a subtle swirl perturbation over time
          float swirl = sin(angle * 10.0 + u_time * 0.5) * 0.02;
          r += swirl;

          // Define inner and outer radius for ring
          float inner = 0.3;
          float outer = 0.5;
          float thickness = 0.02;

          // Compute glow intensity between inner and outer radii
          float glow = smoothstep(inner, inner + thickness, r)
                     - smoothstep(outer - thickness, outer, r);

          // Apply subtle flicker/noise
          float noise = rand(vec2(angle * 5.0, u_time * 0.2));
          glow *= 0.8 + 0.2 * noise;

          // Color gradient: deep purple → orange
          float t = smoothstep(inner, outer, r);
          vec3 colorInner = vec3(0.3, 0.0, 0.5);
          vec3 colorOuter = vec3(1.0, 0.5, 0.2);
          vec3 ringColor = mix(colorInner, colorOuter, t);

          // Final ring color
          vec3 color = ringColor * glow;

          // Dark center inside inner radius
          if (r < inner) {
            color *= 0.1;
          }

          // Fade out at edges (optional, makes edges darker)
          float edgeFade = smoothstep(1.2, 0.8, r);
          color *= edgeFade;

          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // Handle window resize
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      const newAspect = window.innerWidth / window.innerHeight;
      camera.left = -newAspect;
      camera.right = newAspect;
      camera.updateProjectionMatrix();
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    const clock = new THREE.Clock();
    (function animate3D() {
      material.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate3D);
    })();
  }

  // ===== SCROLL-REVEAL ON HOME PAGE =====
  const isHome = location.pathname.endsWith('index.html')
              || location.pathname === '/'
              || location.pathname === '/index.html';
  if (isHome && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(section => observer.observe(section));
  } else {
    // If not home or no IntersectionObserver support, just mark visible
    document.querySelectorAll('section').forEach(section => section.classList.add('visible'));
  }

  // ===== VIDEO PLAY/PAUSE OVERLAY =====
  const wrap = document.querySelector('.hero-video-wrapper');
  const vid = document.getElementById('assistant-video');
  if (wrap && vid) {
    wrap.addEventListener('click', () => {
      if (vid.paused) {
        vid.play();
        wrap.classList.add('playing');
      } else {
        vid.pause();
        wrap.classList.remove('playing');
      }
    });
    vid.addEventListener('ended', () => {
      wrap.classList.remove('playing');
    });
  }
});
