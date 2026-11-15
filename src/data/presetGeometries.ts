// Precomputed target coordinate buffers for the 3D Animation Gallery presets
// Matching exactly N = 2264 vertices of the canonical face model

const N = 2264;

export const generatePresetBuffers = () => {
  const blackhole = new Float32Array(N * 3);
  const torusknot = new Float32Array(N * 3);
  const wavegrid = new Float32Array(N * 3);
  const dna = new Float32Array(N * 3);

  // 1. Cosmic Black Hole Accretion Disk
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const radius = 0.35 + Math.pow(t, 0.65) * 2.6;
    const theta = t * Math.PI * 2 * 14 + (Math.sin(i * 12.5) * 0.2);
    const i3 = i * 3;
    blackhole[i3] = Math.cos(theta) * radius;
    blackhole[i3 + 1] = (Math.sin(i * 3.7) * 0.12) * (1 + radius * 0.4);
    blackhole[i3 + 2] = Math.sin(theta) * radius * 0.55;
  }

  // 2. Parametric Torus Knot (3, 7) Higher-Dimension Lattice
  const R = 1.35;
  const r = 0.58;
  const p = 3;
  const q = 7;
  for (let i = 0; i < N; i++) {
    const phi = (i / N) * Math.PI * 2;
    const rad = R + r * Math.cos(q * phi);
    const i3 = i * 3;
    torusknot[i3] = rad * Math.cos(p * phi);
    torusknot[i3 + 1] = rad * Math.sin(p * phi);
    torusknot[i3 + 2] = -r * Math.sin(q * phi);
  }

  // 3. Harmonic Wave Matrix / Liquid Speaker
  const side = Math.ceil(Math.sqrt(N));
  for (let i = 0; i < N; i++) {
    const gx = (i % side) / side - 0.5;
    const gy = Math.floor(i / side) / side - 0.5;
    const x = gx * 3.8;
    const y = gy * 3.8;
    const dist = Math.sqrt(x * x + y * y);
    const z = Math.sin(dist * 6) * 0.36;
    const i3 = i * 3;
    wavegrid[i3] = x;
    wavegrid[i3 + 1] = y;
    wavegrid[i3 + 2] = z;
  }

  // 4. DNA Double Helix / Neural Matrix
  for (let i = 0; i < N; i++) {
    const strand = i % 2 === 0 ? 0 : Math.PI;
    const t = (i / N) * 5.6 - 2.8;
    const angle = t * 3.6 + strand;
    const rad = 0.85;
    const i3 = i * 3;
    dna[i3] = Math.cos(angle) * rad + (Math.sin(i * 1.5) * 0.05);
    dna[i3 + 1] = t;
    dna[i3 + 2] = Math.sin(angle) * rad + (Math.cos(i * 1.5) * 0.05);
  }

  return { blackhole, torusknot, wavegrid, dna };
};
