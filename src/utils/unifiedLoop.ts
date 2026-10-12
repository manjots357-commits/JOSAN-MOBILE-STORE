/**
 * Centralized High-Performance Animation Loop
 * 
 * Enforces a SINGLE requestAnimationFrame across the entire application:
 * - Rain & mist atmospheric particle simulation
 * - Custom cursor smoothing & ambient lighting
 * - Three.js 3D phone scene & dynamic lighting
 * - Parallax transforms
 * - Performance & FPS monitoring
 * 
 * Includes adaptive quality tiering for guaranteed 60 FPS on desktop and 30-60 FPS on mobile.
 */

export type LoopSubscriber = (deltaMs: number, elapsedSec: number, fps: number) => void;

interface SubscriberEntry {
  id: string;
  priority: number; // Lower priority executes first
  fn: LoopSubscriber;
}

export type DeviceTier = 'high' | 'mid' | 'mobile' | 'low';

class CentralAnimationEngine {
  private subscribers: SubscriberEntry[] = [];
  private isRunning = false;
  private animId: number | null = null;
  private lastTime = 0;
  private startTime = 0;
  private frameCount = 0;
  private fpsAccumulator = 0;
  private currentFps = 60;
  private deviceTier: DeviceTier = 'high';
  private lowFpsCounter = 0;

  constructor() {
    this.startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this.lastTime = this.startTime;
    this.detectInitialTier();

    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      window.addEventListener('resize', this.handleResize, { passive: true });
    }
  }

  private detectInitialTier() {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;

    if (isMobile) {
      this.deviceTier = cores < 4 || memory < 4 ? 'low' : 'mobile';
    } else {
      if (cores >= 8 && memory >= 8) {
        this.deviceTier = 'high';
      } else if (cores >= 4 && memory >= 4) {
        this.deviceTier = 'mid';
      } else {
        this.deviceTier = 'low';
      }
    }
  }

  private handleResize = () => {
    // Re-verify mobile status on large screen resize
    const isMobile = window.innerWidth < 768;
    if (isMobile && (this.deviceTier === 'high' || this.deviceTier === 'mid')) {
      this.deviceTier = 'mobile';
    }
  };

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  };

  public subscribe(id: string, fn: LoopSubscriber, priority = 50): () => void {
    // Replace existing if already subscribed
    this.subscribers = this.subscribers.filter((s) => s.id !== id);
    this.subscribers.push({ id, priority, fn });
    this.subscribers.sort((a, b) => a.priority - b.priority);

    if (!this.isRunning && this.subscribers.length > 0) {
      this.start();
    }

    return () => this.unsubscribe(id);
  }

  public unsubscribe(id: string) {
    this.subscribers = this.subscribers.filter((s) => s.id !== id);
    if (this.subscribers.length === 0) {
      this.stop();
    }
  }

  public getFps(): number {
    return this.currentFps;
  }

  public getDeviceTier(): DeviceTier {
    return this.deviceTier;
  }

  /**
   * Recommended particle count based on adaptive performance tier
   */
  public getRecommendedParticleCount(): number {
    switch (this.deviceTier) {
      case 'high':
        return 1800;
      case 'mid':
        return 1000;
      case 'mobile':
        return 450;
      case 'low':
        return 200;
      default:
        return 800;
    }
  }

  private start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animId = requestAnimationFrame(this.tick);
  }

  private stop() {
    this.isRunning = false;
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private tick = (now: number) => {
    if (!this.isRunning) return;

    const deltaMs = Math.min(now - this.lastTime, 100); // Clamped delta to avoid huge jumps on frame drops
    this.lastTime = now;
    const elapsedSec = (now - this.startTime) / 1000;

    // FPS Calculation
    this.frameCount++;
    this.fpsAccumulator += deltaMs;
    if (this.fpsAccumulator >= 500) {
      const calculatedFps = Math.round((this.frameCount * 1000) / this.fpsAccumulator);
      this.currentFps = Math.min(60, Math.max(15, calculatedFps));
      this.frameCount = 0;
      this.fpsAccumulator = 0;

      // Adaptive throttle if sustained FPS is low
      if (this.currentFps < 45) {
        this.lowFpsCounter++;
        if (this.lowFpsCounter > 4) {
          // Demote tier to preserve silky experience
          if (this.deviceTier === 'high') this.deviceTier = 'mid';
          else if (this.deviceTier === 'mid') this.deviceTier = 'mobile';
          else if (this.deviceTier === 'mobile') this.deviceTier = 'low';
          this.lowFpsCounter = 0;
        }
      } else {
        this.lowFpsCounter = Math.max(0, this.lowFpsCounter - 1);
      }
    }

    // Execute all registered modules in order
    for (let i = 0; i < this.subscribers.length; i++) {
      try {
        this.subscribers[i].fn(deltaMs, elapsedSec, this.currentFps);
      } catch (err) {
        console.error(`Error in animation subscriber "${this.subscribers[i].id}":`, err);
      }
    }

    this.animId = requestAnimationFrame(this.tick);
  };
}

export const centralLoop = new CentralAnimationEngine();
