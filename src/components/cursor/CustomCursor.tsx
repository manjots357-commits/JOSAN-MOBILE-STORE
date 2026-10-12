import React, { useEffect, useRef } from 'react';
import { useCursor, globalMousePos } from '../../context/CursorContext';
import { centralLoop } from '../../utils/unifiedLoop';

export const CustomCursor: React.FC = () => {
  const { cursorState, cursorText, isMobile, magneticTarget, isDragging3D } = useCursor();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // Smooth lerp coordinates for the outer ring
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isMobile) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      let targetX = globalMousePos.x;
      let targetY = globalMousePos.y;

      // Magnetic pull toward snapped element center if active
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        targetX = lerp(targetX, centerX, 0.45);
        targetY = lerp(targetY, centerY, 0.45);
      }

      // Smooth outer ring lerp (0.24 factor for responsive yet silky glide)
      currentPos.current.x = lerp(currentPos.current.x, targetX, 0.24);
      currentPos.current.y = lerp(currentPos.current.y, targetY, 0.24);

      // Instant inner dot placement
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${globalMousePos.x}px, ${globalMousePos.y}px, 0)`;
      }

      // Smooth ring placement
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      // Ambient subtle cursor lighting (low-overhead CSS translate)
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${currentPos.current.x - 250}px, ${currentPos.current.y - 250}px, 0)`;
      }
    };

    const unsubscribe = centralLoop.subscribe('custom-cursor', animate, 10);
    return () => unsubscribe();
  }, [isMobile, magneticTarget]);

  if (isMobile) return null;

  // Active state styling rules matching futuristic cyan & navy glassmorphism
  const isHover = cursorState === 'hover';
  const isVideo = cursorState === 'video';
  const isProduct = cursorState === 'product';
  const isImage = cursorState === 'image';
  const isLink = cursorState === 'link';
  const isDrag = cursorState === 'drag' || isDragging3D;

  const hasText = Boolean(cursorText);

  // Dynamic dimensions based on state
  let ringSize = 'w-9 h-9';
  let ringBorder = 'border-[#3A7564]/70 bg-[#072D33]/25';
  let dotOpacity = 'opacity-100';

  if (isDrag) {
    ringSize = 'w-16 h-16';
    ringBorder = 'border-[#DFBE8B] bg-[#DFBE8B]/20 scale-110 shadow-[0_0_20px_rgba(223,190,139,0.35)]';
    dotOpacity = 'opacity-0';
  } else if (isProduct) {
    ringSize = 'w-20 h-20';
    ringBorder = 'border-[#3A7564] bg-[#072D33]/70 shadow-[0_0_20px_rgba(58,117,100,0.45)]';
    dotOpacity = 'opacity-0';
  } else if (isVideo) {
    ringSize = 'w-20 h-20';
    ringBorder = 'border-[#8F5C64] bg-[#33091B]/70 shadow-[0_0_20px_rgba(143,92,100,0.45)]';
    dotOpacity = 'opacity-0';
  } else if (isImage) {
    ringSize = 'w-16 h-16';
    ringBorder = 'border-[#9ABCAB]/80 bg-[#072D33]/40';
    dotOpacity = 'opacity-0';
  } else if (isHover) {
    // Hover CTA has Champagne glow
    ringSize = hasText ? 'w-16 h-16' : 'w-12 h-12';
    ringBorder = 'border-[#DFBE8B] bg-[#DFBE8B]/15 shadow-[0_0_18px_rgba(223,190,139,0.35)]';
    dotOpacity = 'opacity-0';
  } else if (isLink) {
    ringSize = 'w-11 h-11';
    ringBorder = 'border-[#3A7564]/80 bg-[#3A7564]/15 shadow-[0_0_12px_rgba(58,117,100,0.3)]';
    dotOpacity = 'opacity-40';
  }

  return (
    <>
      {/* Subtle cursor-following Champagne & Jade ambient lighting for the viewport */}
      <div
        ref={lightRef}
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full opacity-35 mix-blend-screen transition-opacity duration-300 z-30"
        style={{
          background: 'radial-gradient(circle, rgba(223, 190, 139, 0.12) 0%, rgba(58, 117, 100, 0.06) 40%, transparent 70%)',
          willChange: 'transform'
        }}
        aria-hidden="true"
      />

      {/* Outer interactive ring: Jade outer ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 -ml-1/2 -mt-1/2 z-50 rounded-full border backdrop-blur-[2px] transition-[width,height,border-color,background-color] duration-150 ease-out flex items-center justify-center select-none ${ringSize} ${ringBorder}`}
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
          margin: 0,
          transformOrigin: '0 0'
        }}
        aria-hidden="true"
      >
        {/* State Badge Text (ROTATE / PLAY / VIEW / DRAG / OPEN) */}
        {hasText && (
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#F5F2EA] drop-shadow-[0_0_8px_rgba(223,190,139,0.7)] font-mono">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner precise pinpoint dot: Small Champagne glowing dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#DFBE8B] shadow-[0_0_10px_#DFBE8B] z-50 transition-opacity duration-150 ${dotOpacity}`}
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)'
        }}
        aria-hidden="true"
      />
    </>
  );
};
