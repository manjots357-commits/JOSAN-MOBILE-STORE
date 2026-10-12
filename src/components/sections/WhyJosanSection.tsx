import React from 'react';
import { ShieldCheck, MapPin, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { storeInfo } from '../../data/media';

interface ReasonCard {
  title: string;
  subtitle: string;
  stat: string;
  statLabel: string;
  description: string;
  icon: React.ElementType;
}

const REASONS: ReasonCard[] = [
  {
    title: 'REAL PRODUCTS',
    subtitle: 'Genuine Products with In-Store Billing',
    stat: '100%',
    statLabel: 'Authentic In-Store Billing',
    description: 'We do not sell refurbished units as new. Devices sold come with verified invoices and genuine serial details verified directly at the counter.',
    icon: ShieldCheck
  },
  {
    title: 'LOCAL STORE',
    subtitle: 'Physical Presence in the Heart of Punjab',
    stat: '7 DAYS',
    statLabel: 'Open for Walk-Ins',
    description: 'Unlike online sellers with zero face-to-face accountability, our showroom doors are open 7 days a week for in-hand testing, immediate setups, and after-sales care.',
    icon: MapPin
  },
  {
    title: 'EXPERT GUIDANCE',
    subtitle: 'Transparent In-Store Assistance Tailored to You',
    stat: 'IN-PERSON',
    statLabel: 'Direct Counter Support',
    description: 'Our consultants help you navigate specs, storage tiers, and model comparisons without high pressure, making sure you get the right phone for your needs.',
    icon: Award
  },
  {
    title: 'AFTER-SALES SUPPORT',
    subtitle: 'In-House Hardware Diagnostic & Display Lab',
    stat: 'DIRECT',
    statLabel: 'Lab Support on Counter',
    description: 'If you ever crack a display or need battery servicing, our diagnostic workbench assists your phone on-site using dedicated testing and repair equipment.',
    icon: HeartHandshake
  }
];

export const WhyJosanSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)] overflow-hidden">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="jade" watermarkText="06 // PUNJAB CREDENTIALS" glowPosition="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <span>[ VERIFIED STANDARDS &bull; WHY JOSAN ]</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
            WHY SHOP WITH US
          </h2>

          <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
            Core service principles that define the Josan Computer &amp; Mobile experience for visitors across Punjab.
          </p>
        </div>

        <div className="text-xs font-mono text-[#DFBE8B] bg-[#072D33]/90 border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-lg">
          VERIFIED RETAIL CREDENTIALS
        </div>
      </div>

      {/* 4 Storytelling Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REASONS.map((r) => {
          const IconComp = r.icon;
          return (
            <div
              key={r.title}
              className="p-8 rounded-3xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] hover:border-[#DFBE8B]/50 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] flex items-center justify-center text-[#DFBE8B] group-hover:scale-110 group-hover:champagne-glow transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black font-mono text-[#DFBE8B]">
                      {r.stat}
                    </div>
                    <div className="text-[10px] font-mono text-[#9ABCAB] uppercase">
                      {r.statLabel}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="text-xl font-bold text-[#F5F2EA] group-hover:text-[#DFBE8B] transition-colors">
                    {r.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#9ABCAB]">
                    {r.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#C8D8D0] leading-relaxed pt-1">
                  {r.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(155,188,171,0.15)] flex items-center justify-between text-xs text-[#F5F2EA]">
                <div className="flex items-center gap-1.5 text-[#3A7564]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[#C8D8D0]">Verified Store Standard</span>
                </div>
                <span className="text-[11px] font-mono text-[#9ABCAB]">Josan Mobile Policy</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
