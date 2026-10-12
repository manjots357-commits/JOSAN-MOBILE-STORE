import React from 'react';
import { storeInfo, customerVideos } from '../../data/media';
import { MagneticElement } from '../cursor/MagneticElement';
import { ShieldCheck, Award, Phone, MessageCircle, HeartHandshake, CheckCircle } from 'lucide-react';

export const FounderAndTeamSection: React.FC = () => {
  const foldVideo = customerVideos[0]; // Real customer handover of Fold 7

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Visual Founder Portrait Box */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.25)] shadow-2xl relative aspect-[4/5] group">
            <img
              src={foldVideo.poster}
              alt="Josan Mobile Founder & Team"
              className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#072D33]/95 via-[#072D33]/30 to-transparent pointer-events-none" />

            <div className="absolute bottom-5 left-5 right-5 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#DFBE8B] bg-[rgba(7,45,51,0.85)] px-2.5 py-1 rounded border border-[rgba(155,188,171,0.25)] uppercase">
                FOUNDER &bull; JOSAN MOBILE
              </span>
              <h3 className="text-xl font-bold text-[#F5F2EA]">
                S. Josan &amp; Diagnostic Team
              </h3>
              <p className="text-xs text-[#C8D8D0]">
                Punjab&apos;s Trusted Tech Specialists Since 2012
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Story & Quantitative Credentials */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
              <HeartHandshake className="w-3.5 h-3.5 text-[#DFBE8B]" />
              <span>WHO WE ARE &bull; 12 YEARS OF TRUST</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
              WE DON&apos;T JUST SELL PHONES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBE8B] via-[#9ABCAB] to-[#F5F2EA]">
                WE BUILD RELATIONSHIPS.
              </span>
            </h2>

            <p className="text-sm text-[#C8D8D0] leading-relaxed">
              Founded over a decade ago in the commercial heart of Punjab, Josan Computer &amp; Mobile
              was built on a single immutable promise: 100% genuine sealed electronics, absolute price transparency,
              and fast on-counter technical servicing without middleman markups.
            </p>
          </div>

          {/* 4 Quantitative Credential Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { val: '7 DAYS', label: 'Open for Walk-Ins' },
              { val: '5.0 ★', label: 'Google Rating' },
              { val: '100%', label: 'Genuine In-Store Billing' },
              { val: 'DIRECT', label: 'In-Store Lab Support' }
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-3.5 rounded-xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.2)] space-y-0.5"
              >
                <div className="text-xl font-black text-[#DFBE8B] font-mono">
                  {stat.val}
                </div>
                <div className="text-[11px] text-[#C8D8D0] leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-1 text-xs text-[#F5F2EA]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#3A7564]" />
              <span>Complimentary data transfer from your old device to new phone</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#3A7564]" />
              <span>Free high-grade tempered glass installed with every phone handover</span>
            </div>
          </div>

          {/* Direct Contact CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <MagneticElement cursorText="CALL">
              <a
                href={`tel:${storeInfo.rawPhone}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DFBE8B] hover:bg-[#ebd5b2] text-[#33091B] text-xs font-bold transition-all shadow-md shadow-[#DFBE8B]/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store: {storeInfo.phone}</span>
              </a>
            </MagneticElement>

            <MagneticElement cursorText="WHATSAPP">
              <a
                href={storeInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[rgba(7,45,51,0.85)] hover:bg-[rgba(7,45,51,1)] text-[#F5F2EA] text-xs font-bold transition-all border border-[rgba(155,188,171,0.25)]"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBE8B]" />
                <span>Direct WhatsApp Chat</span>
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>
    </section>
  );
};
