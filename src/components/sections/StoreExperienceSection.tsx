import React, { useRef, useState } from 'react';
import { storeVideos, storeInfo, MediaItem } from '../../data/media';
import { VideoCard } from '../video/VideoCard';
import { MagneticElement } from '../cursor/MagneticElement';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { Eye, MapPin, Sparkles, Volume2, VolumeX, Store, ArrowRight } from 'lucide-react';

interface StoreExperienceSectionProps {
  onOpenCinema?: (media: MediaItem) => void;
}

export const StoreExperienceSection: React.FC<StoreExperienceSectionProps> = ({
  onOpenCinema
}) => {
  const mainVideo = storeVideos[0];
  const sideVideos = storeVideos.slice(1, 3);
  const [activeFrameIdx, setActiveFrameIdx] = useState(0);

  return (
    <section id="store" className="relative py-24 bg-[#33091B] overflow-hidden border-t border-[rgba(143,92,100,0.3)]">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="burgundy" watermarkText="08 // PHYSICAL BOUTIQUE" glowPosition="center" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)]">
            <Store className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>CINEMATIC SHOWROOM &bull; STEP INSIDE JOSAN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
            STEP INSIDE JOSAN.
          </h2>

          <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
            Take an authentic virtual walk through our Punjab flagship boutique. Explore our illuminated glass display counters,
            sealed retail inventory, and active diagnostic lab.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MagneticElement cursorText="DIRECTIONS">
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DFBE8B] hover:bg-[#ebd5b2] text-[#33091B] text-xs font-bold transition-all shadow-md shadow-[#DFBE8B]/20"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Get Store Directions</span>
            </a>
          </MagneticElement>
        </div>
      </div>

      {/* Main Full-Width Cinematic Video Showcase in Jade Glass Frames with Champagne Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="relative group">
          <VideoCard
            media={mainVideo}
            aspectRatioClass="aspect-[16/9] md:aspect-[21/9]"
            hoverPlay={true}
            onOpenCinema={onOpenCinema}
            badgeLabel="FEATURED SHOWROOM TOUR"
            className="border-[rgba(223,190,139,0.35)] shadow-2xl rounded-3xl"
          />

          <div className="absolute -bottom-3 right-6 pointer-events-none hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072D33]/95 border border-[rgba(223,190,139,0.3)] text-xs text-[#DFBE8B] shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4K Showroom Walkthrough &bull; Tap to Play</span>
          </div>
        </div>

        {/* 2 Supporting Asymmetrical Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {sideVideos.map((video) => (
            <VideoCard
              key={video.id}
              media={video}
              aspectRatioClass="aspect-video"
              hoverPlay={true}
              onOpenCinema={onOpenCinema}
              className="rounded-3xl border-[rgba(155,188,171,0.25)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
