import React from 'react';
import { Eye, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';
import { SectionParallaxBg } from '../common/SectionParallaxBg';

interface Step {
  step: string;
  title: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'In-Hand Device Consultation',
    tagline: 'Test Ergonomics, Displays & Cameras in Person',
    desc: 'Step into our showroom to hold and test actual devices. Our team explains real-world camera performance, battery life, and storage needs without pressure.',
    icon: Eye
  },
  {
    step: '02',
    title: 'Transparent Pricing & Trade-In',
    tagline: 'Clear In-Store Pricing with Flexible Payment Modes',
    desc: 'Review clear product pricing with zero hidden charges. Bring your previous smartphone for transparent counter evaluation, and pay easily via UPI, cards, or cash.',
    icon: CreditCard
  },
  {
    step: '03',
    title: 'On-Counter Unboxing & Migration',
    tagline: 'Live Unboxing & Full Data Transfer Assistance',
    desc: 'Experience unboxing your device in our showroom. We assist you with contacts, photos, WhatsApp chat migration, and SIM card setup directly on the counter.',
    icon: Sparkles
  },
  {
    step: '04',
    title: 'In-Store After-Sales Support',
    tagline: 'Direct Retail Billing & In-House Lab Assistance',
    desc: 'Receive your official invoice with verified serial details. Should you ever need protective gear, battery diagnostics, or advice, our showroom doors are open 7 days a week.',
    icon: ShieldCheck
  }
];

export const WorkProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)] overflow-hidden">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="subtle" watermarkText="05 // STORE PROCESS" glowPosition="center" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <span>[ WORK PROCESS &bull; THE JOSAN EXPERIENCE ]</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
            HOW WE HELP YOU
          </h2>

          <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
            From your initial showroom visit to unboxing and seamless data migration, here is our transparent 4-step process.
          </p>
        </div>

        <div className="text-xs font-mono text-[#DFBE8B] bg-[#072D33]/90 border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-lg">
          ZERO PRESSURE &bull; 100% TRANSPARENT
        </div>
      </div>

      {/* 4-Step Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] hover:border-[#DFBE8B]/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] flex items-center justify-center text-[#DFBE8B] group-hover:scale-110 group-hover:champagne-glow transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-black text-[#DFBE8B]/30 group-hover:text-[#DFBE8B] transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#F5F2EA] group-hover:text-[#DFBE8B] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#9ABCAB]">
                    {item.tagline}
                  </div>
                </div>

                <p className="text-xs text-[#C8D8D0] leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[rgba(155,188,171,0.15)] text-[11px] font-mono text-[#C8D8D0] flex items-center justify-between">
                <span>Phase {item.step}</span>
                <span className="text-[#DFBE8B]">&bull; In-Store</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
