import React, { useState } from 'react';
import { Phone3DCanvas } from '../three/Phone3DCanvas';
import { MagneticElement } from '../cursor/MagneticElement';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { Sparkles, Eye, RotateCw, Camera, Cpu, Battery, HardDrive, Zap, Wifi, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { storeInfo } from '../../data/media';

interface InspectionAngle {
  id: 'front' | 'rotate' | 'camera' | 'specs';
  label: string;
  subtitle: string;
  highlightText: string;
}

const ANGLES: InspectionAngle[] = [
  {
    id: 'front',
    label: '01 / AMOLED DISPLAY',
    subtitle: '6.9" Super Retina XDR & 120Hz ProMotion',
    highlightText: 'Edge-to-edge LTPO panel with 2,000 nits outdoor peak brightness and surgical ceramic shield protection.'
  },
  {
    id: 'rotate',
    label: '02 / 360° CHASSIS',
    subtitle: 'Grade 5 Aerospace Titanium Architecture',
    highlightText: 'Precision micro-blasted titanium rail with contoured chamfers, reduced weight, and superior thermal dissipation.'
  },
  {
    id: 'camera',
    label: '03 / 48MP CAMERA SYSTEM',
    subtitle: 'Triple Sapphire Lenses & 5x Periscope Zoom',
    highlightText: 'Second-generation sensor-shift optical image stabilization with 4K 120 fps ProRes Log cinematic capture.'
  },
  {
    id: 'specs',
    label: '04 / SILICON & PERFORMANCE',
    subtitle: 'Flagship 3-Nanometer Architecture',
    highlightText: 'Hardware-accelerated ray tracing, dedicated neural processing engine, and unified high-bandwidth architecture for gaming and photography.'
  }
];

const SPEC_GRID = [
  { label: 'Display', val: '6.9" Super Retina XDR 120Hz ProMotion', icon: Sparkles },
  { label: 'Camera', val: '48MP Main + 48MP Ultra-Wide + 5x Telephoto', icon: Camera },
  { label: 'Processor', val: 'Apple A18 Pro / Snapdragon 8 Gen 3', icon: Cpu },
  { label: 'Battery', val: '4,685 mAh &bull; 33+ Hours Video Playback', icon: Battery },
  { label: 'Storage', val: '256GB / 512GB / 1TB NVMe Flash', icon: HardDrive },
  { label: 'RAM', val: '12GB High-Speed Unified Architecture', icon: Zap },
  { label: '5G Connectivity', val: 'Dual SIM &bull; Global 5G Sub-6GHz + eSIM', icon: Wifi }
];

export const FeaturedPhoneCinematicShowcase: React.FC = () => {
  const [activeAngle, setActiveAngle] = useState<InspectionAngle['id']>('front');
  const activeDetail = ANGLES.find((a) => a.id === activeAngle) || ANGLES[0];

  return (
    <section id="inspect-3d" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.20)] overflow-hidden bg-[#072D33]/45">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="jade" glowPosition="top-right" />

      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-3 py-1 rounded-md bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>CINEMATIC PRODUCT INSPECTION &bull; THE FLAGSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
            FLAGSHIP 3D SHOWCASE
          </h2>

          <p className="text-sm text-[#C8D8D0]">
            Rotate, inspect, and explore every curvature of our certified flagship device in real-time 3D before your store visit.
          </p>
        </div>

        {/* Angle Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] rounded-xl shadow-md">
          {ANGLES.map((angle) => (
            <MagneticElement key={angle.id} cursorText="INSPECT">
              <button
                onClick={() => setActiveAngle(angle.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeAngle === angle.id
                    ? 'bg-[#DFBE8B] text-[#072D33] shadow-md shadow-[#DFBE8B]/25'
                    : 'text-[#C8D8D0] hover:text-[#F5F2EA]'
                }`}
              >
                {angle.label.split('/')[1] || angle.label}
              </button>
            </MagneticElement>
          ))}
        </div>
      </div>

      {/* Main Showcase Grid: 3D Canvas (Left) + Specifications & Story (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column: 3D Interactive Viewport with Lighting and Finish Switcher */}
        <div className="lg:col-span-7 h-[460px] sm:h-[560px] relative rounded-3xl bg-gradient-to-b from-[rgba(7,45,51,0.95)] via-[#072D33] to-[#041B1F] border border-[rgba(155,188,171,0.25)] p-4 shadow-2xl flex flex-col justify-center overflow-hidden group">
          {/* Subtle Champagne & Jade Glow Halo */}
          <div className="absolute inset-0 bg-radial from-[#DFBE8B]/12 via-[#3A7564]/8 to-transparent pointer-events-none" />

          {/* Interactive 3D Canvas */}
          <Phone3DCanvas className="w-full h-full" allowColorChange={true} />

          {/* Inspection Mode Tag */}
          <div className="absolute top-4 right-4 pointer-events-none z-10">
            <span className="text-[11px] font-mono font-bold text-[#DFBE8B] bg-[#072D33]/90 px-3 py-1 rounded-full border border-[#DFBE8B]/40 shadow-lg">
              {activeDetail.label}
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Specifications Storyboard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#9ABCAB] uppercase tracking-wider">
              FLAGSHIP SPECIFICATIONS &bull; VERIFIED INDIAN UNIT
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F2EA]">
              {activeDetail.subtitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#C8D8D0] leading-relaxed">
              {activeDetail.highlightText}
            </p>
          </div>

          {/* Detailed Spec Matrix Grid */}
          <div className="space-y-2.5 pt-2 border-t border-[rgba(155,188,171,0.18)]">
            {SPEC_GRID.map((spec) => {
              const IconComp = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="p-2.5 rounded-xl bg-[rgba(7,45,51,0.65)] border border-[rgba(155,188,171,0.18)] hover:border-[#DFBE8B]/40 transition-colors flex items-center justify-between text-xs shadow-sm"
                >
                  <div className="flex items-center gap-2.5 text-[#C8D8D0]">
                    <IconComp className="w-3.5 h-3.5 text-[#DFBE8B] shrink-0" />
                    <span className="font-medium text-[#F5F2EA]">{spec.label}:</span>
                  </div>
                  <div
                    className="font-mono text-right text-[#DFBE8B] font-semibold text-[11px]"
                    dangerouslySetInnerHTML={{ __html: spec.val }}
                  />
                </div>
              );
            })}
          </div>

          {/* Action CTAs: Reserve on Counter & WhatsApp Booking */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <MagneticElement cursorText="RESERVE" className="flex-1">
              <a
                href={`https://wa.me/919417765441?text=Hi%20Josan%20Mobile%2C%20I%20want%20to%20reserve%20a%20flagship%20smartphone%20and%20claim%20the%20festive%20gift%20hamper`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#DFBE8B] hover:bg-[#F5F2EA] text-[#072D33] text-xs font-bold transition-all shadow-lg shadow-[#DFBE8B]/20"
              >
                <MessageCircle className="w-4 h-4 text-[#072D33]" />
                <span>Reserve on WhatsApp</span>
              </a>
            </MagneticElement>

            <MagneticElement cursorText="VISIT">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[rgba(7,45,51,0.7)] hover:bg-[#3A7564] text-[#F5F2EA] text-xs font-bold transition-all border border-[rgba(155,188,171,0.25)] shadow-sm"
              >
                <span>Visit Showroom</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFBE8B]" />
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>
    </section>
  );
};
