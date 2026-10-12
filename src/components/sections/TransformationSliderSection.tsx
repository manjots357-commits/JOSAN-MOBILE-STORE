import React, { useState, useRef, useCallback } from 'react';
import { MagneticElement } from '../cursor/MagneticElement';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { Wrench, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';

interface TransformationCase {
  id: string;
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDesc: string;
  afterDesc: string;
  beforeImage: string;
  afterImage: string;
  time: string;
  warranty: string;
}

const CASES: TransformationCase[] = [
  {
    id: 'screen-repair',
    title: 'Shattered OLED to Factory-Fresh Display',
    subtitle: 'Cracked glass replaced with original 120Hz Super Retina panel',
    beforeLabel: 'BEFORE: SHATTERED GLASS',
    afterLabel: 'AFTER: MINT 120HZ AMOLED',
    beforeDesc: 'Deep impact cracks, unresponsive touch zones, discolored lines.',
    afterDesc: '100% original AMOLED, flawless true-tone, zero touch latency.',
    beforeImage: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#33091B"/>
        <rect x="220" y="80" width="360" height="440" rx="36" fill="#072D33" stroke="#8F5C64" stroke-width="3"/>
        <rect x="240" y="100" width="320" height="400" rx="20" fill="#1b050f"/>
        <!-- Shattered glass crack lines -->
        <path d="M 260 120 L 380 260 L 440 220 L 520 340 L 410 400 L 480 490" stroke="#C8D8D0" stroke-width="2.5" fill="none" opacity="0.8"/>
        <path d="M 380 260 L 310 330 L 350 430 L 270 470" stroke="#C8D8D0" stroke-width="2" fill="none" opacity="0.7"/>
        <path d="M 440 220 L 510 160 L 540 240" stroke="#C8D8D0" stroke-width="1.8" fill="none" opacity="0.6"/>
        <circle cx="380" cy="260" r="30" fill="none" stroke="#8F5C64" stroke-width="1.5" stroke-dasharray="4 2"/>
        <text x="400" y="550" font-family="sans-serif" font-weight="800" font-size="22" fill="#DFBE8B" text-anchor="middle">CRACKED &amp; DAMAGED</text>
      </svg>
    `)}`,
    afterImage: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#072D33"/>
        <defs>
          <radialGradient id="restoredGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#3A7564" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#072D33" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="400" cy="300" r="260" fill="url(#restoredGlow)"/>
        <rect x="220" y="80" width="360" height="440" rx="36" fill="rgba(7,45,51,0.9)" stroke="#DFBE8B" stroke-width="3"/>
        <rect x="240" y="100" width="320" height="400" rx="20" fill="#0B3A42"/>
        <!-- Pristine Screen Display -->
        <circle cx="400" cy="270" r="70" fill="#DFBE8B" opacity="0.25"/>
        <circle cx="400" cy="270" r="35" fill="#3A7564" opacity="0.6"/>
        <text x="400" y="278" font-family="sans-serif" font-weight="900" font-size="24" fill="#F5F2EA" text-anchor="middle">100% MINT</text>
        <text x="400" y="450" font-family="sans-serif" font-weight="700" font-size="16" fill="#DFBE8B" text-anchor="middle">ORIGINAL AMOLED REPLACED</text>
        <text x="400" y="550" font-family="sans-serif" font-weight="800" font-size="22" fill="#DFBE8B" text-anchor="middle">CERTIFIED RESTORATION &#10004;</text>
      </svg>
    `)}`,
    time: '30 Minutes On-Counter',
    warranty: '6 Months Replacement Warranty'
  },
  {
    id: 'trade-in',
    title: 'Old Android Trade-In to Brand New Galaxy Z Fold 6',
    subtitle: 'Exchange valuation credited instantly towards flagship purchase',
    beforeLabel: 'BEFORE: DATED SCRATCHED DEVICE',
    afterLabel: 'AFTER: SEALED FOLD 6 FLAGSHIP',
    beforeDesc: '4-year old device, depleted battery health, worn body.',
    afterDesc: 'Brand new sealed Samsung Z Fold 6 with official GST invoice.',
    beforeImage: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#33091B"/>
        <rect x="240" y="90" width="320" height="420" rx="24" fill="#072D33" stroke="#8F5C64" stroke-width="2.5"/>
        <text x="400" y="280" font-family="sans-serif" font-weight="700" font-size="20" fill="#C8D8D0" text-anchor="middle">OLD PHONE</text>
        <text x="400" y="320" font-family="sans-serif" font-size="14" fill="#9ABCAB" text-anchor="middle">Scratched &bull; Worn Out</text>
        <text x="400" y="550" font-family="sans-serif" font-weight="800" font-size="20" fill="#DFBE8B" text-anchor="middle">TRADE-IN ACCEPTED</text>
      </svg>
    `)}`,
    afterImage: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#072D33"/>
        <rect x="200" y="80" width="400" height="440" rx="28" fill="rgba(7,45,51,0.9)" stroke="#DFBE8B" stroke-width="3"/>
        <line x1="400" y1="80" x2="400" y2="520" stroke="#9ABCAB" stroke-width="3" stroke-dasharray="6 4"/>
        <text x="400" y="270" font-family="sans-serif" font-weight="900" font-size="30" fill="#F5F2EA" text-anchor="middle">GALAXY Z FOLD 6</text>
        <rect x="280" y="300" width="240" height="36" rx="18" fill="#DFBE8B"/>
        <text x="400" y="324" font-family="sans-serif" font-weight="800" font-size="16" fill="#33091B" text-anchor="middle">UNBOXED &amp; DELIVERED</text>
        <text x="400" y="550" font-family="sans-serif" font-weight="800" font-size="20" fill="#DFBE8B" text-anchor="middle">INSTANT EXCHANGE COMPLETED &#10004;</text>
      </svg>
    `)}`,
    time: 'Instant On-Spot Valuation',
    warranty: 'Official Store Billing & Invoice'
  }
];

export const TransformationSliderSection: React.FC = () => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 to 100)
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = CASES[activeCaseIdx];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section id="transformation" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)] overflow-hidden">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="split" watermarkText="03 // BEFORE & AFTER REPAIR" glowPosition="center" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Wrench className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>03 / THE REVEAL &bull; PRECISION LAB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
            THE TRANSFORMATION
          </h2>

          <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
            Drag the interactive slider below to inspect our on-counter phone restoration and instant exchange standard.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#072D33]/90 border border-[rgba(155,188,171,0.2)] rounded-xl">
          {CASES.map((item, idx) => (
            <MagneticElement key={item.id} cursorText="SELECT">
              <button
                onClick={() => {
                  setActiveCaseIdx(idx);
                  setSliderPos(50);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCaseIdx === idx
                    ? 'bg-[#DFBE8B] text-[#33091B] shadow-md shadow-[#DFBE8B]/20'
                    : 'text-[#9ABCAB] hover:text-[#F5F2EA]'
                }`}
              >
                {idx === 0 ? 'Screen Restoration' : 'Device Trade-In'}
              </button>
            </MagneticElement>
          ))}
        </div>
      </div>

      {/* Main Split Slider Component */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Before/After Split Viewer */}
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] select-none shadow-2xl cursor-ew-resize touch-none"
          >
            {/* "After" Image (Full Base Layer) */}
            <img
              src={currentCase.afterImage}
              alt="After repair"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* "Before" Image (Clipped Layer on Left) */}
            <div
              className="absolute inset-0 h-full overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={currentCase.beforeImage}
                alt="Before repair"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
                style={{ width: `${containerRef.current?.clientWidth || 800}px` }}
              />
            </div>

            {/* Champagne Dividing Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#DFBE8B] shadow-[0_0_15px_rgba(223,190,139,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Circular Center Draggable Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#DFBE8B] text-[#33091B] border-2 border-[#F5F2EA] flex items-center justify-center shadow-lg shadow-[#DFBE8B]/40">
                <span className="text-[10px] font-black tracking-tighter">&lang;&rang;</span>
              </div>
            </div>

            {/* Top Labels: Before vs After */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="text-[10px] font-bold text-[#F5F2EA] bg-[#33091B]/85 px-2.5 py-1 rounded border border-[rgba(143,92,100,0.4)]">
                {currentCase.beforeLabel}
              </span>
            </div>

            <div className="absolute top-4 right-4 pointer-events-none">
              <span className="text-[10px] font-bold text-[#33091B] bg-[#DFBE8B] px-2.5 py-1 rounded shadow-sm">
                {currentCase.afterLabel}
              </span>
            </div>

            {/* Bottom helper tip */}
            <div className="absolute bottom-3 inset-x-0 mx-auto w-fit pointer-events-none">
              <span className="text-[11px] font-medium text-[#C8D8D0] bg-[#072D33]/85 px-3 py-1 rounded-full border border-[rgba(155,188,171,0.25)]">
                &larr; Drag slider left / right to compare &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Case Details & Quick Booking */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F2EA]">
              {currentCase.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#C8D8D0]">
              {currentCase.subtitle}
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[rgba(51,9,27,0.7)] border border-[rgba(143,92,100,0.3)] space-y-1">
              <div className="text-[11px] font-bold text-[#DFBE8B] uppercase">
                {currentCase.beforeLabel}
              </div>
              <p className="text-xs text-[#C8D8D0]">
                {currentCase.beforeDesc}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[rgba(7,45,51,0.75)] border border-[rgba(155,188,171,0.25)] space-y-1">
              <div className="text-[11px] font-bold text-[#DFBE8B] uppercase">
                {currentCase.afterLabel}
              </div>
              <p className="text-xs text-[#F5F2EA]">
                {currentCase.afterDesc}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2 text-xs text-[#C8D8D0]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3A7564]" />
              <span className="text-[#F5F2EA] font-semibold">{currentCase.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#DFBE8B]" />
              <span className="text-[#F5F2EA] font-semibold">{currentCase.warranty}</span>
            </div>
          </div>

          <div className="pt-3">
            <MagneticElement cursorText="REPAIR" className="w-full">
              <a
                href="https://wa.me/919417765441?text=Hi%20Josan%20Mobile%2C%20I%20want%20a%20quote%20for%20my%20phone%20screen%20repair%20/%20trade-in"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#DFBE8B] hover:bg-[#ebd5b2] text-[#33091B] text-xs font-bold transition-all shadow-lg shadow-[#DFBE8B]/20"
              >
                <span>Get Instant Repair / Trade-In Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>
    </section>
  );
};
