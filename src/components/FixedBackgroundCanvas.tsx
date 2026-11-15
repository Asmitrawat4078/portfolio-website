import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import faceData from '../data/canonicalFaceData.json';
import { generatePresetBuffers } from '../data/presetGeometries';
import { animationManager, type AnimationConfig, type AnimationPreset } from '../utils/animationEvents';

gsap.registerPlugin(ScrollTrigger);

// Key MediaPipe canonical landmark indices for facial contour line loops
const CONTOURS = {
  oval: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10],
  lipsOuter: [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 61],
  leftEye: [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246, 33],
  rightEye: [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466, 263],
  leftEyebrow: [70, 63, 105, 66, 107, 55, 65, 52, 53, 46],
  rightEyebrow: [300, 293, 334, 296, 336, 285, 295, 282, 283, 276],
  noseRidge: [168, 6, 197, 195, 5, 4, 1, 19, 94, 2]
};

export const FixedBackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090e);
    scene.fog = new THREE.FogExp2(0x07090e, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.0);
    rimLight.position.set(-6, -2, 4);
    scene.add(rimLight);

    // 3. Ground Architectural Grid Horizon
    const gridHelper = new THREE.GridHelper(80, 80, 0x161c28, 0x0c0f18);
    gridHelper.position.y = -2.7;
    scene.add(gridHelper);

    // 4. Construct Multi-Preset Mesh System
    const isMobile = width < 768;
    const meshGroup = new THREE.Group();
    meshGroup.position.set(isMobile ? 0 : 2.0, 0.1, 0);
    scene.add(meshGroup);

    const totalCount = faceData.count;
    const p0 = new Float32Array(faceData.p0);
    const p1 = new Float32Array(faceData.p1);
    const p2 = new Float32Array(faceData.p2);
    const p3 = new Float32Array(faceData.p3);
    const baseColors = new Float32Array(faceData.col);

    // Preset target coordinates
    const presets = generatePresetBuffers();

    // Active configuration state
    let activeConfig: AnimationConfig = animationManager.getConfig();
    let currentPreset: AnimationPreset = activeConfig.preset;
    
    // Preset morphing interpolation
    let morphT = 1.0;
    const sourcePositions = new Float32Array(p0);
    const targetPositions = new Float32Array(p0);
    const renderPositions = new Float32Array(p0);
    const currentColors = new Float32Array(baseColors);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(renderPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(currentColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.046,
      vertexColors: true,
      transparent: true,
      opacity: 0.96,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleMesh = new THREE.Points(geometry, particleMaterial);
    meshGroup.add(particleMesh);

    // --- Landmark Contour Lines Group (Visible prominently during face preset) ---
    const contourLinesGroup = new THREE.Group();
    meshGroup.add(contourLinesGroup);

    const contourMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const contourGeometries: {
      geom: THREE.BufferGeometry;
      indices: number[];
    }[] = [];

    Object.values(CONTOURS).forEach((indices) => {
      const linePositions = new Float32Array(indices.length * 3);
      for (let i = 0; i < indices.length; i++) {
        const vIdx = indices[i];
        linePositions[i * 3] = p0[vIdx * 3];
        linePositions[i * 3 + 1] = p0[vIdx * 3 + 1];
        linePositions[i * 3 + 2] = p0[vIdx * 3 + 2];
      }
      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const line = new THREE.Line(lineGeom, contourMaterial);
      contourLinesGroup.add(line);
      contourGeometries.push({ geom: lineGeom, indices });
    });

    // 5. Passive Ambient Paper / Dust Motes Drifting in Atmosphere
    const dustCount = 280;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 16;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      dustVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.002 + Math.random() * 0.004,
        z: (Math.random() - 0.5) * 0.003
      });
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.038,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const dustMesh = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustMesh);

    // Initial orientation
    meshGroup.rotation.y = -0.25;
    meshGroup.rotation.x = 0.04;

    // Helper to switch presets smoothly
    const getPresetBuffer = (p: AnimationPreset): Float32Array => {
      if (p === 'blackhole') return presets.blackhole;
      if (p === 'torusknot') return presets.torusknot;
      if (p === 'wavegrid') return presets.wavegrid;
      if (p === 'dna') return presets.dna;
      return p0;
    };

    // Update color palette based on theme
    const applyColorTheme = (theme: AnimationConfig['colorTheme']) => {
      const colArr = geometry.attributes.color.array as Float32Array;
      for (let i = 0; i < totalCount; i++) {
        const i3 = i * 3;
        const origR = baseColors[i3];
        const origG = baseColors[i3 + 1];
        const origB = baseColors[i3 + 2];

        if (theme === 'amber') {
          colArr[i3] = origB * 1.1;     // Amber R
          colArr[i3 + 1] = origG * 0.75; // Amber G
          colArr[i3 + 2] = origR * 0.2;  // Amber B
        } else if (theme === 'emerald') {
          colArr[i3] = origR * 0.2;
          colArr[i3 + 1] = (origG + origB) * 0.55;
          colArr[i3 + 2] = origB * 0.45;
        } else if (theme === 'aurora') {
          colArr[i3] = 0.6 + Math.sin(i * 0.05) * 0.3;
          colArr[i3 + 1] = 0.3 + Math.cos(i * 0.05) * 0.3;
          colArr[i3 + 2] = 0.9;
        } else {
          // Default cyan
          colArr[i3] = origR;
          colArr[i3 + 1] = origG;
          colArr[i3 + 2] = origB;
        }
      }
      geometry.attributes.color.needsUpdate = true;
    };

    // Subscribe to global animation changes
    const unsubscribe = animationManager.subscribe((newConfig) => {
      if (newConfig.preset !== currentPreset) {
        // Capture current rendered positions as source
        sourcePositions.set(renderPositions);
        // Copy new target positions
        targetPositions.set(getPresetBuffer(newConfig.preset));
        morphT = 0; // Trigger smooth morph
        currentPreset = newConfig.preset;

        // Fade contours when not in face mode
        gsap.to(contourMaterial, {
          opacity: newConfig.preset === 'face' ? 0.45 : 0.04,
          duration: 0.6
        });
      }

      if (newConfig.colorTheme !== activeConfig.colorTheme) {
        applyColorTheme(newConfig.colorTheme);
      }

      activeConfig = newConfig;
    });

    // 6. Mouse Parallax Setup
    let mouseX = 0;
    let mouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;
    let scrollVelocity = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 7. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime() * activeConfig.speed;

      // Mouse Parallax smooth lerp
      curMouseX += (mouseX - curMouseX) * 0.05;
      curMouseY += (mouseY - curMouseY) * 0.05;

      meshGroup.rotation.y = -0.25 + curMouseX * 0.45;
      meshGroup.rotation.x = 0.04 - curMouseY * 0.3;

      // Additional continuous rotation for cosmic & parametric presets
      if (currentPreset === 'blackhole') {
        meshGroup.rotation.z = elapsed * 0.4;
      } else if (currentPreset === 'torusknot') {
        meshGroup.rotation.y += 0.008;
        meshGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.2;
      } else if (currentPreset === 'dna') {
        meshGroup.rotation.y = elapsed * 0.5;
      }

      // Morphing interpolation step
      if (morphT < 1.0) {
        morphT = Math.min(1.0, morphT + 0.035);
      }
      const easeT = morphT < 0.5 
        ? 4 * morphT * morphT * morphT 
        : 1 - Math.pow(-2 * morphT + 2, 3) / 2;

      // Handle 1.0s Face Morph Cycle if in face preset
      if (currentPreset === 'face') {
        const stateDuration = 1.0;
        const totalStates = 4;
        const cycleProgress = elapsed / stateDuration;
        const currentState = Math.floor(cycleProgress) % totalStates;
        const nextState = (currentState + 1) % totalStates;
        const rawT = cycleProgress % 1.0;
        const subT = rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

        const getBuf = (st: number) => {
          if (st === 1) return p1;
          if (st === 2) return p2;
          if (st === 3) return p3;
          return p0;
        };
        const bA = getBuf(currentState);
        const bB = getBuf(nextState);

        // Interpolate within face states
        for (let i = 0; i < totalCount * 3; i++) {
          targetPositions[i] = bA[i] + (bB[i] - bA[i]) * subT;
        }
      }

      // Update particle positions
      const posArray = geometry.attributes.position.array as Float32Array;
      const flowTurbulence = (0.008 + Math.abs(scrollVelocity) * 0.12) * activeConfig.turbulence;

      for (let i = 0; i < totalCount; i++) {
        const i3 = i * 3;
        const sx = sourcePositions[i3];
        const sy = sourcePositions[i3 + 1];
        const sz = sourcePositions[i3 + 2];

        const tx = targetPositions[i3];
        const ty = targetPositions[i3 + 1];
        const tz = targetPositions[i3 + 2];

        const interX = sx + (tx - sx) * easeT;
        const interY = sy + (ty - sy) * easeT;
        const interZ = sz + (tz - sz) * easeT;

        // Turbulence noise
        const flowAngle = Math.sin(interY * 2.8 + elapsed * 1.6) * Math.cos(interZ * 2.8);
        const fx = Math.cos(flowAngle) * flowTurbulence;
        const fy = Math.sin(flowAngle) * flowTurbulence;
        const fz = Math.sin(interX * 2.8 + elapsed * 1.4) * flowTurbulence;

        renderPositions[i3] = interX + fx;
        renderPositions[i3 + 1] = interY + fy;
        renderPositions[i3 + 2] = interZ + fz;

        posArray[i3] = renderPositions[i3];
        posArray[i3 + 1] = renderPositions[i3 + 1];
        posArray[i3 + 2] = renderPositions[i3 + 2];
      }
      geometry.attributes.position.needsUpdate = true;

      // Update contour line vertices
      if (currentPreset === 'face' || morphT < 1.0) {
        contourGeometries.forEach(({ geom, indices }) => {
          const lineArr = geom.attributes.position.array as Float32Array;
          for (let j = 0; j < indices.length; j++) {
            const vIdx = indices[j];
            lineArr[j * 3] = posArray[vIdx * 3];
            lineArr[j * 3 + 1] = posArray[vIdx * 3 + 1];
            lineArr[j * 3 + 2] = posArray[vIdx * 3 + 2];
          }
          geom.attributes.position.needsUpdate = true;
        });
      }

      // Atmospheric dust drift
      const dustArr = dustGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        const i3 = i * 3;
        dustArr[i3] += dustVelocities[i].x;
        dustArr[i3 + 1] += dustVelocities[i].y;
        dustArr[i3 + 2] += dustVelocities[i].z;

        if (dustArr[i3 + 1] > 6) dustArr[i3 + 1] = -6;
        if (dustArr[i3] > 8) dustArr[i3] = -8;
        if (dustArr[i3] < -8) dustArr[i3] = 8;
      }
      dustGeometry.attributes.position.needsUpdate = true;

      scrollVelocity *= 0.92;
      gridHelper.position.z = (elapsed * 0.22) % 2;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Global Scroll Trigger
    let lastScroll = window.scrollY;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.0,
      onUpdate: (self) => {
        const p = self.progress;

        const currentScroll = window.scrollY;
        scrollVelocity = (currentScroll - lastScroll) * 0.008;
        lastScroll = currentScroll;

        if (!isMobile) {
          if (p < 0.22) {
            // Hero -> Terminal
            const t = p / 0.22;
            meshGroup.position.x = 2.0 - t * 3.8;
            meshGroup.position.y = 0.1 + Math.sin(t * Math.PI) * 0.3;
          } else if (p < 0.45) {
            // Terminal -> Projects
            const t = (p - 0.22) / 0.23;
            meshGroup.position.x = -1.8 + t * 1.8;
            meshGroup.position.y = 0.1 - t * 0.4;
            meshGroup.position.z = -t * 1.4;
          } else if (p < 0.7) {
            // Projects -> Gallery & Skills
            const t = (p - 0.45) / 0.25;
            meshGroup.position.x = t * 1.6;
            meshGroup.position.y = -0.3 + t * 0.4;
            meshGroup.position.z = -1.4 + t * 0.8;
          } else {
            // Creative & Contact
            const t = (p - 0.7) / 0.3;
            meshGroup.position.x = 1.6 - t * 1.6;
            meshGroup.position.y = 0.1;
            meshGroup.position.z = -0.6;
          }
        }

        camera.position.z = 7.2 - Math.sin(p * Math.PI) * 1.6;
        keyLight.position.x = 5 - p * 10;
        keyLight.position.y = 7 - p * 3;
      }
    });

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      unsubscribe();
      cancelAnimationFrame(animId);
      trigger.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
    </div>
  );
};
