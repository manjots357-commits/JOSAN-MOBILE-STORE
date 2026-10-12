import React, { useRef, useEffect } from 'react';
import { storeInfo } from '../../data/media';
import { Hero3DPhone } from '../hero/Hero3DPhone';
import { ShowroomLuxuryBackground } from './ShowroomLuxuryBackground';
import { MagneticElement } from '../cursor/MagneticElement';
import { useCursor, globalMousePos } from '../../context/CursorContext';
import { centralLoop } from '../../utils/unifiedLoop';
import {
  ArrowRight,
  MapPin,
  Sparkles,
  MessageCircle,
  Phone,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onVisitStoreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onVisitStoreClick
}) => {
  const textWrapRef = useRef<HTMLDivElement>(null);
  const visualWrapRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useCursor();

  // Subtle desktop parallax on cursor movement
  useEffect(() => {
    if (isMobile) return;

    const updateParallax = () => {
      const textX = globalMousePos.normX * 6;
      const textY = -globalMousePos.normY * 4;
      const visX = -globalMousePos.normX * 8;
      const visY = globalMousePos.normY * 6;

      if (textWrapRef.current) {
        textWrapRef.current.style.transform = `translate3d(${textX}px, ${textY}px, 0)`;
      }
      if (visualWrapRef.current) {
        visualWrapRef.current.style.transform = `translate3d(${visX}px, ${visY}px, 0)`;
      }
    };

    const unsubscribe = centralLoop.subscribe('hero-parallax-clean', updateParallax, 15);
    return () => unsubscribe();
  }, [isMobile]);

  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] lg:h-screen lg:max-h-[960px] flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-6 bg-[#072D33]"
    >
      {/* 1. Restrained Architectural Showroom Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <ShowroomLuxuryBackground />
      </div>

      {/* 2. Main Two-Column Viewport Composition */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
        
        {/* LEFT COLUMN: Clear Typography, Hierarchy, Value Proposition & Two CTAs */}
        <div
          ref={textWrapRef}
          className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left space-y-4 sm:space-y-5 will-change-transform"
        >
          {/* Subtle Brand Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-[#DFBE8B]">
            <Sparkles className="w-3.5 h-3.5 text-[#DFBE8B] shrink-0" />
            <span>JOSAN COMPUTER &amp; MOBILE &bull; PUNJAB</span>
          </div>

          {/* Main Editorial Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black tracking-tight text-[#F5F0E6] uppercase leading-[1.04]">
              YOUR NEXT PHONE.
              <span className="block font-sans font-light text-2xl sm:text-3xl xl:text-4xl tracking-wide text-[#DFBE8B] mt-1 normal-case">
                Your Next Experience.
              </span>
            </h1>
          </div>

          {/* Value Proposition Description */}
          <p className="text-sm sm:text-base text-[#C8D8D0] max-w-lg leading-relaxed font-normal">
            Punjab’s dedicated showroom for factory-sealed smartphones (Apple, Samsung, OnePlus, Vivo, Motorola), verified original accessories, instant trade-ins, and on-counter device laboratory service.
          </p>

          {/* Two Prominent Required CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1 sm:pt-2">
            {/* Primary CTA: Explore Phones */}
            <MagneticElement cursorText="EXPLORE" magneticStrength={0.25}>
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full bg-[#DFBE8B] hover:bg-[#F5F0E6] text-[#072D33] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#DFBE8B]/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Phones</span>
                <ArrowRight className="w-4 h-4 text-[#072D33]" />
              </button>
            </MagneticElement>

            {/* Secondary CTA: Chat on WhatsApp */}
            <MagneticElement cursorText="WHATSAPP" magneticStrength={0.25}>
              <a
                href={storeInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-[rgba(7,45,51,0.85)] hover:bg-[#3A7564] border border-[rgba(155,188,171,0.30)] text-[#F5F0E6] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBE8B]" />
                <span>Chat on WhatsApp</span>
              </a>
            </MagneticElement>
          </div>

          {/* Compact Contact & Location Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#9ABCAB] pt-2 border-t border-[rgba(155,188,171,0.18)] max-w-lg">
            <button
              onClick={onVisitStoreClick}
              className="flex items-center gap-1.5 text-[#E2EAE6] hover:text-[#DFBE8B] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#DFBE8B] shrink-0" />
              <span>Verowal Road, Jandiala Guru</span>
            </button>
            <span className="text-[#DFBE8B]/40 hidden sm:inline">&bull;</span>
            <span className="text-[#C8D8D0]/80">Mon–Sun 10 AM – 9 PM</span>
            <span className="text-[#DFBE8B]/40 hidden sm:inline">&bull;</span>
            <a
              href={`tel:${storeInfo.rawPhone}`}
              className="text-[#DFBE8B] hover:underline font-mono font-bold flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#DFBE8B]" />
              <span>+91 94177 65441</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Single Dominant 3D Smartphone Visual Focus */}
        <div
          ref={visualWrapRef}
          className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] will-change-transform"
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute inset-0 bg-radial from-[#DFBE8B]/18 via-[#3A7564]/10 to-transparent blur-3xl pointer-events-none" />

          {/* Dominant 3D Smartphone (Photorealistic Metallic Chassis, Screen & Halo) */}
          <Hero3DPhone className="w-full max-w-lg" />
        </div>
      </div>

      {/* 3. Subtle Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center select-none pt-2 opacity-70 hover:opacity-100 transition-opacity">
        <a
          href="#phones"
          onClick={(e) => {
            e.preventDefault();
            onExploreClick();
          }}
          className="group flex flex-col items-center gap-1 text-[#C8D8D0] hover:text-[#DFBE8B] transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono">
            Scroll to explore showroom
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#DFBE8B] group-hover:translate-y-0.5 transition-transform animate-bounce" />
        </a>
      </div>
    </section>
  );
};
