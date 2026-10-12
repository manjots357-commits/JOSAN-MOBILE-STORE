import React from 'react';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';

interface Milestone {
  period: string;
  role: string;
  title: string;
  description: string;
  highlights: string[];
}

const MILESTONES: Milestone[] = [
  {
    period: '2012 – 2015',
    role: 'FOUNDATION PHASE',
    title: 'Store Inception in Punjab Main Market',
    description: 'Started as a neighborhood computer sales and mobile repairs workshop with a single technician desk and an unwavering dedication to honest pricing.',
    highlights: ['First 1,000 customers served', 'Hardware diagnostic foundation established']
  },
  {
    period: '2016 – 2020',
    role: 'EXPANSION & BRANDING',
    title: 'Multi-Brand Flagship Retail Destination',
    description: 'Expanded retail floor to accommodate dedicated brand display counters for Samsung, Vivo, and Motorola with transparent on-counter billing.',
    highlights: ['Multi-brand smartphone display counters', 'Official in-store billing system launched']
  },
  {
    period: '2021 – 2024',
    role: 'PREMIUM ELEVATION',
    title: 'Apple & Ultra-Flagship Experience Hub',
    description: 'Integrated premium Apple iPhone Pro series and Samsung Fold/Flip portfolio with certified on-counter unboxing, data migration, and original accessories.',
    highlights: ['Premium flagship device counters', 'On-counter diagnostic workbench established']
  },
  {
    period: '2025 – PRESENT',
    role: 'MODERN TECHNOLOGY SHOWROOM',
    title: 'Next-Gen Showroom & Digital Showcase',
    description: 'Modernized the store with illuminated glass pavilions, WhatsApp instant inquiries, and an interactive digital technology showroom experience.',
    highlights: ['Interactive 3D digital technology showroom', 'Direct WhatsApp customer assistance']
  }
];

export const StoreTimelineSection: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Clock className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>HERITAGE &bull; THE STORE JOURNEY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
            HOW THE JOURNEY UNFOLDED
          </h2>

          <p className="text-sm text-[#C8D8D0]">
            Over twelve years of continuous growth, technological adaptation, and customer trust across Punjab.
          </p>
        </div>

        <div className="text-xs font-mono text-[#DFBE8B] bg-[#072D33]/90 border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>ESTABLISHED 2012 &bull; PUNJAB</span>
        </div>
      </div>

      {/* Timeline Cards Stack */}
      <div className="space-y-4">
        {MILESTONES.map((item, idx) => (
          <div
            key={item.period}
            className="p-6 rounded-2xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] hover:border-[#DFBE8B]/50 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg group"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#DFBE8B] bg-[rgba(7,45,51,0.85)] px-2 py-0.5 rounded border border-[rgba(155,188,171,0.25)] uppercase">
                  {item.role}
                </span>
                <span className="text-xs font-mono text-[#9ABCAB]">
                  {item.period}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#F5F2EA] group-hover:text-[#DFBE8B] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#C8D8D0] leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {item.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-1.5 text-xs text-[#F5F2EA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3A7564]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end shrink-0 text-right">
              <span className="text-2xl font-black font-mono text-[#DFBE8B]/30 group-hover:text-[#DFBE8B] transition-colors">
                0{idx + 1}
              </span>
              <span className="text-[11px] font-mono text-[#9ABCAB]">Verified Record</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
