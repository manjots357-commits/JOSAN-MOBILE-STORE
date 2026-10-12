import React, { useEffect, useRef } from 'react';
import { centralLoop } from '../../utils/unifiedLoop';
import { globalMousePos } from '../../context/CursorContext';

/**
 * Cinematic "Fire Rain" & Ambient Golden Embers System
 * 
 * Replaces normal rain with the reference image's signature atmosphere:
 * - Vertical falling golden streaks & light rods (Champagne #DFBE8B & Warm Cream #F5F0E6)
 * - Shimmering floating sparks & embers with natural flicker and subtle burgundy aura
 * - 3 Depth layers (Background bokeh, Midground streaks, Foreground luminous embers)
 * - Cursor deflection: subtle deflection with spring-damped return
 * - High performance: typed Float32Arrays, single centralLoop tick, GPU-friendly rendering
 */

// Stride layout for Fire Rain streaks & embers:
// [0: x, 1: y, 2: vx, 3: vy, 4: length, 5: width, 6: baseAlpha, 7: phase, 8: type (0=streak, 1=ember, 2=spark)]
const STRIDE = 9;

export const CinematicRainAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color definitions matching the approved palette
    const CHAMPAGNE_RGB = '223, 190, 139';   // #DFBE8B
    const CREAM_RGB = '245, 240, 230';       // #F5F0E6
    const BURGUNDY_RGB = '143, 92, 100';     // #8F5C64
    const JADE_RGB = '58, 117, 100';         // #3A7564

    // Particle pool setup
    const maxParticles = 900;
    const particleData = new Float32Array(maxParticles * STRIDE);

    let activeCount = Math.min(650, centralLoop.getRecommendedParticleCount());

    // Initialize an ember or vertical golden light streak
    const initParticle = (index: number, randomY = true) => {
      const off = index * STRIDE;
      const rand = Math.random();

      let type = 0; // 0 = streak, 1 = floating ember, 2 = tiny spark
      let speed = 250 + Math.random() * 220;
      let length = 12 + Math.random() * 26;
      let pWidth = 1.0 + Math.random() * 0.8;
      let baseAlpha = 0.20 + Math.random() * 0.35;

      if (rand > 0.75) {
        // Long glowing vertical light streak (inspired by reference image bokeh rods)
        type = 0;
        speed = 320 + Math.random() * 280;
        length = 35 + Math.random() * 55;
        pWidth = 1.5 + Math.random() * 1.2;
        baseAlpha = 0.35 + Math.random() * 0.40;
      } else if (rand > 0.35) {
        // Floating golden ember
        type = 1;
        speed = 90 + Math.random() * 140;
        length = 2.5 + Math.random() * 3.5;
        pWidth = 2.0 + Math.random() * 1.8;
        baseAlpha = 0.40 + Math.random() * 0.45;
      } else {
        // Micro spark
        type = 2;
        speed = 140 + Math.random() * 180;
        length = 4 + Math.random() * 6;
        pWidth = 0.8 + Math.random() * 0.8;
        baseAlpha = 0.25 + Math.random() * 0.30;
      }

      particleData[off + 0] = Math.random() * width;
      particleData[off + 1] = randomY ? Math.random() * height : -length - Math.random() * 30;
      particleData[off + 2] = (Math.random() - 0.5) * 8; // Gentle horizontal drift
      particleData[off + 3] = speed;
      particleData[off + 4] = length;
      particleData[off + 5] = pWidth;
      particleData[off + 6] = baseAlpha;
      particleData[off + 7] = Math.random() * Math.PI * 2; // Flicker phase
      particleData[off + 8] = type;
    };

    for (let i = 0; i < maxParticles; i++) {
      initParticle(i, true);
    }

    // Scroll density tracking
    let scrollDensity = 1.0;
    const updateScrollDensity = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      if (progress < 0.16) {
        scrollDensity = 1.0; // Hero: Full golden fire rain
      } else if (progress < 0.42) {
        scrollDensity = 0.45; // Products: subtle
      } else if (progress < 0.65) {
        scrollDensity = 0.35; // Services/Features
      } else if (progress < 0.85) {
        scrollDensity = 0.25; // Customer showcase
      } else {
        scrollDensity = 0.85; // Store / Finale
      }
    };
    window.addEventListener('scroll', updateScrollDensity, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      activeCount = Math.min(maxParticles, centralLoop.getRecommendedParticleCount());
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let prevMouseX = globalMousePos.x;
    let prevMouseY = globalMousePos.y;

    // Simulation loop
    const onTick = (deltaMs: number, elapsedSec: number) => {
      const dt = deltaMs / 1000;
      if (dt <= 0) return;

      const isMobile = width < 768;
      const baseTargetCount = isMobile ? 180 : Math.min(650, centralLoop.getRecommendedParticleCount());
      const renderedCount = Math.floor(baseTargetCount * scrollDensity);

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient warm bokeh light blobs matching reference environment
      const bloomGrad = ctx.createRadialGradient(
        width * 0.68,
        height * 0.38,
        40,
        width * 0.68,
        height * 0.38,
        width * 0.45
      );
      bloomGrad.addColorStop(0, 'rgba(223, 190, 139, 0.055)');
      bloomGrad.addColorStop(0.5, 'rgba(143, 92, 100, 0.025)');
      bloomGrad.addColorStop(1, 'rgba(7, 45, 51, 0)');
      ctx.fillStyle = bloomGrad;
      ctx.fillRect(0, 0, width, height);

      // Mouse tracking for subtle particle deflection
      const mouseX = globalMousePos.x;
      const mouseY = globalMousePos.y;
      const mouseDistX = mouseX - prevMouseX;
      const mouseDistY = mouseY - prevMouseY;
      const mouseSpeed = isMobile
        ? 0
        : Math.min(Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY) / (dt * 1000), 2.2);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      const cursorRadius = 140;
      const cursorRadiusSq = cursorRadius * cursorRadius;

      ctx.lineCap = 'round';

      for (let i = 0; i < renderedCount; i++) {
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
            const force = (1 - dist / cursorRadius) * (0.8 + mouseSpeed * 0.5);
            vx += (dx / dist) * force * 15;
          }
        }

        // Apply physical updates
        x += vx * dt * 45;
        y += vy * dt;
        vx *= 0.93; // Smooth spring return to vertical
        phase += dt * 3.5;

        // Reset particle if scrolled past bottom
        if (y > height + len || x < -30 || x > width + 30) {
          initParticle(i, false);
          continue;
        } else {
          particleData[off + 0] = x;
          particleData[off + 1] = y;
          particleData[off + 2] = vx;
          particleData[off + 7] = phase;
        }

        // Natural shimmer & flicker factor
        const shimmer = 0.75 + Math.sin(phase) * 0.25;
        const alpha = Math.min(1, Math.max(0, baseAlpha * shimmer));

        ctx.lineWidth = pWidth;

        if (type === 1) {
          // Circular floating ember with warm champagne & plum glow
          ctx.beginPath();
          ctx.fillStyle = `rgba(${CHAMPAGNE_RGB}, ${alpha})`;
          ctx.arc(x, y, pWidth * 1.2, 0, Math.PI * 2);
          ctx.fill();

          // Subtle soft aura around larger embers
          if (pWidth > 2.2) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${BURGUNDY_RGB}, ${alpha * 0.35})`;
            ctx.arc(x, y, pWidth * 2.8, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Vertical golden light streak (resembling the reference image falling light streaks)
          ctx.beginPath();
          const grad = ctx.createLinearGradient(x, y, x + vx * 0.15, y + len);
          grad.addColorStop(0, `rgba(${CREAM_RGB}, ${alpha * 0.95})`);
          grad.addColorStop(0.6, `rgba(${CHAMPAGNE_RGB}, ${alpha * 0.75})`);
          grad.addColorStop(1, `rgba(${BURGUNDY_RGB}, 0)`);
          ctx.strokeStyle = grad;

          ctx.moveTo(x, y);
          ctx.lineTo(x + vx * 0.2, y + len);
          ctx.stroke();
        }
      }
    };

    const unsubscribe = centralLoop.subscribe('fire-rain-atmosphere', onTick, 20);

    return () => {
      window.removeEventListener('scroll', updateScrollDensity);
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] select-none"
      aria-hidden="true"
    />
  );
};
