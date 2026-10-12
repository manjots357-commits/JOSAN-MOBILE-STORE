import React, { useState } from 'react';
import { productVideos, MediaItem } from '../../data/media';
import { VideoCard } from '../video/VideoCard';
import { MagneticElement } from '../cursor/MagneticElement';
import { Smartphone, MessageCircle, ChevronRight, Check } from 'lucide-react';

interface ProductVideoSectionProps {
  onOpenCinema: (media: MediaItem) => void;
}

export const ProductVideoSection: React.FC<ProductVideoSectionProps> = ({
  onOpenCinema
}) => {
  const [filter, setFilter] = useState<'all' | 'apple' | 'samsung' | 'motorola'>('all');

  const filteredProducts = productVideos.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'apple') return p.title.toLowerCase().includes('iphone') || p.title.toLowerCase().includes('apple');
    if (filter === 'samsung') return p.title.toLowerCase().includes('samsung');
    if (filter === 'motorola') return p.title.toLowerCase().includes('motorola');
    return true;
  });

  return (
    <section id="phones" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)]">
      {/* Header with Interactive Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Smartphone className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>Authentic Smartphone Hardware</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
            THE LATEST DEVICES
          </h2>

          <p className="text-sm text-[#C8D8D0]">
            Hover over any device for instant video preview. Genuine smartphones with official in-store billing and dedicated counter assistance.
          </p>
        </div>

        {/* Clean Interactive Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#072D33]/90 border border-[rgba(155,188,171,0.2)] rounded-xl">
          {(['all', 'apple', 'samsung', 'motorola'] as const).map((tab) => (
            <MagneticElement key={tab} cursorText="SELECT">
              <button
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all uppercase ${
                  filter === tab
                    ? 'bg-[#DFBE8B] text-[#33091B] shadow-md shadow-[#DFBE8B]/20'
                    : 'text-[#9ABCAB] hover:text-[#F5F2EA]'
                }`}
              >
                {tab === 'all' ? 'All Devices' : tab}
              </button>
            </MagneticElement>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group rounded-2xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] overflow-hidden flex flex-col justify-between hover:border-[#DFBE8B]/50 transition-all duration-200 shadow-xl"
          >
            {/* Top Video Preview Card */}
            <div className="relative">
              <VideoCard
                media={prod}
                hoverPlay={true}
                aspectRatioClass="aspect-[4/3]"
                onOpenCinema={onOpenCinema}
                showDetails={false}
                badgeLabel="HOVER PREVIEW"
              />
            </div>

            {/* Product Body Information */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-[#F5F2EA] group-hover:text-[#DFBE8B] transition-colors line-clamp-1">
                    {prod.title}
                  </h3>
                  <span className="text-sm font-extrabold text-[#DFBE8B] font-mono whitespace-nowrap">
                    {prod.price}
                  </span>
                </div>

                <p className="text-xs text-[#C8D8D0] line-clamp-2">
                  {prod.description}
                </p>

                <div className="pt-2 text-[11px] text-[#C8D8D0] font-mono bg-[#072D33]/85 p-2 rounded-lg border border-[rgba(155,188,171,0.15)]">
                  {prod.specs}
                </div>
              </div>

              {/* Action Buttons: WhatsApp Inquire & View Specs */}
              <div className="pt-1 flex items-center gap-2">
                <MagneticElement cursorText="INQUIRE" className="flex-1">
                  <a
                    href={`https://wa.me/919417765441?text=Hi%20Josan%20Mobile%2C%20is%20the%20${encodeURIComponent(prod.title)}%20available%20for%20purchase%3F`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[rgba(7,45,51,0.8)] hover:bg-[#DFBE8B] hover:text-[#33091B] text-[#F5F2EA] text-xs font-bold transition-all border border-[rgba(155,188,171,0.25)]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#DFBE8B] group-hover:text-[#33091B]" />
                    <span>Inquire Price</span>
                  </a>
                </MagneticElement>

                <MagneticElement cursorText="VIEW">
                  <button
                    onClick={() => onOpenCinema(prod)}
                    className="p-2 rounded-xl bg-[rgba(7,45,51,0.8)] hover:bg-[#DFBE8B] text-[#C8D8D0] hover:text-[#33091B] transition-all border border-[rgba(155,188,171,0.25)]"
                    title="View Video & Specs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </MagneticElement>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
