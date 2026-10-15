import React from 'react';
import { storeInfo } from '../../data/media';
import { MagneticElement } from '../cursor/MagneticElement';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { MapPin, Phone, Clock, MessageCircle, Navigation, ShieldCheck, Wrench, CreditCard } from 'lucide-react';

export const StoreLocationSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.20)] overflow-hidden bg-[#072D33]/45">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="jade" glowPosition="top-right" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        {/* Left Store Info in Deep Jade & Soft Sage */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-3 py-1 rounded-md bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)] shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#DFBE8B]" />
              <span>Flagship Boutique &amp; Service Hub</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
              VISIT JOSAN MOBILE
            </h2>

            <p className="text-sm sm:text-base text-[#E2EAE6] max-w-xl leading-relaxed">
              Experience the devices in your own hands before purchasing. Our technicians provide
              instant unboxing, data migration, and authorized repairs under one roof.
            </p>
          </div>

          {/* Details Grid in Deep Jade glass with Soft Sage & Champagne details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[rgba(7,45,51,0.65)] border border-[rgba(155,188,171,0.20)] space-y-1 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-[#DFBE8B] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#DFBE8B]" />
                <span>Store Address</span>
              </div>
              <div className="text-sm font-semibold text-[#F5F2EA]">
                {storeInfo.address}
              </div>
              <div className="text-xs text-[#9ABCAB]">
                Near Hakk Computer, Jandiala Guru, Punjab
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[rgba(7,45,51,0.65)] border border-[rgba(155,188,171,0.20)] space-y-1 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-[#DFBE8B] uppercase tracking-wider">
                <Phone className="w-4 h-4 text-[#DFBE8B]" />
                <span>Direct Hotline</span>
              </div>
              <div className="text-sm font-bold text-[#F5F2EA] font-mono">
                {storeInfo.phone}
              </div>
              <div className="text-xs text-[#9ABCAB]">
                Call anytime for live stock &amp; best deal
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[rgba(7,45,51,0.65)] border border-[rgba(155,188,171,0.20)] space-y-1 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-[#9ABCAB] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#9ABCAB]" />
                <span>Opening Hours</span>
              </div>
              <div className="text-sm font-semibold text-[#F5F2EA]">
                {storeInfo.timings}
              </div>
              <div className="text-xs text-[#C8D8D0]">
                Open all 7 days of the week
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[rgba(7,45,51,0.65)] border border-[rgba(155,188,171,0.20)] space-y-1 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-[#DFBE8B] uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-[#DFBE8B]" />
                <span>Payment Modes</span>
              </div>
              <div className="text-sm font-semibold text-[#F5F2EA]">
                UPI &bull; Credit/Debit Cards &bull; Cash
              </div>
              <div className="text-xs text-[#9ABCAB]">
                Transparent on-counter invoice generated
              </div>
            </div>
          </div>

          {/* Styled Soft Sage & Champagne Map Preview Card */}
          <div className="relative rounded-2xl overflow-hidden border border-[rgba(155,188,171,0.25)] bg-[#041B1F] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DFBE8B] text-[#072D33] flex items-center justify-center shadow-md">
                <Navigation className="w-5 h-5 text-[#072D33]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F5F2EA] uppercase tracking-wider">
                  Location Marker &bull; Punjab Flagship
                </div>
                <div className="text-[11px] text-[#9ABCAB] font-mono">
                  Verowal Road, Jandiala Guru &bull; PIN 143115
                </div>
              </div>
            </div>

            <a
              href={storeInfo.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#DFBE8B] hover:text-[#F5F2EA] underline uppercase tracking-wider"
            >
              Open Live Google Maps &rarr;
            </a>
          </div>

          {/* Action CTAs: Get Directions and WhatsApp */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <MagneticElement cursorText="DIRECTIONS" magneticStrength={0.25}>
              <a
                href={storeInfo.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#DFBE8B] hover:bg-[#F5F2EA] text-[#072D33] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#DFBE8B]/25"
              >
                <Navigation className="w-4 h-4 text-[#072D33]" />
                <span>Get Directions</span>
              </a>
            </MagneticElement>

            <MagneticElement cursorText="WHATSAPP" magneticStrength={0.25}>
              <a
                href={storeInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[rgba(7,45,51,0.7)] hover:bg-[#3A7564] border border-[rgba(155,188,171,0.30)] text-[#F5F2EA] font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBE8B]" />
                <span>Chat on WhatsApp</span>
              </a>
            </MagneticElement>
          </div>
        </div>

        {/* Right Burgundy Secondary Panel */}
        <div className="lg:col-span-5 relative flex flex-col justify-center">
          <div className="rounded-3xl bg-[rgba(51,9,27,0.85)] border border-[rgba(143,92,100,0.35)] p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#8F5C64]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-[#DFBE8B] font-mono uppercase tracking-widest">
                IN-STORE SERVICES &bull; CERTIFIED LAB
              </span>
              <h3 className="text-xl font-bold text-[#F5F2EA]">
                Full Technical Support &amp; Repair
              </h3>
              <p className="text-xs sm:text-sm text-[#C8D8D0]">
                We don’t just sell devices—our technicians offer certified repairs, chip-level
                servicing, screen replacements, and instant network unlocking.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {[
                { icon: ShieldCheck, title: 'Original Genuine Accessories', desc: 'Apple 20W adapters, Samsung chargers & cases' },
                { icon: Wrench, title: 'Express Screen & Battery Repair', desc: 'Fixed in 30-45 minutes with genuine parts' },
                { icon: CreditCard, title: 'Instant 0% EMI Approval', desc: 'Walk in with Aadhar & walk out with your flagship' }
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[rgba(28,5,15,0.75)] border border-[rgba(143,92,100,0.25)] shadow-sm">
                  <item.icon className="w-4 h-4 text-[#DFBE8B] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#F5F2EA]">{item.title}</div>
                    <div className="text-[11px] text-[#C8D8D0]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[rgba(143,92,100,0.25)] flex items-center justify-between text-xs">
              <span className="text-[#C8D8D0]">Direct Concierge:</span>
              <span className="text-[#DFBE8B] font-bold font-mono">9417765441</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
