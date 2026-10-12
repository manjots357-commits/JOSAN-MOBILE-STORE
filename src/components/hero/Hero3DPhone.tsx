import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Wifi, Battery, Radio } from 'lucide-react';

interface Hero3DPhoneProps {
  className?: string;
}

export const Hero3DPhone: React.FC<Hero3DPhoneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  // Mouse & physics tracking
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    let startTime = performance.now();

    // Mouse move listener across window to tilt toward cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;

      const { innerWidth, innerHeight } = window;
      // Normalized from -1 to 1
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;

      // Realistic tilt angles: max ~14 deg Y-axis, ~10 deg X-axis
      targetRot.current.y = normX * 14;
      targetRot.current.x = -normY * 10;
    };

    // Touch support for mobile tilt
    const handleTouchMove = (e: TouchEvent) => {
      if (prefersReducedMotion || !e.touches[0]) return;
      const touch = e.touches[0];
      const normX = (touch.clientX / window.innerWidth) * 2 - 1;
      const normY = (touch.clientY / window.innerHeight) * 2 - 1;
      targetRot.current.y = normX * 10;
      targetRot.current.x = -normY * 8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Smooth animation loop: floating levitation + damped rotation easing
    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;

      // Smooth lerp easing for rotation (factor = 0.08 for fluid response without jitter)
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.08;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.08;

      // Gentle floating vertical oscillation (sine wave)
      const floatY = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.6) * 9;
      const floatRotZ = prefersReducedMotion ? 0 : Math.cos(elapsed * 1.2) * 0.8;

      if (phoneRef.current) {
        phoneRef.current.style.transform = `
          perspective(1200px)
          rotateX(${currentRot.current.x}deg)
          rotateY(${currentRot.current.y}deg)
          rotateZ(${floatRotZ}deg)
          translateY(${floatY}px)
        `;
      }

      // Dynamic specular light reflection sweep across glass
      if (sheenRef.current) {
        const sheenShift = currentRot.current.y * 5;
        sheenRef.current.style.transform = `translateX(${sheenShift}%) rotate(25deg)`;
      }

      // Dynamic halo reaction
      if (haloRef.current) {
        const haloX = currentRot.current.y * 1.5;
        const haloY = -currentRot.current.x * 1.5;
        haloRef.current.style.transform = `translate(${haloX}px, ${haloY}px)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none py-4 sm:py-6 ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 1. ATMOSPHERIC HALO & RADIAL SPOTLIGHT BEHIND DEVICE */}
      <div
        ref={haloRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(223, 190, 139, 0.22) 0%, rgba(58, 117, 100, 0.16) 42%, rgba(7, 45, 51, 0) 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* 2. ILLUMINATED CIRCULAR PEDESTAL PLATFORM BENEATH THE PHONE */}
      <div
        className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-[320px] sm:w-[400px] h-[90px] sm:h-[110px] pointer-events-none z-0"
        style={{
          transform: 'perspective(600px) rotateX(68deg)',
        }}
      >
        {/* Outer illuminated LED halo ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#DFBE8B]/50 shadow-[0_0_35px_rgba(223,190,139,0.45)] bg-gradient-to-b from-[#DFBE8B]/20 via-[#072D33]/90 to-[#021114]" />
        
        {/* Inner concentric ring */}
        <div className="absolute inset-3 rounded-full border border-[#DFBE8B]/30 bg-gradient-to-t from-[#021114] to-[#0a353c]/80" />
        
        {/* Core mirror reflection pool */}
        <div className="absolute inset-x-10 inset-y-4 rounded-full bg-radial from-[#DFBE8B]/30 via-transparent to-transparent blur-md" />
        
        {/* Drop shadow cast by phone plinth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-8 rounded-full bg-black/80 blur-lg" />
      </div>

      {/* 3. PHOTOREALISTIC 3D SMARTPHONE BODY */}
      <div
        ref={phoneRef}
        className="relative z-10 w-[290px] sm:w-[330px] md:w-[350px] h-[580px] sm:h-[660px] md:h-[700px] will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.05s linear',
        }}
      >
        {/* --- LAYER A: METALLIC TITANIUM OUTER CHASSIS --- */}
        <div
          className="absolute inset-0 rounded-[52px] sm:rounded-[56px] p-[3px] sm:p-[3.5px] transition-shadow duration-300"
          style={{
            background: 'linear-gradient(135deg, #F5F0E6 0%, #DFBE8B 18%, #8A5563 45%, #DFBE8B 72%, #F5F0E6 88%, #9ABCAB 100%)',
            boxShadow: `
              0 30px 80px -15px rgba(0, 0, 0, 0.95),
              0 15px 40px -10px rgba(7, 45, 51, 0.8),
              0 0 0 1px rgba(223, 190, 139, 0.4),
              inset 0 1px 2px rgba(255, 255, 255, 0.8),
              inset 0 -2px 4px rgba(0, 0, 0, 0.7)
            `,
          }}
        >
          {/* Titanium Matte Inner Chamfer Bevel */}
          <div
            className="w-full h-full rounded-[49px] sm:rounded-[53px] p-[2px] bg-[#0c181a]"
            style={{
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.9)',
            }}
          >
            {/* --- LAYER B: DEEP ONYX / OBSIDIAN BEZEL CONTAINER --- */}
            <div className="relative w-full h-full rounded-[47px] sm:rounded-[51px] bg-[#020b0d] overflow-hidden border border-[#DFBE8B]/20 flex flex-col justify-between">
              
              {/* --- LAYER C: OLED ULTRA-RETINA DISPLAY SCREEN --- */}
              <div className="relative w-full h-full overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#021316] via-[#072D33] to-[#031518]">
                
                {/* Wallpaper Artwork: Fluid Dark Jade & Champagne Waves */}
                <div className="absolute inset-0 pointer-events-none opacity-90 overflow-hidden">
                  {/* Fluid cosmic ribbon gradients */}
                  <div
                    className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full blur-[70px]"
                    style={{
                      background: 'radial-gradient(circle, rgba(223, 190, 139, 0.35) 0%, rgba(138, 85, 99, 0.25) 50%, transparent 75%)',
                    }}
                  />
                  <div
                    className="absolute top-[35%] -left-20 w-[340px] h-[340px] rounded-full blur-[80px]"
                    style={{
                      background: 'radial-gradient(circle, rgba(58, 117, 100, 0.40) 0%, rgba(7, 45, 51, 0.6) 60%, transparent 80%)',
                    }}
                  />
                  <div
                    className="absolute -bottom-10 right-0 w-[320px] h-[320px] rounded-full blur-[65px]"
                    style={{
                      background: 'radial-gradient(circle, rgba(223, 190, 139, 0.28) 0%, rgba(51, 9, 27, 0.45) 55%, transparent 75%)',
                    }}
                  />

                  {/* Elegant architectural vector wave ribbon */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-35"
                    preserveAspectRatio="none"
                    viewBox="0 0 350 700"
                  >
                    <path
                      d="M -50,180 C 120,80 220,320 380,240 C 440,210 390,460 280,480 C 160,500 80,620 -40,660 Z"
                      fill="url(#screenGrad1)"
                    />
                    <path
                      d="M 380,120 C 260,200 140,160 40,320 C -40,440 80,560 220,540 C 320,520 400,600 420,680 Z"
                      fill="url(#screenGrad2)"
                    />
                    <defs>
                      <linearGradient id="screenGrad1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#DFBE8B" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#9ABCAB" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#072D33" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="screenGrad2" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F5F0E6" stopOpacity="0.3" />
                        <stop offset="70%" stopColor="#8A5563" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#021114" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* --- TOP STATUS BAR & DYNAMIC ISLAND PILL --- */}
                <div className="relative z-20 pt-3.5 px-6 flex items-center justify-between text-xs font-semibold text-[#F5F0E6]">
                  {/* Time */}
                  <span className="font-mono text-[11px] sm:text-xs font-bold tracking-tight text-[#F5F0E6]">
                    9:41
                  </span>

                  {/* Dynamic Island Capsule */}
                  <div className="w-[96px] sm:w-[110px] h-[26px] sm:h-[28px] rounded-full bg-black border border-white/10 shadow-md flex items-center justify-between px-2.5">
                    {/* Front Camera Lens */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#08181c] border border-[#DFBE8B]/40 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#3A7564] shadow-[0_0_4px_#3A7564]" />
                    </div>
                    {/* Face ID / Proximity Sensor */}
                    <div className="w-2 h-2 rounded-full bg-[#14080c] border border-white/20" />
                  </div>

                  {/* Status Icons: 5G, Wi-Fi, Battery */}
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#F5F0E6]">
                    <span className="font-mono text-[9px] font-bold text-[#DFBE8B]">5G</span>
                    <Wifi className="w-3 h-3 text-[#F5F0E6]" />
                    <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1px] flex items-center">
                      <div className="w-full h-full rounded-[1px] bg-[#DFBE8B]" />
                    </div>
                  </div>
                </div>

                {/* --- DISPLAY CONTENT: SHOWROOM LOCKUP & WIDGETS --- */}
                <div className="relative z-20 px-6 my-auto text-center space-y-4 py-4">
                  {/* Brand Crown Kicker */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#072D33]/90 border border-[#DFBE8B]/40 shadow-lg backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-[#DFBE8B]" />
                    <span className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-widest text-[#DFBE8B] uppercase">
                      JOSAN SHOWROOM
                    </span>
                  </div>

                  {/* Big Editorial Clock & Date */}
                  <div className="space-y-0.5">
                    <span className="block text-4xl sm:text-5xl font-serif font-black tracking-tight text-[#F5F0E6] drop-shadow-md">
                      09:41
                    </span>
                    <span className="block text-[11px] sm:text-xs font-sans text-[#C8D8D0] tracking-wide">
                      Verowal Road &bull; Jandiala Guru
                    </span>
                  </div>

                  {/* Interactive Flagship Showcase Card on Screen */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[rgba(7,45,51,0.85)] border border-[rgba(223,190,139,0.3)] shadow-xl backdrop-blur-md text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#DFBE8B] tracking-wider uppercase">
                        CERTIFIED GENUINE
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#3A7564] animate-ping" />
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-extrabold text-[#F5F0E6] tracking-tight">
                        Flagship Pro Series
                      </h4>
                      <p className="text-[10.5px] text-[#9ABCAB] leading-snug">
                        Sealed Indian Unit &bull; Official Brand Warranty
                      </p>
                    </div>

                    {/* Quick Specs Micro-Badges */}
                    <div className="flex items-center gap-1.5 pt-1 text-[9px] font-mono text-[#F5F0E6]">
                      <span className="px-1.5 py-0.5 rounded bg-[#021114] border border-[#DFBE8B]/30">
                        120Hz XDR
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#021114] border border-[#DFBE8B]/30">
                        48MP Pro
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#021114] border border-[#DFBE8B]/30 text-[#DFBE8B]">
                        0% EMI
                      </span>
                    </div>
                  </div>
                </div>

                {/* --- BOTTOM HOME BAR & QUICK LAUNCH ICONS --- */}
                <div className="relative z-20 pb-3 px-6 space-y-2.5">
                  {/* Subtle dock shortcuts */}
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-2xl bg-[rgba(2,17,20,0.65)] border border-[rgba(155,188,171,0.15)] backdrop-blur-md">
                    <div className="w-7 h-7 rounded-xl bg-[#072D33] border border-[#DFBE8B]/30 flex items-center justify-center text-[#DFBE8B]">
                      <Radio className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#C8D8D0]">
                      Touch &amp; Feel in Store
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-[#DFBE8B] text-[#072D33] flex items-center justify-center font-bold text-xs">
                      5G
                    </div>
                  </div>

                  {/* White Home Bar Indicator */}
                  <div className="w-32 h-1 rounded-full bg-white/70 mx-auto shadow-sm" />
                </div>

                {/* --- DYNAMIC GLASS SHEEN SWEEP (Moves with Mouse) --- */}
                <div
                  ref={sheenRef}
                  className="absolute inset-y-0 -left-full w-[200%] pointer-events-none select-none z-30 transition-transform duration-100 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 35%, rgba(223, 190, 139, 0.14) 50%, rgba(255, 255, 255, 0.04) 65%, transparent 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- EXTERNAL PHYSICAL BUTTON DETAILS (On the metallic outer edges) --- */}
        {/* Left Side: Action Button */}
        <div
          className="absolute top-28 -left-[5px] w-[3px] h-8 rounded-l-[2px] bg-gradient-to-r from-[#DFBE8B] to-[#997c4f] border-l border-[#F5F0E6]/80 shadow-md"
        />
        {/* Left Side: Volume Up Button */}
        <div
          className="absolute top-40 -left-[5px] w-[3px] h-12 rounded-l-[2px] bg-gradient-to-r from-[#DFBE8B] to-[#997c4f] border-l border-[#F5F0E6]/80 shadow-md"
        />
        {/* Left Side: Volume Down Button */}
        <div
          className="absolute top-56 -left-[5px] w-[3px] h-12 rounded-l-[2px] bg-gradient-to-r from-[#DFBE8B] to-[#997c4f] border-l border-[#F5F0E6]/80 shadow-md"
        />
        {/* Right Side: Power Button */}
        <div
          className="absolute top-36 -right-[5px] w-[3px] h-16 rounded-r-[2px] bg-gradient-to-l from-[#DFBE8B] to-[#997c4f] border-r border-[#F5F0E6]/80 shadow-md"
        />
        {/* Right Side: Camera Control Capacitive Recess */}
        <div
          className="absolute bottom-36 -right-[4px] w-[2.5px] h-12 rounded-r-[2px] bg-[#0c181a] border-r border-[#DFBE8B]/50"
        />
      </div>
    </div>
  );
};
