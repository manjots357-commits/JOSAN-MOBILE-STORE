import React from 'react';
import { storeInfo, storeVideos, MediaItem } from '../../data/media';
import { MagneticElement } from '../cursor/MagneticElement';
import { Sparkles, Gift, Check, ArrowRight } from 'lucide-react';

interface DiwaliOfferSectionProps {
  onOpenCinema: (media: MediaItem) => void;
  onVisitStoreClick: () => void;
}

export const DiwaliOfferSection: React.FC<DiwaliOfferSectionProps> = ({
  onOpenCinema,
  onVisitStoreClick
}) => {
  const diwaliMedia = storeVideos[0];

  return (
    <section id="deals" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)]">
      {/* Subtle Champagne Glow Backdrop */}
      <div className="absolute inset-0 bg-radial from-[#DFBE8B]/10 via-[#3A7564]/5 to-transparent rounded-3xl pointer-events-none" />

      <div className="relative rounded-3xl bg-[rgba(7,45,51,0.75)] border border-[rgba(155,188,171,0.25)] p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Perk Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-full">
              <Gift className="w-4 h-4 text-[#DFBE8B]" />
              <span>In-Store Device Setup Special</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
              COMPLIMENTARY ON-COUNTER SERVICE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBE8B] to-[#F5F2EA]">
                Full Setup &amp; Glass Installation
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#C8D8D0] max-w-xl leading-relaxed">
              Celebrate this festive season with Josan Computer &amp; Mobile. Every smartphone purchase
              comes with our signature VIP celebratory gift box, including high-grade screen protection, fast charging
              adapter, wireless earbuds, and customized accessories.
            </p>

            {/* Checklist of Included Festival Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                'Complimentary On-Counter Setup',
                'Transparent In-Store Billing',
                'Instant Old Device Exchange Credit',
                'Direct Store Lab Support',
                'WhatsApp & In-Person Inquiries',
                'Glass Protector Installed Free'
              ].map((perk) => (
                <div key={perk} className="flex items-center gap-2 text-xs text-[#F5F2EA]">
                  <div className="w-4 h-4 rounded-full bg-[#DFBE8B]/20 text-[#DFBE8B] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <MagneticElement cursorText="CLAIM">
                <button
                  onClick={onVisitStoreClick}
                  className="px-6 py-3 rounded-xl bg-[#DFBE8B] hover:bg-[#ebd5b2] text-[#33091B] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#DFBE8B]/20 flex items-center gap-2"
                >
                  <span>Claim Gift in Store</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticElement>

              <MagneticElement cursorText="WATCH">
                <button
                  onClick={() => onOpenCinema(diwaliMedia)}
                  className="px-5 py-3 rounded-xl bg-[rgba(7,45,51,0.85)] hover:bg-[rgba(7,45,51,1)] text-[#F5F2EA] font-bold text-xs uppercase tracking-wider transition-all border border-[rgba(155,188,171,0.25)] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#DFBE8B]" />
                  <span>Watch Walkthrough</span>
                </button>
              </MagneticElement>
            </div>
          </div>

          {/* Right Video / Display Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(155,188,171,0.25)] shadow-xl bg-[#072D33]">
              <img
                src={diwaliMedia.poster}
                alt="Festive Offers"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072D33]/90 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-[11px] font-bold text-[#DFBE8B] font-mono tracking-wider">
                  STORE EXCLUSIVE OFFER
                </span>
                <h4 className="text-base font-bold text-[#F5F2EA]">
                  Store Display &amp; Device Shelves
                </h4>
                <p className="text-xs text-[#C8D8D0] mt-0.5">
                  Josan Mobile Store &bull; Ph: {storeInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
