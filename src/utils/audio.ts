class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.08,
    delay: number = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playClick() {
    this.playTone(520, 0.06, 'triangle', 0.05);
  }

  public playSchoolBell() {
    this.playTone(659.25, 0.24, 'triangle', 0.08, 0);
    this.playTone(523.25, 0.3, 'triangle', 0.08, 0.14);
    this.playTone(659.25, 0.35, 'triangle', 0.07, 0.3);
  }

  public playGoodChoice() {
    this.playTone(523.25, 0.14, 'sine', 0.08, 0);
    this.playTone(659.25, 0.16, 'sine', 0.08, 0.09);
    this.playTone(783.99, 0.28, 'sine', 0.09, 0.18);
  }

  public playNeutralChoice() {
    this.playTone(440, 0.14, 'triangle', 0.06, 0);
    this.playTone(493.88, 0.18, 'triangle', 0.05, 0.1);
  }

  public playPoorChoice() {
    this.playTone(311.13, 0.18, 'sawtooth', 0.05, 0);
    this.playTone(261.63, 0.28, 'sawtooth', 0.05, 0.14);
  }

  public playAlert() {
    this.playTone(220, 0.22, 'sawtooth', 0.07, 0);
    this.playTone(196, 0.32, 'sawtooth', 0.07, 0.18);
  }
}

export const soundEngine = new SoundEngine();
