import React, { useState } from 'react';
import { MagneticElement } from '../cursor/MagneticElement';
import { storeVideos, storeInfo, MediaItem } from '../../data/media';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { MapPin, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';

interface HotspotPoint {
  id: string;
  number: string;
  name: string;
  tagline: string;
  desc: string;
  coords: { x: number; y: number }; // Percentage 0-100 on the showroom photo
  highlights: string[];
}

const HOTSPOTS: HotspotPoint[] = [
  {
    id: 'flagship-pavilion',
    number: '01',
    name: 'The Flagship Glass Pavilion',
    tagline: 'Vivo, Apple iPhone, Samsung Galaxy & Motorola Showcases',
    desc: 'Two illuminated tiers of factory-sealed flagships. Check in-hand ergonomics, colorways, and camera modules before unboxing.',
    coords: { x: 30, y: 38 },
    highlights: ['Live Sealed Devices', 'Official Indian Warranty', 'All Storage & Color Variants']
  },
  {
    id: 'unboxing-lounge',
    number: '02',
    name: 'Device Unboxing & Setup Lounge',
    tagline: 'Dedicated Space for Live Device Unboxing & Transfer',
    desc: 'Take your time to inspect your smartphone in comfort. Our team assists with initial setup, screen protector fitting, and data migration.',
    coords: { x: 55, y: 65 },
    highlights: ['Live Unboxing Experience', 'Data Transfer Assistance', 'Friendly Counter Support']
  },
  {
    id: 'repair-lab',
    number: '03',
    name: 'Hardware Diagnostic & Display Desk',
    tagline: 'Professional Diagnostics & Component Repair Support',
    desc: 'Trained technicians equipped with specialized tools to evaluate and service cracked displays, aging batteries, and charging ports on-site.',
    coords: { x: 78, y: 48 },
    highlights: ['On-Site Diagnosis', 'Quality Display Panels', 'Direct Lab Assistance']
  },
  {
    id: 'billing-desk',
    number: '04',
    name: 'In-Store Billing & Payment Counter',
    tagline: 'Transparent In-Store Invoices & Multiple Payment Options',
    desc: 'Clear and transparent pricing with official invoice generated on the spot. We accept UPI, all major bank cards, and direct counter payments.',
    coords: { x: 18, y: 72 },
    highlights: ['Official Store Invoice', 'All Major Cards & UPI', 'Zero Hidden Fees']
  }
];

interface StoreExploreHotspotsSectionProps {
  onOpenCinema?: (media: MediaItem) => void;
}

export const StoreExploreHotspotsSection: React.FC<StoreExploreHotspotsSectionProps> = ({
  onOpenCinema
}) => {
  const [activePointId, setActivePointId] = useState<string>('flagship-pavilion');
  const activePoint = HOTSPOTS.find((h) => h.id === activePointId) || HOTSPOTS[0];
  const storeVideo = storeVideos[0];

  return (
    <section id="space" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)] overflow-hidden">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="jade" watermarkText="09 // STORE SPACES" glowPosition="top-left" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Eye className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>04 / THE SPACE &bull; VIRTUAL INTERIOR TOUR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
            EXPLORE THE SPACE
          </h2>

          <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
            Step inside our Punjab tech boutique. Tap any point of view below to inspect our flagship display counters,
            customer lounge, and repair lab.
          </p>
        </div>

        {/* Hotspot Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {HOTSPOTS.map((h) => (
            <MagneticElement key={h.id} cursorText="INSPECT">
              <button
                onClick={() => setActivePointId(h.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activePointId === h.id
                    ? 'bg-[#DFBE8B] text-[#33091B] shadow-md shadow-[#DFBE8B]/25'
                    : 'bg-[#072D33]/90 text-[#C8D8D0] border border-[rgba(155,188,171,0.2)] hover:text-[#F5F2EA]'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{h.number}</span>
                <span>{h.name.split(' ')[1] || h.name}</span>
              </button>
            </MagneticElement>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Room Canvas + Selected Point Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Showroom Panorama Canvas */}
        <div className="lg:col-span-8 relative">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.25)] shadow-2xl group">
            {/* Showroom Panoramic Background */}
            <img
              src={storeVideo.poster}
              alt="Store Interior View"
              className="w-full h-full object-cover brightness-90 group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#072D33]/85 via-transparent to-black/30 pointer-events-none" />

            {/* Interactive Clickable Hotspots */}
            {HOTSPOTS.map((spot) => {
              const isSelected = spot.id === activePointId;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActivePointId(spot.id)}
                  style={{ left: `${spot.coords.x}%`, top: `${spot.coords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 focus:outline-none"
                  title={spot.name}
                >
                  {/* Outer Pulsing Ring */}
                  <span
                    className={`absolute -inset-2.5 rounded-full transition-opacity duration-300 ${
                      isSelected
                        ? 'bg-[#DFBE8B]/40 animate-ping'
                        : 'bg-[#3A7564]/30 group-hover/pin:animate-ping'
                    }`}
                  />

                  {/* Core Point Badge */}
                  <span
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 text-xs font-bold font-mono ${
                      isSelected
                        ? 'bg-[#DFBE8B] text-[#33091B] border-[#F5F2EA] scale-125 shadow-[0_0_15px_rgba(223,190,139,0.8)]'
                        : 'bg-[#072D33]/95 text-[#DFBE8B] border-[#DFBE8B]/60 hover:scale-110'
                    }`}
                  >
                    {spot.number}
                  </span>

                  {/* Hover Floating Tag */}
                  <span className="absolute top-10 left-1/2 -translate-x-1/2 hidden group-hover/pin:inline-block whitespace-nowrap text-[11px] font-bold text-[#F5F2EA] bg-[#072D33]/95 px-2.5 py-1 rounded-md border border-[rgba(155,188,171,0.3)] shadow-xl pointer-events-none z-30">
                    {spot.name}
                  </span>
                </button>
              );
            })}

            {/* Bottom Overlay Info Tag */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2 bg-[#072D33]/90 border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-lg text-xs text-[#F5F2EA]">
                <MapPin className="w-3.5 h-3.5 text-[#DFBE8B]" />
                <span className="font-semibold">{activePoint.name}</span>
                <span className="text-[#9ABCAB]/50">&bull;</span>
                <span className="text-[#9ABCAB] font-mono">Point {activePoint.number}</span>
              </div>

              {onOpenCinema && (
                <MagneticElement cursorText="WATCH" className="pointer-events-auto">
                  <button
                    onClick={() => onOpenCinema(storeVideo)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(7,45,51,0.85)] hover:bg-[#DFBE8B] hover:text-[#33091B] border border-[rgba(155,188,171,0.25)] text-xs font-bold text-[#DFBE8B] transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Watch Full Walkthrough</span>
                  </button>
                </MagneticElement>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Hotspot Details Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#DFBE8B] bg-[rgba(7,45,51,0.8)] px-2.5 py-1 rounded border border-[#DFBE8B]/30">
                POINT {activePoint.number}
              </span>
              <span className="text-xs text-[#9ABCAB]">Verified In-Store</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#F5F2EA]">
                {activePoint.name}
              </h3>
              <p className="text-xs font-semibold text-[#DFBE8B]">
                {activePoint.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#C8D8D0] leading-relaxed">
              {activePoint.desc}
            </p>

            <div className="space-y-2 pt-2 border-t border-[rgba(155,188,171,0.15)]">
              {activePoint.highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-[#F5F2EA]">
                  <Check className="w-3.5 h-3.5 text-[#3A7564] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <MagneticElement cursorText="INQUIRE" className="w-full">
                <a
                  href={`https://wa.me/919417765441?text=Hi%20Josan%20Mobile%2C%20I%20am%20interested%20in%20visiting%20${encodeURIComponent(activePoint.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#DFBE8B] hover:bg-[#ebd5b2] text-[#33091B] text-xs font-bold transition-all shadow-md shadow-[#DFBE8B]/20"
                >
                  <span>Inquire Regarding This Section</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </MagneticElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
