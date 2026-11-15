import { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Orbit, 
  Disc, 
  Waves, 
  Dna, 
  Scissors, 
  Network, 
  Play, 
  Sliders, 
  Zap,
  Volume2
} from 'lucide-react';
import { TornPaperBox } from './TornPaperBox';
import { 
  animationManager, 
  type AnimationPreset, 
  type AnimationConfig 
} from '../utils/animationEvents';

interface AnimationExhibit {
  id: AnimationPreset | 'paper_tear' | 'dag_graph';
  title: string;
  category: string;
  badge: string;
  description: string;
  formula: string;
  specs: string[];
  icon: any;
  is3dPreset: boolean;
}

const EXHIBITS: AnimationExhibit[] = [
  {
    id: 'face',
    title: 'MediaPipe Canonical Face Mask',
    category: '3D Forensic Sculpture',
    badge: '2,264 LANDMARKS',
    description: 'Accurate human facial topology sampled from Google MediaPipe with 1.0s dynamic morphing between sculpted mask, vapor vortex, laser slices, and focused micro-expression.',
    formula: 'P_interp(t) = P_A + (P_B - P_A) * EaseInOut(t) + CurlNoise(x, y, z)',
    specs: ['468 Canonical Vertices', '898 Triangular Faces', '1.0s Morph Cycle', 'Cyan / Sky Spectrum'],
    icon: Sparkles,
    is3dPreset: true,
  },
  {
    id: 'blackhole',
    title: 'Relativistic Cosmic Singularity',
    category: 'Astrophysical Orbit',
    badge: 'EVENT HORIZON',
    description: 'Keplerian accretion disk particle physics spiraling into a gravitational event horizon with relativistic angular velocity and Doppler photon warping.',
    formula: 'v_orb(r) = sqrt(G * M / r) * (1 - r_s / r)^(-1/2)',
    specs: ['Keplerian Accretion Disk', 'Event Horizon Warp', 'Relativistic Beaming', 'Orbital Inertia'],
    icon: Orbit,
    is3dPreset: true,
  },
  {
    id: 'torusknot',
    title: 'Higher-Dimension Torus Knot (3, 7)',
    category: 'Non-Euclidean Topology',
    badge: 'P=3, Q=7 MANIFOLD',
    description: 'Parametric topological manifold winding 7 times through 3 toroidal lobes in continuous 3D space with chromatic phase dispersion.',
    formula: 'x = (R + r*cos(7φ))*cos(3φ), y = (R + r*cos(7φ))*sin(3φ), z = -r*sin(7φ)',
    specs: ['Trefoil Class (3, 7)', 'Continuous Parameter φ', 'Phase Chromatics', 'Toroidal Rotation'],
    icon: Disc,
    is3dPreset: true,
  },
  {
    id: 'wavegrid',
    title: 'Harmonic Fluid Wavefield',
    category: 'Audio Fluid Dynamics',
    badge: 'BESSEL UNDULATION',
    description: 'Concentric Bessel wave undulations simulating a vibrating liquid speaker diaphragm in harmonic resonance with Web Audio frequency bursts.',
    formula: 'z(r, t) = J_0(k * r) * cos(ω * t) * exp(-γ * r)',
    specs: ['Bessel Function J0', 'Harmonic Resonance', 'Audio Reactive Sync', 'Viscous Damping'],
    icon: Waves,
    is3dPreset: true,
  },
  {
    id: 'dna',
    title: 'Bio-Computational Double Helix',
    category: 'Molecular Matrix',
    badge: 'DUAL STRAND',
    description: 'Parametric dual-strand helical rotation with stochastic molecular cross-bridges representing local neural models and agent memory graphs.',
    formula: 'H_1(t) = [R*cos(ωt), t, R*sin(ωt)], H_2(t) = [R*cos(ωt+π), t, R*sin(ωt+π)]',
    specs: ['3.6 Radians / Turn', 'Synaptic Bridges', 'Helical Symmetry', 'Memory Lattice'],
    icon: Dna,
    is3dPreset: true,
  },
  {
    id: 'paper_tear',
    title: 'Tactile Torn Paper Physics',
    category: 'Craft Material Engine',
    badge: 'FIBER SIMULATION',
    description: 'Physical simulation of torn deckle edges, paper pulp grain, micro-tears, washi drafting tape adhesion, and mechanical folding origami.',
    formula: 'FiberEdge(x) = Base + feTurbulence(freq=0.04) * feDisplacement(scale=12)',
    specs: ['Deckle Edge Pulp', 'Washi Tape Flex', 'Perforation Snapping', 'Tactile Audio FX'],
    icon: Scissors,
    is3dPreset: false,
  },
  {
    id: 'dag_graph',
    title: 'Agent OS Execution DAG Flow',
    category: 'Systems Security Graph',
    badge: 'DETERMINISTIC PIPELINE',
    description: 'Real-time node execution tracing User Intent → Schema Parsing → Policy Gateway → DLP Packet Intercept → Atomic Rollback.',
    formula: 'State_t+1 = SandboxGate(PolicyGateway(Intent_parsed)) || Rollback(Snapshot_0)',
    specs: ['7-Stage Pipeline', 'DLP Packet Intercept', 'JSON Schema Gate', 'Atomic Snapshots'],
    icon: Network,
    is3dPreset: false,
  }
];

export const AnimationGallery = () => {
  const [config, setConfig] = useState<AnimationConfig>(animationManager.getConfig());
  const [activeExhibit, setActiveExhibit] = useState<AnimationExhibit>(EXHIBITS[0]);
  const [showFormula, setShowFormula] = useState<boolean>(false);
  const [paperTearCount, setPaperTearCount] = useState<number>(0);
  const [dagStep, setDagStep] = useState<number>(0);
  const [isDagPlaying, setIsDagPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsub = animationManager.subscribe((newCfg) => {
      setConfig(newCfg);
    });
    return unsub;
  }, []);

  const handleSelectExhibit = (exhibit: AnimationExhibit) => {
    sound.playBlip(800, 0.04);
    setActiveExhibit(exhibit);
    if (exhibit.is3dPreset) {
      animationManager.setPreset(exhibit.id as AnimationPreset);
    }
  };

  const handleTriggerPaperTear = () => {
    sound.playAlert(); // crisp paper tear sound
    setPaperTearCount((prev) => prev + 1);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.6 },
      colors: ['#e2e8f0', '#94a3b8', '#cbd5e1', '#38bdf8']
    });
  };

  const handleRunDagSimulation = () => {
    if (isDagPlaying) return;
    setIsDagPlaying(true);
    setDagStep(1);
    sound.playBlip(600, 0.03);

    const steps = [
      { step: 2, delay: 600, soundFn: () => sound.playBlip(750, 0.03) },
      { step: 3, delay: 1200, soundFn: () => sound.playBlip(850, 0.03) },
      { step: 4, delay: 1800, soundFn: () => sound.playAlert() }, // DLP Block
      { step: 5, delay: 2400, soundFn: () => sound.playSuccess() }, // Rollback
    ];

    steps.forEach(({ step, delay, soundFn }) => {
      setTimeout(() => {
        setDagStep(step);
        soundFn();
        if (step === 5) {
          setIsDagPlaying(false);
        }
      }, delay);
    });
  };

  const handlePlaySoundPulse = () => {
    sound.playSuccess();
    sound.playBlip(432, 0.08);
  };

  return (
    <section id="animation-gallery" className="relative w-full py-24 px-6 sm:px-10 surface-deep border-t border-white/6 text-white">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#11141d] border border-white/8 text-sky-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE ANIMATION LABORATORY // VAULT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white font-['Space_Grotesk']">
              Physics & animation gallery
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Explore mathematical flow fields, real-time 3D topological morphs, tactile craft physics, and systems execution animations. Click any exhibit to trigger or apply live.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Active Preset: <strong className="text-white uppercase">{config.preset}</strong></span>
          </div>
        </div>

        {/* Master Interactive Control Stage */}
        <div className="mb-12">
          <TornPaperBox
            hasTape={true}
            tapePosition="both"
            stamp={`ANIMATION STAGE // ACTIVE: ${activeExhibit.title.toUpperCase()}`}
            hasPerforation={true}
            driftVariant="slow"
            bgDarkness="deeper"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              
              {/* Exhibit Active Details */}
              <div className="max-w-xl space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-sm bg-sky-950/70 border border-sky-500/30 text-sky-300 font-mono text-[11px] font-medium tracking-wide">
                    {activeExhibit.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeExhibit.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium font-['Space_Grotesk'] text-white">
                  {activeExhibit.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeExhibit.description}
                </p>

                {/* Technical Specs Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeExhibit.specs.map((spec, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2 py-0.5 rounded-sm bg-[#090c14] border border-white/8 text-[11px] font-mono text-slate-300"
                    >
                      ✓ {spec}
                    </span>
                  ))}
                </div>

                {/* Mathematical Formula Preview */}
                <div className="p-3 rounded-sm bg-[#07090f] border border-white/8 font-mono text-xs">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 flex items-center justify-between">
                    <span>Mathematical Governing Equation</span>
                    <button 
                      onClick={() => setShowFormula(!showFormula)} 
                      className="text-sky-400 hover:text-sky-300 text-[10px] cursor-pointer"
                    >
                      {showFormula ? 'Hide GLSL' : 'Show Equation'}
                    </button>
                  </div>
                  <div className="text-sky-300 overflow-x-auto py-1">
                    {activeExhibit.formula}
                  </div>
                </div>

                {/* Special Sandbox Triggers based on Exhibit Type */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {activeExhibit.is3dPreset && (
                    <button
                      onClick={() => {
                        sound.playSuccess();
                        animationManager.setPreset(activeExhibit.id as AnimationPreset);
                      }}
                      className="px-4 py-2 rounded-sm bg-[#f0f2f5] text-[#0a0c12] font-medium text-xs font-mono flex items-center gap-2 hover:bg-white transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
                    >
                      <Zap className="w-3.5 h-3.5 text-sky-600" />
                      Apply as live 3D background
                    </button>
                  )}

                  {activeExhibit.id === 'paper_tear' && (
                    <button
                      onClick={handleTriggerPaperTear}
                      className="px-4 py-2 rounded-sm bg-[#f0f2f5] text-[#0a0c12] font-medium text-xs font-mono flex items-center gap-2 hover:bg-white transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      Tear simulated paper ({paperTearCount} tears)
                    </button>
                  )}

                  {activeExhibit.id === 'dag_graph' && (
                    <button
                      onClick={handleRunDagSimulation}
                      disabled={isDagPlaying}
                      className="px-4 py-2 rounded-sm bg-[#f0f2f5] text-[#0a0c12] font-medium text-xs font-mono flex items-center gap-2 hover:bg-white transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5" />
                      {isDagPlaying ? 'Executing DAG simulation...' : 'Simulate execution DAG flow'}
                    </button>
                  )}

                  {activeExhibit.id === 'wavegrid' && (
                    <button
                      onClick={handlePlaySoundPulse}
                      className="px-3.5 py-2 rounded-sm bg-[#161a26] hover:bg-[#202636] border border-white/10 text-slate-200 text-xs font-mono flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                      Play 432Hz harmonic wave pulse
                    </button>
                  )}
                </div>

                {/* Interactive DAG Graph Steps Display */}
                {activeExhibit.id === 'dag_graph' && dagStep > 0 && (
                  <div className="mt-4 p-3 rounded-sm bg-[#07090f] border border-white/8 font-mono text-xs space-y-1.5">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                      Execution State Trace:
                    </div>
                    <div className={dagStep >= 1 ? 'text-sky-300' : 'text-slate-600'}>
                      1. [Intent Parsing] User query decomposed into structured JSON schema.
                    </div>
                    <div className={dagStep >= 2 ? 'text-sky-300' : 'text-slate-600'}>
                      2. [Policy Evaluation] Boundary checks verified against Downloads directory.
                    </div>
                    <div className={dagStep >= 3 ? 'text-sky-300' : 'text-slate-600'}>
                      3. [Snapshot Created] Filesystem state recorded (SHA-256 backup: 0x9b4...).
                    </div>
                    <div className={dagStep >= 4 ? 'text-amber-400 font-medium' : 'text-slate-600'}>
                      4. [DLP Gate Intercept] Outbound exfiltration detected and blocked!
                    </div>
                    <div className={dagStep >= 5 ? 'text-emerald-400 font-medium' : 'text-slate-600'}>
                      5. [Atomic Rollback] Workspace cleanly reverted to snapshot state. 0 data loss.
                    </div>
                  </div>
                )}
              </div>

              {/* Live Animation Tuning Controls */}
              <div className="w-full lg:w-72 p-5 rounded-sm bg-[#07090f] border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-white/8 text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-sky-400" />
                    Physics Parameters
                  </span>
                  <span className="text-[10px] text-slate-500">LIVE WEGL</span>
                </div>

                {/* Speed Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>Flow Velocity</span>
                    <span className="text-sky-300">{config.speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="2.5"
                    step="0.1"
                    value={config.speed}
                    onChange={(e) => {
                      animationManager.updateConfig({ speed: parseFloat(e.target.value) });
                    }}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                {/* Turbulence Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>Turbulence / Noise</span>
                    <span className="text-sky-300">{config.turbulence.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={config.turbulence}
                    onChange={(e) => {
                      animationManager.updateConfig({ turbulence: parseFloat(e.target.value) });
                    }}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                {/* Color Spectrum Theme Selector */}
                <div>
                  <div className="text-xs font-mono text-slate-400 mb-2">
                    Color Spectrum
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                    {[
                      { id: 'cyan', label: 'Cyan Matrix', color: '#38bdf8' },
                      { id: 'amber', label: 'Amber Craft', color: '#f59e0b' },
                      { id: 'emerald', label: 'Terminal Green', color: '#10b981' },
                      { id: 'aurora', label: 'Aurora Violet', color: '#a855f7' }
                    ].map((thm) => (
                      <button
                        key={thm.id}
                        onClick={() => {
                          sound.playBlip(900, 0.02);
                          animationManager.updateConfig({ colorTheme: thm.id as any });
                        }}
                        className={`px-2 py-1.5 rounded-sm border text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                          config.colorTheme === thm.id
                            ? 'bg-[#141a28] border-white/20 text-white font-medium'
                            : 'bg-[#090b10] border-white/6 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: thm.color }}
                        />
                        <span className="truncate">{thm.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </TornPaperBox>
        </div>

        {/* Gallery Grid of Animation Exhibits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXHIBITS.map((exhibit, idx) => {
            const Icon = exhibit.icon;
            const isSelected = activeExhibit.id === exhibit.id;
            const isBackgroundActive = exhibit.is3dPreset && config.preset === exhibit.id;

            return (
              <div
                key={exhibit.id}
                onClick={() => handleSelectExhibit(exhibit)}
                className="cursor-pointer"
              >
                <TornPaperBox
                  hasTape={true}
                  tapePosition={idx % 2 === 0 ? 'top-left' : 'top-right'}
                  driftVariant={idx % 2 === 0 ? 'slow' : 'reverse'}
                  stamp={`EXHIBIT // #0${idx + 1}`}
                  className="h-full"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {/* Meta header */}
                      <div className="flex items-center justify-between text-xs font-mono mb-3">
                        <span className="text-sky-400 font-medium">{exhibit.category}</span>
                        {isBackgroundActive && (
                          <span className="text-emerald-400 px-2 py-0.5 rounded-sm bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE BACKGROUND
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`p-2 rounded-sm border ${
                          isSelected 
                            ? 'bg-sky-950/60 border-sky-500/40 text-sky-400' 
                            : 'bg-[#121622] border-white/8 text-slate-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-lg font-medium font-['Space_Grotesk'] text-white">
                          {exhibit.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                        {exhibit.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/8 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">
                        {exhibit.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectExhibit(exhibit);
                        }}
                        className={`text-xs font-mono px-2.5 py-1 rounded-sm border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-sky-950/60 border-sky-500/30 text-sky-300'
                            : 'bg-[#121622] border-white/8 text-slate-300 hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Active Exhibit' : 'Inspect Exhibit'}
                      </button>
                    </div>
                  </div>
                </TornPaperBox>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
