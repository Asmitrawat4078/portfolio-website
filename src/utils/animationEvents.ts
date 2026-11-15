export type AnimationPreset = 'face' | 'blackhole' | 'torusknot' | 'wavegrid' | 'dna';

export interface AnimationConfig {
  preset: AnimationPreset;
  speed: number;
  turbulence: number;
  colorTheme: 'cyan' | 'amber' | 'emerald' | 'aurora';
}

const DEFAULT_CONFIG: AnimationConfig = {
  preset: 'face',
  speed: 1.0,
  turbulence: 1.0,
  colorTheme: 'cyan'
};

class AnimationManager {
  private config: AnimationConfig = { ...DEFAULT_CONFIG };
  private listeners: ((config: AnimationConfig) => void)[] = [];

  public getConfig(): AnimationConfig {
    return { ...this.config };
  }

  public setPreset(preset: AnimationPreset) {
    this.config.preset = preset;
    this.notify();
  }

  public updateConfig(partial: Partial<AnimationConfig>) {
    this.config = { ...this.config, ...partial };
    this.notify();
  }

  public subscribe(fn: (config: AnimationConfig) => void): () => void {
    this.listeners.push(fn);
    fn(this.config);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.config));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('animation-config-change', { detail: this.config }));
    }
  }
}

export const animationManager = new AnimationManager();
