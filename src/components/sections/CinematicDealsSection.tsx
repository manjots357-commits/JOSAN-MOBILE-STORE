import React from 'react';
import { storeInfo, storeVideos, MediaItem } from '../../data/media';
import { MagneticElement } from '../cursor/MagneticElement';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { Gift, Sparkles, MessageCircle, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

interface DealItem {
  id: string;
  name: string;
  category: string;
  dealPrice: string;
  originalPrice: string;
  offer: string;
  perks: string[];
  cta: string;
}

const DEALS: DealItem[] = [
  {
    id: 'deal-device-setup',
    name: 'Complimentary In-Store Data Migration',
    category: 'ON-COUNTER ASSISTANCE',
    dealPrice: 'INCLUDED WITH PURCHASE',
    originalPrice: 'Store Consultation',
    offer: 'Complete Contacts, Media & App Migration Assisted on Counter',
    perks: ['Hands-on unboxing support', 'Seamless Android & iOS data migration', 'SIM card setup & eSIM assistance', 'Official in-store billing documentation'],
    cta: 'Visit Showroom'
  },
  {
    id: 'deal-trade-in',
    name: 'Old Smartphone Trade-In Desk',
    category: 'IN-STORE EXCHANGE',
    dealPrice: 'INSTANT INVOICE CREDIT',
    originalPrice: 'Fair Market Valuation',
    offer: 'Bring Your Current Device for Transparent Counter Evaluation',
    perks: ['Transparent on-counter evaluation', 'Direct price deduction from new invoice', 'Secure device wipe assistance', 'Zero hidden evaluation fees'],
    cta: 'Inquire Trade-In'
  },
  {
    id: 'deal-protection-bundle',
    name: 'Protection & Charging Essentials',
    category: 'ACCESSORIES BUNDLE',
    dealPrice: 'COMBO STORE PRICING',
    originalPrice: 'A la carte Value',
    offer: 'Curated 9H Tempered Glass, Protective Case & Fast Charger',
    perks: ['Tempered glass installed free on counter', 'Shockproof fitted cases for all models', 'Original manufacturer certified cables', 'Immediate counter checkout'],
    cta: 'Explore Accessories'
  }
];

interface CinematicDealsSectionProps {
  onOpenCinema?: (media: MediaItem) => void;
}

export const CinematicDealsSection: React.FC<CinematicDealsSectionProps> = ({
  onOpenCinema
}) => {
  const storeVideo = storeVideos[0];

  return (
    <section id="deals" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.20)] overflow-hidden bg-[#072D33]">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="jade" glowPosition="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-3 py-1 rounded-md bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Gift className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>EDITORIAL PROMOTIONS &bull; STORE SPECIALS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
            STORE SPECIALS &amp; TRADE-IN
          </h2>

          <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
            Transparent in-store services and exchange packages designed to give you peace of mind with your purchase.
          </p>
        </div>

        {onOpenCinema && (
          <MagneticElement cursorText="WATCH">
            <button
              onClick={() => onOpenCinema(storeVideo)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgba(7,45,51,0.75)] hover:bg-[#3A7564] hover:text-[#F5F2EA] text-xs font-bold text-[#DFBE8B] border border-[rgba(155,188,171,0.30)] transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#DFBE8B]" />
              <span>Watch Store Experience Video</span>
            </button>
          </MagneticElement>
        )}
      </div>

      {/* 3 Editorial Deal Cards in Jade with Burgundy Badges and Champagne Prices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {DEALS.map((deal) => (
          <div
            key={deal.id}
            className="p-7 rounded-3xl bg-[rgba(7,45,51,0.75)] border border-[rgba(155,188,171,0.25)] hover:border-[#DFBE8B]/70 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl group relative overflow-hidden backdrop-blur-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {/* Burgundy discount badge */}
                <span className="text-[10px] font-mono font-bold text-[#DFBE8B] bg-[#33091B]/95 px-2.5 py-1 rounded-md border border-[#8F5C64]/40 uppercase shadow-sm">
                  {deal.category}
                </span>
                <span className="text-[11px] font-mono text-[#C8D8D0]/60 line-through">
                  {deal.originalPrice}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#F5F2EA] group-hover:text-[#DFBE8B] transition-colors">
                  {deal.name}
                </h3>
                {/* Champagne price */}
                <div className="text-base font-extrabold text-[#DFBE8B] font-mono mt-1">
                  {deal.dealPrice}
                </div>
              </div>

              <p className="text-xs font-medium text-[#9ABCAB]">
                {deal.offer}
              </p>

              <ul className="space-y-2 pt-2 border-t border-[rgba(155,188,171,0.18)] text-xs text-[#C8D8D0]">
                {deal.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DFBE8B] shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-[rgba(155,188,171,0.18)]">
              <MagneticElement cursorText="CLAIM" className="w-full">
                <a
                  href={`https://wa.me/919417765441?text=Hi%20Josan%20Mobile%2C%20I%20am%20interested%20in%20claiming%20the%20deal%3A%20${encodeURIComponent(deal.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#DFBE8B] hover:bg-[#F5F2EA] text-[#072D33] text-xs font-bold transition-all shadow-md shadow-[#DFBE8B]/20"
                >
                  <span>{deal.cta}</span>
                  <ArrowRight className="w-4 h-4 text-[#072D33]" />
                </a>
              </MagneticElement>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
