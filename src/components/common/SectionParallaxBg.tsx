import React from 'react';

interface SectionParallaxBgProps {
  variant?: 'jade' | 'burgundy' | 'mineral-wave' | 'champagne-glow' | 'split' | 'subtle' | 'radial-cyan' | 'radial-teal' | 'grid' | 'circuit';
  glowPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  className?: string;
  theme?: 'jade' | 'burgundy';
  watermarkText?: string;
}

export const SectionParallaxBg: React.FC<SectionParallaxBgProps> = ({
  variant = 'jade',
  glowPosition = 'top-right',
  className = '',
  theme = 'jade',
  watermarkText
}) => {
  // Determine positioning of primary ambient glow
  const getGlowPositionClasses = () => {
    switch (glowPosition) {
      case 'top-left':
        return '-top-20 -left-20';
      case 'top-right':
        return '-top-20 -right-20';
      case 'bottom-left':
        return '-bottom-20 -left-20';
      case 'bottom-right':
        return '-bottom-20 -right-20';
      case 'center':
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  const isBurgundyTheme = theme === 'burgundy' || variant === 'burgundy';

  return (
    <div
      className={`parallax-bg-layer absolute inset-x-0 -top-24 -bottom-24 pointer-events-none select-none z-0 overflow-hidden ${className}`}
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      {/* 1. Subtle Organic Flowing Jade Stone / Mineral Waves (Lightweight SVG) */}
      <div className="absolute inset-0 opacity-30 animate-organic-wave">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 250 C 300 120, 600 380, 1000 210 C 1300 80, 1500 290, 1600 240 L 1600 900 L -100 900 Z"
            fill="url(#waveGrad1)"
            opacity="0.35"
          />
          <path
            d="M-100 480 C 250 580, 750 360, 1100 520 C 1350 630, 1500 470, 1600 510 L 1600 900 L -100 900 Z"
            fill="url(#waveGrad2)"
            opacity="0.25"
          />
          <path
            d="M-50 120 C 400 320, 800 110, 1200 260 C 1450 350, 1550 210, 1650 250"
            stroke="url(#veinGrad)"
            strokeWidth="1.2"
            strokeDasharray="12 8"
            opacity="0.22"
          />
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3A7564" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#8F5C64" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#DFBE8B" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#33091B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#072D33" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9ABCAB" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DFBE8B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#9ABCAB" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#DFBE8B" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. Soft Ambient Radial Blooms in Champagne, Jade Green & Burgundy */}
      {isBurgundyTheme ? (
        <>
          <div
            className={`absolute ${getGlowPositionClasses()} w-[520px] h-[520px] rounded-full blur-[140px] bg-[#8F5C64]/[0.18] pointer-events-none`}
          />
          <div className="absolute bottom-10 left-10 w-[420px] h-[420px] rounded-full blur-[130px] bg-[#3A7564]/[0.12] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-[360px] h-[360px] rounded-full blur-[110px] bg-[#DFBE8B]/[0.08] pointer-events-none" />
        </>
      ) : (
        <>
          <div
            className={`absolute ${getGlowPositionClasses()} w-[520px] h-[520px] rounded-full blur-[140px] bg-[#3A7564]/[0.16] pointer-events-none`}
          />
          <div className="absolute bottom-10 left-10 w-[420px] h-[420px] rounded-full blur-[130px] bg-[#DFBE8B]/[0.10] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full blur-[120px] bg-[#8F5C64]/[0.08] pointer-events-none" />
        </>
      )}

      {/* 3. Soft Top & Bottom Natural Vignette Transitions */}
      <div
        className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${
          isBurgundyTheme ? 'from-[#33091B]' : 'from-[#072D33]'
        } to-transparent pointer-events-none`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${
          isBurgundyTheme ? 'from-[#33091B]' : 'from-[#072D33]'
        } to-transparent pointer-events-none`}
      />
    </div>
  );
};
