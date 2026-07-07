import * as THREE from 'three';
import { journeyStore } from '@/journey/journeyStore';

/**
 * The Milky Way flight engine.
 *
 * A hand-built three.js scene: a long corridor of stars, a tilted galactic
 * band, a glowing core, and tinted nebulae. Scroll progress (read from the
 * journey store every frame, no React involved) moves the camera along the
 * corridor so the page scroll *is* the voyage.
 *
 * This module is only ever loaded via dynamic import, so devices that fall
 * back to the static backdrop never download three.js at all.
 */

export type GalaxyQuality = 'full' | 'lite';

export interface EngineHandle {
  destroy: () => void;
}

/** Total length of the flight corridor in world units */
const PATH_LENGTH = 420;
/** How far the camera actually travels across the full scroll */
const CAMERA_TRAVEL = 330;

const STAR_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vPhase;

  void main() {
    vColor = aColor;
    vPhase = aPhase;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = max(1.0, -mvPosition.z);
    gl_PointSize = clamp(aSize * uPixelRatio * (150.0 / dist), 0.0, 15.0 * uPixelRatio);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const STAR_FRAGMENT = /* glsl */ `
  uniform float uTime;
  varying vec3 vColor;
  varying float vPhase;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.04, d);
    float twinkle = 0.78 + 0.22 * sin(uTime * 1.4 + vPhase);
    float alpha = core * twinkle;
    if (alpha < 0.012) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

/** Weighted stellar palette — mostly blue-white, some warm giants */
const STAR_COLORS: Array<[THREE.Color, number]> = [
  [new THREE.Color('#ffffff'), 0.34],
  [new THREE.Color('#cfe2ff'), 0.28],
  [new THREE.Color('#9bb4ff'), 0.14],
  [new THREE.Color('#ffe9c4'), 0.14],
  [new THREE.Color('#ffd27d'), 0.06],
  [new THREE.Color('#7dd9ff'), 0.04],
];

function pickStarColor(rng: () => number): THREE.Color {
  const r = rng();
  let acc = 0;
  for (const [color, weight] of STAR_COLORS) {
    acc += weight;
    if (r <= acc) return color;
  }
  return STAR_COLORS[0][0];
}

/** Deterministic PRNG so the sky is the same on every visit */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Approximate gaussian from summed uniforms */
function gauss(rng: () => number): number {
  return (rng() + rng() + rng() - 1.5) / 1.5;
}

function makeStarField(
  count: number,
  pixelRatio: number,
  rng: () => number,
  placer: (i: number, out: THREE.Vector3) => void,
  sizeRange: [number, number],
): { points: THREE.Points; material: THREE.ShaderMaterial; geometry: THREE.BufferGeometry } {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const v = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    placer(i, v);
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;

    const color = pickStarColor(rng);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    // Bias toward small stars, occasional bright one
    const t = rng();
    sizes[i] = sizeRange[0] + (sizeRange[1] - sizeRange[0]) * t * t;
    phases[i] = rng() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: STAR_VERTEX,
    fragmentShader: STAR_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  return { points, material, geometry };
}

/** Soft radial glow texture generated on a canvas — used for nebulae + core */
function makeGlowTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(0.55, 'rgba(255,255,255,0.16)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createGalaxy(
  canvas: HTMLCanvasElement,
  quality: GalaxyQuality,
  onContextLost: () => void,
): EngineHandle {
  const rng = mulberry32(20260107);
  const full = quality === 'full';
  const pixelRatio = Math.min(window.devicePixelRatio || 1, full ? 2 : 1.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    62,
    window.innerWidth / window.innerHeight,
    0.1,
    700,
  );
  camera.position.set(0, 0, 20);

  const disposables: Array<{ dispose: () => void }> = [];
  const starMaterials: THREE.ShaderMaterial[] = [];

  // --- Corridor stars: scattered through the flight path -------------------
  const corridor = makeStarField(
    full ? 6200 : 2200,
    pixelRatio,
    rng,
    (_i, out) => {
      // Annulus around the flight axis so stars stream past, not into, the camera
      const angle = rng() * Math.PI * 2;
      const radius = 9 + Math.pow(rng(), 0.6) * 150;
      out.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        60 - rng() * (PATH_LENGTH + 260),
      );
    },
    [0.5, 2.3],
  );
  scene.add(corridor.points);
  disposables.push(corridor.geometry, corridor.material);
  starMaterials.push(corridor.material);

  // --- The Milky Way band: a dense tilted ribbon of distant stars ----------
  const band = makeStarField(
    full ? 4200 : 1400,
    pixelRatio,
    rng,
    (_i, out) => {
      out.set(
        gauss(rng) * 230,
        gauss(rng) * 16,
        60 - rng() * (PATH_LENGTH + 260),
      );
    },
    [0.4, 1.5],
  );
  band.points.rotation.z = -0.3;
  band.points.position.y = 14;
  scene.add(band.points);
  disposables.push(band.geometry, band.material);
  starMaterials.push(band.material);

  // --- Glows: galactic core + band sheen + nebulae -------------------------
  const glowTexture = makeGlowTexture();
  disposables.push(glowTexture);

  const sprites: THREE.Sprite[] = [];
  const addGlow = (
    color: string,
    opacity: number,
    scale: number,
    x: number,
    y: number,
    z: number,
  ) => {
    const material = new THREE.SpriteMaterial({
      map: glowTexture,
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.setScalar(scale);
    sprite.position.set(x, y, z);
    scene.add(sprite);
    sprites.push(sprite);
    disposables.push(material);
  };

  // Galactic core — warm heart of the Milky Way, deep in the voyage
  addGlow('#ffd9a3', 0.16, 300, -55, 32, -PATH_LENGTH * 0.8);
  addGlow('#ffedd0', 0.12, 170, -48, 28, -PATH_LENGTH * 0.78);
  addGlow('#fff6e8', 0.10, 80, -42, 25, -PATH_LENGTH * 0.77);

  // Sheen along the band
  const sheenCount = full ? 7 : 4;
  for (let i = 0; i < sheenCount; i++) {
    const z = 20 - (i / (sheenCount - 1)) * (PATH_LENGTH + 120);
    addGlow('#b9cdf2', 0.05, 150 + rng() * 120, gauss(rng) * 120, 14 + gauss(rng) * 18, z);
  }

  // Nebulae — one tinted cloud per stretch of the voyage
  const nebulaTints = ['#3b82f6', '#8b5cf6', '#2dd4bf', '#f472b6', '#38d6ff', '#6366f1'];
  const nebulaCount = full ? 6 : 3;
  for (let i = 0; i < nebulaCount; i++) {
    const z = -30 - (i / Math.max(1, nebulaCount - 1)) * (PATH_LENGTH + 60);
    const side = i % 2 === 0 ? 1 : -1;
    addGlow(
      nebulaTints[i % nebulaTints.length],
      0.055,
      190 + rng() * 130,
      side * (60 + rng() * 70),
      gauss(rng) * 50,
      z,
    );
  }

  // --- Pointer parallax (fine pointers only) --------------------------------
  let pointerX = 0;
  let pointerY = 0;
  const onPointerMove = (event: PointerEvent) => {
    pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    pointerY = (event.clientY / window.innerHeight) * 2 - 1;
  };
  if (full) window.addEventListener('pointermove', onPointerMove, { passive: true });

  // --- Resize ---------------------------------------------------------------
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };
  window.addEventListener('resize', onResize);

  // Note: no explicit visibility pause — browsers stop rAF in hidden tabs,
  // and the clamped delta absorbs the time jump when the tab resumes.

  // --- Context loss → hand control back to the static backdrop ---------------
  let destroyed = false;
  const onLost = (event: Event) => {
    event.preventDefault();
    if (!destroyed) onContextLost();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  // --- Render loop ------------------------------------------------------------
  let lastTime = performance.now();
  let elapsed = 0;
  let frame = 0;

  const render = () => {
    frame = 0;
    if (destroyed) return;

    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    elapsed += delta;

    const { progress } = journeyStore.getState();

    // Smoothed flight: ease the camera toward the scroll target each frame
    const targetZ = 20 - progress * CAMERA_TRAVEL;
    const driftX = Math.sin(progress * Math.PI * 2) * 7 + (full ? pointerX * 2.4 : 0);
    const driftY = Math.cos(progress * Math.PI * 1.5) * 3.5 + (full ? -pointerY * 1.6 : 0);

    camera.position.z += (targetZ - camera.position.z) * 0.055;
    camera.position.x += (driftX - camera.position.x) * 0.045;
    camera.position.y += (driftY - camera.position.y) * 0.045;
    camera.rotation.z += (Math.sin(progress * Math.PI * 2) * 0.028 - camera.rotation.z) * 0.04;

    for (const material of starMaterials) {
      material.uniforms.uTime.value = elapsed;
    }

    renderer.render(scene, camera);
    schedule();
  };

  const schedule = () => {
    if (!frame && !destroyed) frame = requestAnimationFrame(render);
  };
  schedule();

  return {
    destroy() {
      destroyed = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      if (full) window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('webglcontextlost', onLost);
      for (const item of disposables) item.dispose();
      renderer.dispose();
    },
  };
}
