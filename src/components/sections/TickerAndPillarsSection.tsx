import React, { useState } from 'react';
import { Shield, Cpu, Lock, Award, Sparkles } from 'lucide-react';
import { SectionParallaxBg } from '../common/SectionParallaxBg';

const TICKER_ITEMS = [
  'APPLE IPHONE 16 PRO MAX',
  'SAMSUNG GALAXY Z FOLD 6 & S24 ULTRA',
  'BAJAJ FINSERV 0% EMI',
  '30-MINUTE SCREEN REPLACEMENT',
  'ORIGINAL CHARGING & AUDIO GEAR',
  'OFFICIAL INDIAN GST BILL',
  'VIVO & MOTOROLA CURVED 5G',
  'INSTANT DATA TRANSFER & BACKUP',
  '100% SEALED BOX WARRANTY'
];

const PILLARS = [
  {
    word: 'AUTHENTIC.',
    tagline: 'Genuine Products with In-Store Billing',
    desc: 'Transparent retail sourcing for genuine devices with official invoice and verified serial details provided at counter handover.',
    icon: Shield,
    stat: 'Genuine Billing'
  },
  {
    word: 'PRECISION.',
    tagline: 'Hardware Diagnostic & Screen Laboratory',
    desc: 'Our workbench utilizes professional tools and testing rigs to service displays and replace batteries with care and precision.',
    icon: Cpu,
    stat: 'Lab Support'
  },
  {
    word: 'SETUP.',
    tagline: 'Carrier, Network & Data Migration Ready',
    desc: 'In-store assistance for SIM setup, contacts migration, and basic device configuration directly at the showroom counter.',
    icon: Lock,
    stat: 'In-Store Setup'
  },
  {
    word: 'SUPPORT.',
    tagline: 'Direct Retail & Lab Support',
    desc: 'Direct in-person consultation and dedicated technical assistance for your mobile devices directly at our Punjab store.',
    icon: Award,
    stat: 'Direct Care'
  }
];

export const TickerAndPillarsSection: React.FC = () => {
  const [activePillarIdx, setActivePillarIdx] = useState(0);

  return (
    <section className="relative py-16 bg-[#072D33]/40 overflow-hidden border-t border-b border-[rgba(155,188,171,0.20)]">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="jade" glowPosition="top-right" />

      {/* 1. Continuous Ticker Marquee */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-3 bg-[rgba(7,45,51,0.65)] border-y border-[rgba(155,188,171,0.20)] mb-16">
        <div className="inline-flex animate-marquee gap-8 items-center text-xs font-bold tracking-widest text-[#DFBE8B] uppercase font-mono">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-4">
              <span>{item}</span>
              <span className="text-[#3A7564]">&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Big Typography Pillars with Interactive Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B]">
            OUR CORE PILLARS &bull; JOSAN STANDARDS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Big Words Stack on Left */}
          <div className="lg:col-span-7 space-y-3">
            {PILLARS.map((p, idx) => {
              const isSelected = activePillarIdx === idx;
              return (
                <div
                  key={p.word}
                  onMouseEnter={() => setActivePillarIdx(idx)}
                  onClick={() => setActivePillarIdx(idx)}
                  className="cursor-pointer group flex items-baseline justify-between py-2 border-b border-[rgba(155,188,171,0.18)] transition-all"
                >
                  <h3
                    className={`text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight uppercase transition-all duration-200 select-none ${
                      isSelected
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#DFBE8B] via-[#9ABCAB] to-[#F5F2EA] translate-x-2'
                        : 'text-[#C8D8D0]/35 group-hover:text-[#F5F2EA]/75'
                    }`}
                  >
                    {p.word}
                  </h3>
                  <span
                    className={`font-mono text-xs transition-colors ${
                      isSelected ? 'text-[#DFBE8B]' : 'text-[#C8D8D0]/40'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Pillar Card on Right */}
          <div className="lg:col-span-5">
            <div className="p-7 rounded-2xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] shadow-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DFBE8B]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#072D33] border border-[rgba(155,188,171,0.30)] flex items-center justify-center text-[#DFBE8B]">
                  {React.createElement(PILLARS[activePillarIdx].icon, { className: 'w-5 h-5' })}
                </div>
                <span className="font-mono text-xs font-bold text-[#DFBE8B] bg-[#33091B]/85 px-2.5 py-1 rounded border border-[#8F5C64]/35">
                  {PILLARS[activePillarIdx].stat}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#9ABCAB] uppercase">
                  STANDARD 0{activePillarIdx + 1}
                </span>
                <h4 className="text-xl font-bold text-[#F5F2EA]">
                  {PILLARS[activePillarIdx].word}
                </h4>
                <p className="text-xs font-semibold text-[#DFBE8B]">
                  {PILLARS[activePillarIdx].tagline}
                </p>
              </div>

              <p className="text-xs sm:text-base text-[#E2EAE6] leading-relaxed pt-1">
                {PILLARS[activePillarIdx].desc}
              </p>

              <div className="pt-3 border-t border-[rgba(155,188,171,0.18)] flex items-center justify-between text-xs text-[#C8D8D0]">
                <span>Transparent In-Store Assistance</span>
                <span className="text-[#DFBE8B] font-mono font-bold">Official In-Store Billing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
