import React from 'react';
import { accessoriesList, storeInfo } from '../../data/media';
import { MagneticElement } from '../cursor/MagneticElement';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { Headphones, ShieldCheck, Zap, MessageCircle } from 'lucide-react';

export const AccessoriesSection: React.FC = () => {
  return (
    <section id="accessories" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)] overflow-hidden">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="subtle" watermarkText="11 // GEAR & ACCESSORIES" glowPosition="bottom-left" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Headphones className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>Original Certified Accessories</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
            GENUINE GEAR &amp; ACCESSORIES
          </h2>

          <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
            Complete your setup with official Apple adapters, MagSafe gear, fast chargers,
            premium audio, and tempered glass applied free on counter.
          </p>
        </div>

        <div className="text-xs font-semibold text-[#DFBE8B] bg-[rgba(7,45,51,0.75)] border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#3A7564]" />
          <span>100% Brand Certified Warranty</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessoriesList.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] hover:border-[#DFBE8B]/50 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#DFBE8B] px-2 py-0.5 rounded bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.2)]">
                  {item.category}
                </span>
                <span className="text-[11px] font-semibold text-[#9ABCAB]">
                  In Stock &bull; Counter Pickup
                </span>
              </div>

              <h3 className="text-base font-bold text-[#F5F2EA] group-hover:text-[#DFBE8B] transition-colors">
                {item.name}
              </h3>

              <div className="text-xs text-[#C8D8D0] font-mono">
                {item.specs}
              </div>
            </div>

            <div className="pt-2 border-t border-[rgba(155,188,171,0.15)] flex items-center justify-between">
              <div>
                <span className="text-base font-extrabold text-[#DFBE8B] font-mono mr-2">
                  {item.price}
                </span>
                <span className="text-xs text-[#C8D8D0]/60 line-through font-mono">
                  {item.originalPrice}
                </span>
              </div>

              <MagneticElement cursorText="BUY">
                <a
                  href={`https://wa.me/919417765441?text=Hi%20Josan%20Mobile%2C%20I%20want%20to%20buy%20${encodeURIComponent(item.name)}%20(${item.price})`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DFBE8B] hover:bg-[#ebd5b2] text-[#33091B] text-xs font-bold transition-all shadow-md shadow-[#DFBE8B]/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Reserve</span>
                </a>
              </MagneticElement>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
