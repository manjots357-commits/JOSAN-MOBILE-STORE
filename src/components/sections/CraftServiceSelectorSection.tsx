import React, { useState } from 'react';
import { MagneticElement } from '../cursor/MagneticElement';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { Smartphone, Wrench, CreditCard, RefreshCw, Headphones, ArrowRight, Check } from 'lucide-react';

interface ElementService {
  id: string;
  name: string;
  tabLabel: string;
  tagline: string;
  description: string;
  image: string;
  features: { label: string; price: string }[];
  ctaText: string;
  whatsappMessage: string;
}

const ELEMENTS: ElementService[] = [
  {
    id: 'flagships',
    name: 'The Flagship Atelier',
    tabLabel: 'Flagship Phones',
    tagline: 'Brand New Sealed Indian Units with Full Manufacturer Guarantee',
    description: 'Direct in-store retail pricing on Apple iPhone 16 / 15 series, Samsung Galaxy Z Fold 6 & S24 Ultra, Vivo, and Motorola flagships.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop',
    features: [
      { label: 'Apple iPhone 16 / 15 Pro Series', price: 'Best Punjab Deal' },
      { label: 'Samsung Galaxy Z Fold 6 / Flip 6', price: 'Official GST Bill' },
      { label: 'Vivo & Motorola Curved Series', price: 'Immediate Stock' },
      { label: 'Complimentary Glass & Setup', price: 'Included Free' }
    ],
    ctaText: 'Check Phone Availability',
    whatsappMessage: 'Hi Josan Mobile, I want to check available models and pricing for flagship phones.'
  },
  {
    id: 'repair',
    name: 'The Hardware Restoration Lab',
    tabLabel: 'Repair & Screen Lab',
    tagline: 'Precision 30-Minute Glass & AMOLED Replacement',
    description: 'State-of-the-art diagnostic workbench. We restore shattered glass, bleeding AMOLEDs, failing batteries, and motherboard ICs while you wait.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80&auto=format&fit=crop',
    features: [
      { label: 'Original 120Hz AMOLED Screen', price: 'From ₹1,499' },
      { label: 'Battery Replacement (100% Health)', price: 'From ₹899' },
      { label: 'Charging Port & Speaker Repair', price: 'From ₹499' },
      { label: 'Direct Store Lab Support', price: 'Included Free' }
    ],
    ctaText: 'Get Repair Estimate',
    whatsappMessage: 'Hi Josan Mobile, I need an estimate to repair my phone display / battery.'
  },
  {
    id: 'support',
    name: 'In-Store Device Setup & Support',
    tabLabel: 'Setup & Support',
    tagline: 'Complete In-Person Data Migration & Device Consultation',
    description: 'Walk into our store and receive hands-on assistance. We configure your new smartphone, transfer your data, and answer questions at your pace.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80&auto=format&fit=crop',
    features: [
      { label: 'Full Data & WhatsApp Transfer', price: 'Assisted Free' },
      { label: 'SIM & eSIM Activation Setup', price: 'Included' },
      { label: 'Tempered Glass Alignment', price: 'Free Installation' },
      { label: 'Direct In-Person Advice', price: 'Everyday' }
    ],
    ctaText: 'Ask About Store Setup',
    whatsappMessage: 'Hi Josan Mobile, I would like in-store assistance with device setup and unboxing.'
  },
  {
    id: 'exchange',
    name: 'The Trade-In Valuation Vault',
    tabLabel: 'Old Phone Trade-In',
    tagline: 'Highest Trade-In Value for Used Phones in Punjab',
    description: 'Swap your current phone on the spot. We assess physical condition and deduct the maximum valuation directly from your new device purchase.',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80&auto=format&fit=crop',
    features: [
      { label: 'Instant Diagnosis & Valuation', price: '5 Minutes' },
      { label: 'Trade-in Exchange Bonus', price: 'Direct Discount' },
      { label: 'Free Data Backup & Wipe', price: 'Included Free' },
      { label: 'Zero Paperwork Hassle', price: 'Counter Credit' }
    ],
    ctaText: 'Value My Old Phone',
    whatsappMessage: 'Hi Josan Mobile, I want to trade in my old smartphone. How much exchange value can I get?'
  }
];

export const CraftServiceSelectorSection: React.FC = () => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const activeService = ELEMENTS[activeTabIdx];

  return (
    <section id="craft" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)] overflow-hidden">
      {/* Background Parallax Layer with Mineral Waves */}
      <SectionParallaxBg variant="mineral-wave" watermarkText="02 // THE CRAFT & LAB" glowPosition="top-left" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Smartphone className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>02 / THE CRAFT &bull; CHOOSE YOUR ELEMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
            CHOOSE YOUR REQUIREMENT
          </h2>

          <p className="text-sm text-[#C8D8D0]">
            Four disciplines. One point of view: certified genuine products, transparent pricing, and trusted service.
          </p>
        </div>

        {/* Clean Element Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#072D33]/90 border border-[rgba(155,188,171,0.2)] rounded-xl">
          {ELEMENTS.map((elem, idx) => (
            <MagneticElement key={elem.id} cursorText="SELECT">
              <button
                onClick={() => setActiveTabIdx(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTabIdx === idx
                    ? 'bg-[#DFBE8B] text-[#33091B] shadow-md shadow-[#DFBE8B]/20'
                    : 'text-[#9ABCAB] hover:text-[#F5F2EA]'
                }`}
              >
                {elem.tabLabel}
              </button>
            </MagneticElement>
          ))}
        </div>
      </div>

      {/* Two Column Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Visual Media Box */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] shadow-2xl relative aspect-[4/3] group">
            <img
              src={activeService.image}
              alt={activeService.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#072D33]/85 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <span className="text-[10px] font-mono font-bold text-[#DFBE8B] bg-[#072D33]/90 px-2.5 py-1 rounded border border-[rgba(155,188,171,0.3)] uppercase">
                {activeService.tabLabel}
              </span>
              <h4 className="text-base font-bold text-[#F5F2EA] mt-1">
                {activeService.name}
              </h4>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Service Rows */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#DFBE8B] tracking-wider uppercase">
              SERVICE / 0{activeTabIdx + 1}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F2EA]">
              {activeService.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#9ABCAB] font-semibold">
              {activeService.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#C8D8D0] pt-1 leading-relaxed">
              {activeService.description}
            </p>
          </div>

          {/* Pricing Table List */}
          <div className="space-y-2.5 pt-2 border-t border-[rgba(155,188,171,0.2)]">
            {activeService.features.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between p-3 rounded-xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] hover:border-[#DFBE8B]/40 transition-colors text-xs"
              >
                <div className="flex items-center gap-2 text-[#F5F2EA] font-medium">
                  <Check className="w-3.5 h-3.5 text-[#3A7564]" />
                  <span>{row.label}</span>
                </div>
                <div className="font-mono font-bold text-[#DFBE8B]">
                  {row.price}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <MagneticElement cursorText="INQUIRE">
              <a
                href={`https://wa.me/919417765441?text=${encodeURIComponent(activeService.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DFBE8B] hover:bg-[#ebd5b2] text-[#33091B] text-xs font-bold transition-all shadow-lg shadow-[#DFBE8B]/20"
              >
                <span>{activeService.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>
    </section>
  );
};
