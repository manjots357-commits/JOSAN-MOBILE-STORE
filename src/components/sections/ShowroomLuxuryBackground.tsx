import React, { useEffect, useRef } from 'react';
import { centralLoop } from '../../utils/unifiedLoop';
import { globalMousePos } from '../../context/CursorContext';

/**
 * ShowroomLuxuryBackground
 * 
 * Clean, restrained architectural atmosphere for Josan Computer & Mobile.
 * Preserves the brand's dark-teal, black, and restrained gold palette while
 * eliminating excessive glowing lines, distracting grids, and competing display bays.
 */
export const ShowroomLuxuryBackground: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onTick = () => {
      const x = globalMousePos.normX;
      const y = globalMousePos.normY;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${-x * 8}px, ${y * 6}px, 0)`;
      }
      if (floorRef.current) {
        floorRef.current.style.transform = `translate3d(${-x * 4}px, ${y * 3}px, 0)`;
      }
    };

    const unsubscribe = centralLoop.subscribe('showroom-bg-clean', onTick, 15);
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Deep architectural studio gradient (Translucent to let shared rain background show through) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#021114]/75 via-[#072D33]/45 to-[#041518]/75" />

      {/* 2. Soft, diffuse warm champagne backlight behind the showroom display focus */}
      <div
        ref={glowRef}
        className="absolute top-[32%] right-[15%] -translate-y-1/2 w-[620px] h-[520px] rounded-full bg-radial from-[#DFBE8B]/12 via-[#3A7564]/08 to-transparent blur-[120px] will-change-transform"
      />

      {/* 3. Subtle left-side atmospheric fill (soft jade) */}
      <div className="absolute top-[20%] -left-20 w-[540px] h-[540px] rounded-full bg-radial from-[#3A7564]/10 via-transparent to-transparent blur-[130px]" />

      {/* 4. Elegant architectural wall fluting (ultra-subtle texture, no neon grids) */}
      <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(90deg,transparent,transparent_32px,rgba(223,190,139,0.4)_32px,rgba(223,190,139,0.4)_33px)]" />

      {/* 5. Polished showroom floor sheen with soft reflection pool */}
      <div
        ref={floorRef}
        className="absolute inset-x-0 bottom-0 h-[36%] will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#01090b] via-[#04191c] to-transparent border-t border-[rgba(223,190,139,0.12)]" />
        {/* Soft specular reflection beneath the 3D phone plinth */}
        <div className="absolute top-0 right-[18%] w-[380px] h-[70%] bg-gradient-to-b from-[#DFBE8B]/12 via-[#3A7564]/06 to-transparent blur-2xl" />
      </div>

      {/* 6. Subtle top vignette shadow */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#020b0d]/80 to-transparent" />
    </div>
  );
};
