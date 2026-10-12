import React from 'react';
import { MagneticElement } from '../cursor/MagneticElement';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { Smartphone, Monitor, Headphones, Wrench, RefreshCw, LifeBuoy, ArrowRight, Check } from 'lucide-react';

interface StoreServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  points: string[];
  cta: string;
}

const SERVICES: StoreServiceItem[] = [
  {
    id: 'srv-phones',
    name: 'MOBILE PHONES',
    tagline: 'Sealed Brand-New Flagships & Budget 5G Devices',
    description: 'Direct retail store inventory of Apple, Samsung, Vivo, Motorola, and OnePlus. 100% genuine sealed boxes with official Indian warranty and tax invoice.',
    icon: Smartphone,
    points: ['Apple iPhone 16 / 15 Series', 'Samsung Galaxy Z Fold & Flip', 'Official In-Store Billing'],
    cta: 'Browse Phones'
  },
  {
    id: 'srv-computers',
    name: 'COMPUTERS & LAPTOPS',
    tagline: 'Hardware Sales, Speed Tuning & SSD Upgrades',
    description: 'Workstations, business laptops, and custom desktop builds. We provide SSD/RAM performance upgrades, official OS installations, and heat-sink servicing.',
    icon: Monitor,
    points: ['NVMe M.2 SSD Upgrades', 'Original Windows & Office Setup', 'Hardware Diagnostic & Tuning'],
    cta: 'Inquire Computer Services'
  },
  {
    id: 'srv-accessories',
    name: 'GENUINE ACCESSORIES',
    tagline: 'Apple, Samsung & Fast Charging Ecosystem',
    description: 'Complete your device experience with original 20W/45W adapters, MagSafe wallets, premium wireless earbuds, and 9H UV tempered glass applied free.',
    icon: Headphones,
    points: ['Original Apple & Samsung Chargers', 'AirPods Pro & Galaxy Buds Stock', 'Free In-Store Screen Guard Fitment'],
    cta: 'View Accessories'
  },
  {
    id: 'srv-repair',
    name: 'MOBILE REPAIR LAB',
    tagline: '30-Minute Screen Changes & Chip-Level Repairs',
    description: 'State-of-the-art repair workbench with micro-soldering microscopes. Cracked AMOLED replacement, battery refresh, charging port fix, and water damage recovery.',
    icon: Wrench,
    points: ['Original 120Hz AMOLED Screens', '30-Min Fast On-Counter Turnaround', '6-Month Lab Replacement Warranty'],
    cta: 'Get Repair Quote'
  },
  {
    id: 'srv-upgrades',
    name: 'PHONE UPGRADES & TRADE-IN',
    tagline: 'Highest Trade-In Valuations in Punjab',
    description: 'Swap your old device for the newest model on the spot. Transparent diagnostics with upfront trade-in value deducted directly from your new phone invoice.',
    icon: RefreshCw,
    points: ['Instant 5-Minute Diagnosis', 'Up to ₹3,000 Exchange Bonus', 'Complimentary 100% Data Transfer'],
    cta: 'Calculate Trade-In'
  },
  {
    id: 'srv-support',
    name: 'TECH SUPPORT & UNLOCKING',
    tagline: 'Carrier Unlocks, Data Transfer & Software Fixes',
    description: 'Expert technical concierge. We assist with carrier network unlocking, forgotten passcode recovery, WhatsApp chat backups, and global eSIM provisioning.',
    icon: LifeBuoy,
    points: ['Carrier & SIM Network Unlocking', 'Seamless iOS & Android Migration', 'Zero Bloatware Custom Setup'],
    cta: 'Ask Technician'
  }
];

export const StoreServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)] overflow-hidden">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="jade" watermarkText="04 // CERTIFIED SERVICES" glowPosition="top-right" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Wrench className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>FULL CONCIERGE &bull; STORE SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
            STORE SERVICES
          </h2>

          <p className="text-sm text-[#C8D8D0]">
            From certified flagship retail to precision motherboard micro-soldering and 0% EMI financing,
            we handle every aspect of your personal technology.
          </p>
        </div>

        <div className="text-xs font-mono text-[#DFBE8B] bg-[#072D33]/90 border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-lg">
          ALL SERVICES LIVE ON COUNTER
        </div>
      </div>

      {/* 6 Interactive Glass Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((srv, idx) => {
          const IconComp = srv.icon;
          return (
            <div
              key={srv.id}
              className="p-7 rounded-3xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] hover:border-[#DFBE8B]/50 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-xl group relative overflow-hidden hover:-translate-y-1"
            >
              {/* Subtle Champagne Specular Hover Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DFBE8B]/0 group-hover:bg-[#DFBE8B]/10 rounded-full blur-2xl transition-all duration-300 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] flex items-center justify-center text-[#DFBE8B] group-hover:scale-110 group-hover:champagne-glow transition-all duration-200">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#9ABCAB]/70">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#F5F2EA] group-hover:text-[#DFBE8B] transition-colors">
                    {srv.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#9ABCAB]">
                    {srv.tagline}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#C8D8D0] leading-relaxed">
                  {srv.description}
                </p>

                <ul className="space-y-2 pt-2 border-t border-[rgba(155,188,171,0.15)] text-xs text-[#F5F2EA]">
                  {srv.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#3A7564] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-2 border-t border-[rgba(155,188,171,0.15)]">
                <MagneticElement cursorText="INQUIRE" className="w-full">
                  <a
                    href={`https://wa.me/919417765441?text=Hi%20Josan%20Mobile%2C%20I%20am%20inquiring%20about%20your%20service%3A%20${encodeURIComponent(srv.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[rgba(7,45,51,0.8)] hover:bg-[#DFBE8B] hover:text-[#33091B] text-[#F5F2EA] text-xs font-bold transition-all border border-[rgba(155,188,171,0.25)]"
                  >
                    <span>{srv.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </MagneticElement>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
