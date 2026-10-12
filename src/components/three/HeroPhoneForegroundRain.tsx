import React, { useEffect, useRef } from 'react';
import { centralLoop } from '../../utils/unifiedLoop';

/**
 * HeroPhoneForegroundRain
 * 
 * Provides subtle foreground depth around the 3D smartphone:
 * - Just 18-24 delicate, softly illuminated droplets drifting in front of the phone
 * - Soft Sage (#9ABCAB) and Champagne (#DFBE8B) highlights
 * - Zero performance overhead: Float32Array, single centralLoop tick, no React re-renders
 * - Combined with background rain behind the phone, completes the cinematic depth sandwich
 */

const DROP_COUNT = 20;
const STRIDE = 6;
// [0: x, 1: y, 2: vy, 3: len, 4: alpha, 5: colorType (0=sage, 1=champagne)]

export const HeroPhoneForegroundRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 580);

    const data = new Float32Array(DROP_COUNT * STRIDE);

    for (let i = 0; i < DROP_COUNT; i++) {
      const off = i * STRIDE;
      data[off + 0] = Math.random() * width;
      data[off + 1] = Math.random() * height;
      data[off + 2] = 400 + Math.random() * 250; // Gentle, slow-medium fall
      data[off + 3] = 16 + Math.random() * 18; // Soft droplet streak
      data[off + 4] = 0.12 + Math.random() * 0.18; // Faint, subtle alpha
      data[off + 5] = Math.random() > 0.4 ? 1 : 0; // Champagne or Sage
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const onTick = (deltaMs: number) => {
      const dt = deltaMs / 1000;
      if (dt <= 0) return;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';

      for (let i = 0; i < DROP_COUNT; i++) {
        const off = i * STRIDE;
        let x = data[off + 0];
        let y = data[off + 1];
        const vy = data[off + 2];
        const len = data[off + 3];
        const alpha = data[off + 4];
        const colorType = data[off + 5];

        y += vy * dt;
        if (y > height + len) {
          x = Math.random() * width;
          y = -len - Math.random() * 30;
        }

        data[off + 0] = x;
        data[off + 1] = y;

        ctx.beginPath();
        if (colorType === 1) {
          // Warm champagne ember
          ctx.fillStyle = `rgba(223, 190, 139, ${alpha * 0.9})`;
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Warm cream falling light streak
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = `rgba(245, 240, 230, ${alpha * 0.75})`;
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + len * 0.6);
          ctx.stroke();
        }
      }
    };

    const unsubscribe = centralLoop.subscribe('hero-phone-fg-rain', onTick, 35);

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-30 w-full h-full select-none"
      aria-hidden="true"
    />
  );
};
