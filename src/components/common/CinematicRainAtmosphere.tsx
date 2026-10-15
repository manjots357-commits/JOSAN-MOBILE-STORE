import React, { useEffect, useRef, useState } from 'react';
import { centralLoop } from '../../utils/unifiedLoop';
import { globalMousePos } from '../../context/CursorContext';

/**
 * CinematicRainAtmosphere
 * 
 * Shared, persistent cinematic rain & golden mist background for Josan Computer & Mobile.
 * 
 * Key Characteristics:
 * - Mounted at the application root level (in App.tsx) as a persistent `fixed inset-0` background layer.
 * - Streams continuously across the ENTIRE website: Home, Phones, Accessories, Services, Customers, Store, Contact, and Footer.
 * - Runs 60 FPS immediately on startup without requiring click or scroll.
 * - Stays strictly behind all text, buttons, modals, and interactive product cards via `pointer-events-none z-0`.
 * - Multi-depth particles: long glowing golden streaks, midground droplets, floating warm embers, and fine mist.
 * - Responsive particle counts tailored to mobile, tablet, and desktop tiers.
 * - Dynamic mouse deflection and subtle scroll velocity reaction for high-fidelity immersion.
 * - Respects `prefers-reduced-motion` accessibility standards.
 */

// Particle data layout:
// [0: x, 1: y, 2: vx, 3: vy, 4: len, 5: width, 6: baseAlpha, 7: phase, 8: type (0=streak, 1=ember, 2=fine mist)]
const STRIDE = 9;

interface CinematicRainAtmosphereProps {
  className?: string;
  particleDensity?: number;
}

export const CinematicRainAtmosphere: React.FC<CinematicRainAtmosphereProps> = ({
  className = 'fixed inset-0 pointer-events-none select-none z-0 w-full h-full',
  particleDensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const onMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', onMediaChange);
    return () => mediaQuery.removeEventListener('change', onMediaChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateCanvasDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateCanvasDimensions();

    // Brand luxury palette RGB values
    const CHAMPAGNE_RGB = '223, 190, 139'; // #DFBE8B
    const CREAM_RGB = '245, 240, 230';     // #F5F0E6
    const SAGE_RGB = '154, 188, 171';      // #9ABCAB
    const BURGUNDY_RGB = '143, 92, 100';   // #8F5C64
    const TEAL_DEEP_RGB = '7, 45, 51';     // #072D33

    // High quality particle allocation across all screen sizes
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const baseCount = isMobile ? 180 : isTablet ? 340 : 560;
    const activeCount = Math.min(700, Math.floor(baseCount * particleDensity));

    const particleData = new Float32Array(activeCount * STRIDE);

    // Initializer function for continuous rainfall
    const initParticle = (index: number, randomY = true) => {
      const off = index * STRIDE;
      const rand = Math.random();

      let type = 0; // 0 = luminous rain streak, 1 = floating ember, 2 = fine rain mist
      let speed = 480 + Math.random() * 380;
      let length = 20 + Math.random() * 32;
      let pWidth = 1.1 + Math.random() * 0.9;
      let baseAlpha = 0.32 + Math.random() * 0.38;

      if (rand > 0.78) {
        // Long golden rain streak (foreground depth tier)
        type = 0;
        speed = 680 + Math.random() * 360;
        length = 42 + Math.random() * 42;
        pWidth = 1.5 + Math.random() * 1.1;
        baseAlpha = 0.45 + Math.random() * 0.40;
      } else if (rand > 0.60) {
        // Warm floating ember / reflective dew bead
        type = 1;
        speed = 85 + Math.random() * 130;
        length = 2.5 + Math.random() * 3.5;
        pWidth = 1.8 + Math.random() * 1.8;
        baseAlpha = 0.42 + Math.random() * 0.45;
      } else if (rand < 0.22) {
        // Distant fine rain mist (background tier)
        type = 2;
        speed = 380 + Math.random() * 240;
        length = 14 + Math.random() * 18;
        pWidth = 0.8 + Math.random() * 0.6;
        baseAlpha = 0.20 + Math.random() * 0.24;
      }

      particleData[off + 0] = Math.random() * width;
      // Pre-seed across entire height so rain is immediately visible on startup
      particleData[off + 1] = randomY ? Math.random() * height : -length - Math.random() * 40;
      particleData[off + 2] = (Math.random() - 0.5) * 6; // Gentle natural drift
      particleData[off + 3] = speed;
      particleData[off + 4] = length;
      particleData[off + 5] = pWidth;
      particleData[off + 6] = baseAlpha;
      particleData[off + 7] = Math.random() * Math.PI * 2;
      particleData[off + 8] = type;
    };

    // Populate particles across the screen
    for (let i = 0; i < activeCount; i++) {
      initParticle(i, true);
    }

    // Static ambient frame if reduced motion is requested
    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      const staticGlow = ctx.createRadialGradient(
        width * 0.7, height * 0.4, 20,
        width * 0.7, height * 0.4, width * 0.45
      );
      staticGlow.addColorStop(0, 'rgba(223, 190, 139, 0.09)');
      staticGlow.addColorStop(0.5, 'rgba(7, 45, 51, 0.04)');
      staticGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = staticGlow;
      ctx.fillRect(0, 0, width, height);
      return;
    }

    let prevMouseX = globalMousePos.x;
    let prevMouseY = globalMousePos.y;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.min(Math.max((currentScrollY - lastScrollY) * 0.25, -50), 120);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Continuous RAF animation loop via centralLoop
    const onTick = (deltaMs: number) => {
      const dt = Math.min(deltaMs, 64) / 1000;
      if (dt <= 0) return;

      // Decay scroll velocity towards zero smoothly
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient warm background glow across the viewport
      const bloomGrad = ctx.createRadialGradient(
        width * 0.65,
        height * 0.35,
        40,
        width * 0.65,
        height * 0.35,
        width * 0.55
      );
      bloomGrad.addColorStop(0, 'rgba(223, 190, 139, 0.065)');
      bloomGrad.addColorStop(0.5, 'rgba(154, 188, 171, 0.03)');
      bloomGrad.addColorStop(1, 'rgba(7, 45, 51, 0)');
      ctx.fillStyle = bloomGrad;
      ctx.fillRect(0, 0, width, height);

      // Mouse tracking for organic cursor breeze deflection
      const mouseX = globalMousePos.x;
      const mouseY = globalMousePos.y;
      const mouseDistX = mouseX - prevMouseX;
      const mouseDistY = mouseY - prevMouseY;
      const mouseSpeed = isMobile
        ? 0
        : Math.min(Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY) / (dt * 1000), 2.5);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      const cursorRadius = 160;
      const cursorRadiusSq = cursorRadius * cursorRadius;

      ctx.lineCap = 'round';

      // Subtle natural rain wind slant
      const windSlantX = -1.2;

      for (let i = 0; i < activeCount; i++) {
        const off = i * STRIDE;
        let x = particleData[off + 0];
        let y = particleData[off + 1];
        let vx = particleData[off + 2];
        const vy = particleData[off + 3];
        const len = particleData[off + 4];
        const pWidth = particleData[off + 5];
        const baseAlpha = particleData[off + 6];
        let phase = particleData[off + 7];
        const type = particleData[off + 8];

        // Cursor deflection interaction (Desktop only)
        if (!isMobile) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < cursorRadiusSq && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / cursorRadius) * (0.8 + mouseSpeed * 0.6);
            vx += (dx / dist) * force * 16;
          }
        }

        // Apply physical updates + subtle scroll inertia
        const effectiveVy = vy + scrollVelocity;
        x += (vx + windSlantX) * dt * 40;
        y += effectiveVy * dt;
        vx *= 0.92; // Spring return to natural vertical path
        phase += dt * 3.5;

        // Reset particle once it travels past bottom
        if (y > height + len || x < -40 || x > width + 40) {
          initParticle(i, false);
          continue;
        } else {
          particleData[off + 0] = x;
          particleData[off + 1] = y;
          particleData[off + 2] = vx;
          particleData[off + 7] = phase;
        }

        // Shimmer & flicker factor
        const shimmer = 0.82 + Math.sin(phase) * 0.18;
        const alpha = Math.min(1, Math.max(0, baseAlpha * shimmer));

        if (type === 1) {
          // Circular floating ember / dew droplet
          ctx.beginPath();
          ctx.fillStyle = `rgba(${CHAMPAGNE_RGB}, ${alpha * 0.95})`;
          ctx.arc(x, y, pWidth * 1.15, 0, Math.PI * 2);
          ctx.fill();

          // Soft halo aura around prominent dewdrops
          if (pWidth > 2.0) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${BURGUNDY_RGB}, ${alpha * 0.35})`;
            ctx.arc(x, y, pWidth * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Photorealistic vertical falling rain streak
          ctx.lineWidth = pWidth;
          ctx.beginPath();

          // Gradient: Cream head -> Champagne mid -> Transparent tail
          const tailX = x - (vx + windSlantX) * 0.15;
          const tailY = y - len;
          const grad = ctx.createLinearGradient(x, y, tailX, tailY);

          if (type === 0) {
            grad.addColorStop(0, `rgba(${CREAM_RGB}, ${alpha * 0.95})`);
            grad.addColorStop(0.45, `rgba(${CHAMPAGNE_RGB}, ${alpha * 0.72})`);
            grad.addColorStop(1, `rgba(${TEAL_DEEP_RGB}, 0)`);
          } else {
            // Fine background mist streak
            grad.addColorStop(0, `rgba(${SAGE_RGB}, ${alpha * 0.75})`);
            grad.addColorStop(0.6, `rgba(${CHAMPAGNE_RGB}, ${alpha * 0.45})`);
            grad.addColorStop(1, 'rgba(7, 45, 51, 0)');
          }

          ctx.strokeStyle = grad;
          ctx.moveTo(x, y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
      }
    };

    const unsubscribe = centralLoop.subscribe('cinematic-rain-atmosphere', onTick, 20);

    const handleResize = () => {
      updateCanvasDimensions();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, [reducedMotion, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none select-none z-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
