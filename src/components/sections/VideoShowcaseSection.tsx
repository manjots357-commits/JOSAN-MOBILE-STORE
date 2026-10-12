import React from 'react';
import { storeVideos, MediaItem } from '../../data/media';
import { VideoCard } from '../video/VideoCard';
import { Sparkles, Store } from 'lucide-react';

interface VideoShowcaseSectionProps {
  onOpenCinema: (media: MediaItem) => void;
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ onOpenCinema }) => {
  const largeStoreVideo = storeVideos[0];
  const smallStoreVideos = storeVideos.slice(1, 3);

  return (
    <section id="store" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-3 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
          <Store className="w-3.5 h-3.5 text-[#DFBE8B]" />
          <span>Cinematic Showroom Walkthrough</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
          REAL STORE &bull; REAL PEOPLE &bull;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBE8B] to-[#F5F2EA]">
            REAL DEVICES
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#C8D8D0] leading-relaxed">
          Take an authentic virtual walk inside Josan Computer &amp; Mobile. Observe our festive
          Diwali displays, certified flagship counters, and genuine retail experience.
        </p>
      </div>

      {/* Cinematic Layout: 1 Large Hero Video on top + 2 Small Supporting Videos */}
      <div className="space-y-6">
        {largeStoreVideo && (
          <div className="relative group">
            <VideoCard
              media={largeStoreVideo}
              autoPlayMuted={false}
              hoverPlay={true}
              aspectRatioClass="aspect-[16/9] md:aspect-[21/9]"
              onOpenCinema={onOpenCinema}
              badgeLabel="STORE SHOWROOM TOUR"
              className="border-[rgba(155,188,171,0.25)] shadow-2xl"
            />
            <div className="absolute -bottom-3 right-6 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#072D33]/90 border border-[rgba(155,188,171,0.25)] text-xs text-[#DFBE8B] shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full 4K Showroom Walkthrough</span>
            </div>
          </div>
        )}

        {/* 2 Supporting Smaller Store Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {smallStoreVideos.map((video) => (
            <VideoCard
              key={video.id}
              media={video}
              autoPlayMuted={false}
              hoverPlay={true}
              aspectRatioClass="aspect-video"
              onOpenCinema={onOpenCinema}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
