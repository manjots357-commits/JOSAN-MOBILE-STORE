import React from 'react';
import { Smartphone, Wrench, Cpu, CreditCard, RefreshCw, Key, Check } from 'lucide-react';

interface CapabilityCard {
  num: string;
  category: string;
  title: string;
  items: string[];
  badge: string;
  icon: React.ElementType;
}

const CAPABILITIES: CapabilityCard[] = [
  {
    num: '01',
    category: 'RETAIL & DISTRIBUTION',
    title: 'Flagship Device Sales',
    items: ['Apple iPhone 17 / 16 Series', 'Samsung Galaxy Z Fold & Ultra', 'Vivo V-Series Aura Ring', 'Motorola Edge Curved 5G', 'Official Manufacturer Warranty'],
    badge: '100% Sealed',
    icon: Smartphone
  },
  {
    num: '02',
    category: 'RAPID HARDWARE LAB',
    title: '30-Min Display Replacement',
    items: ['Original 120Hz AMOLED Panels', 'True-Tone & Color Calibration', 'Touch Digitizer Alignment', 'Shattered Outer Glass Separation', '6 Months Screen Guarantee'],
    badge: '30 Minutes',
    icon: Wrench
  },
  {
    num: '03',
    category: 'ADVANCED DIAGNOSTICS',
    title: 'Chip-Level Motherboard Lab',
    items: ['Power IC & Charging PMIC Repair', 'Audio IC & Microphone Reballing', 'Ultrasonic Water Damage Cleanse', 'Face ID & Touch ID Flex Repair', 'Surgical Microscope Workbench'],
    badge: 'Micro-Soldering',
    icon: Cpu
  },
  {
    num: '04',
    category: 'IN-STORE BILLING',
    title: 'Transparent Store Billing',
    items: ['Official Store Tax Invoice', 'All Major Credit & Debit Cards', 'Instant UPI Counter Payments', 'Transparent Serial Number Verification', 'Zero Hidden Checkout Surcharges'],
    badge: 'Official Bill',
    icon: CreditCard
  },
  {
    num: '05',
    category: 'TRADE-IN VAULT',
    title: 'Instant Device Exchange',
    items: ['Transparent On-Spot Diagnostics', 'Top Punjab Resale Valuation', 'Trade-In Bonus Up to ₹3,000', 'Free Zero-Trace Data Wipe', 'Instant Value Deduction on Bill'],
    badge: 'Best Trade-In',
    icon: RefreshCw
  },
  {
    num: '06',
    category: 'SOFTWARE & SECURITY',
    title: 'Software & Global Unlocking',
    items: ['Carrier & Network SIM Unlocking', 'Forgotten Passcode Recovery', 'Official Firmware Clean Flashing', 'Cross-Platform Data Migration', 'Global eSIM Configuration'],
    badge: 'All Networks',
    icon: Key
  }
];

export const StoreCapabilitiesMatrix: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <span>[ STORE SERVICES &bull; TECHNICAL CAPABILITIES ]</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
            SERVICES &amp; CAPABILITIES MATRIX
          </h2>

          <p className="text-sm text-[#C8D8D0]">
            From factory-sealed sales to micro-soldering labs and paperless financing, every facet
            of our store is engineered for speed, accuracy, and customer satisfaction.
          </p>
        </div>

        <div className="text-xs font-mono text-[#DFBE8B] bg-[#072D33]/90 border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-lg">
          TOTAL DISCIPLINES: 06 / ACTIVE
        </div>
      </div>

      {/* 6 Glassmorphism Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAPABILITIES.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.num}
              className="p-6 rounded-2xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] hover:border-[#DFBE8B]/50 transition-all duration-200 flex flex-col justify-between space-y-5 shadow-xl group relative overflow-hidden"
            >
              <div className="space-y-3">
                {/* Top Number & Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] flex items-center justify-center text-[#DFBE8B] group-hover:champagne-glow transition-all">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#9ABCAB]/70">
                      [ {card.num} ]
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-[#DFBE8B] bg-[rgba(7,45,51,0.8)] px-2 py-0.5 rounded border border-[rgba(155,188,171,0.25)]">
                    {card.badge}
                  </span>
                </div>

                {/* Title & Category */}
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#9ABCAB] tracking-wider uppercase">
                    {card.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F2EA] group-hover:text-[#DFBE8B] transition-colors mt-0.5">
                    {card.title}
                  </h3>
                </div>

                {/* Bullet List */}
                <ul className="space-y-2 pt-2 border-t border-[rgba(155,188,171,0.15)] text-xs text-[#C8D8D0]">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#3A7564] shrink-0" />
                      <span className="group-hover:text-[#F5F2EA] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Footer Tag */}
              <div className="pt-3 border-t border-[rgba(155,188,171,0.15)] flex items-center justify-between text-[11px] font-mono text-[#C8D8D0]">
                <span>Status: In-Store Live</span>
                <span className="text-[#DFBE8B] group-hover:underline cursor-pointer">
                  Learn More &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
