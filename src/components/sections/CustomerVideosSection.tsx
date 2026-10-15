import React, { useState } from 'react';
import { customerVideos, instagramVideos, MediaItem } from '../../data/media';
import { VideoCard } from '../video/VideoCard';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { UserCheck, HeartHandshake, Film, Sparkles } from 'lucide-react';

interface CustomerVideosSectionProps {
  onOpenCinema: (media: MediaItem) => void;
}

export const CustomerVideosSection: React.FC<CustomerVideosSectionProps> = ({ onOpenCinema }) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'reels'>('customer');
  const activeList = activeTab === 'customer' ? customerVideos : instagramVideos;

  return (
    <section id="customers" className="relative py-20 lg:py-24 bg-[#33091B]/60 border-t border-[rgba(143,92,100,0.30)] overflow-hidden">
      {/* Background Parallax Layer with Burgundy Theme */}
      <SectionParallaxBg variant="burgundy" theme="burgundy" glowPosition="top-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-3 py-1.5 rounded-lg bg-[rgba(51,9,27,0.85)] border border-[rgba(143,92,100,0.35)] shadow-sm">
              <UserCheck className="w-3.5 h-3.5 text-[#DFBE8B]" />
              <span>VERIFIED CUSTOMER DELIVERIES &amp; REELS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
              REAL CUSTOMERS &bull; REAL HANDOVERS
            </h2>

            <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
              Real store handovers, genuine smiles, and certified devices. Every smartphone delivered at Josan
              is backed by official manufacturer warranty, transparent tax invoice, and on-counter setup.
            </p>
          </div>

          {/* Tab Selector & Trust Metric */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)]">
              <button
                onClick={() => setActiveTab('customer')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'customer'
                    ? 'bg-[#DFBE8B] text-[#33091B] shadow-sm'
                    : 'text-[#C8D8D0] hover:text-[#F5F2EA]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Customer Handovers ({customerVideos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reels')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'reels'
                    ? 'bg-[#DFBE8B] text-[#33091B] shadow-sm'
                    : 'text-[#C8D8D0] hover:text-[#F5F2EA]'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Daily Reels ({instagramVideos.length})</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3 bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] px-3 py-2 rounded-xl shadow-md">
              <HeartHandshake className="w-4 h-4 text-[#DFBE8B]" />
              <div className="text-xs font-bold text-[#F5F2EA]">100% Verified Sales</div>
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className={`grid gap-6 ${activeTab === 'customer' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
          {activeList.map((video) => (
            <div key={video.id} className="flex flex-col">
              <VideoCard
                media={video}
                autoPlayMuted={false}
                hoverPlay={true}
                aspectRatioClass="aspect-[9/16]"
                onOpenCinema={onOpenCinema}
                className="h-full bg-[rgba(7,45,51,0.60)] border-[rgba(155,188,171,0.20)] hover:border-[#DFBE8B]/60 shadow-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
