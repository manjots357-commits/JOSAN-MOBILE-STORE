import React from 'react';
import { instagramVideos, MediaItem } from '../../data/media';
import { VideoCard } from '../video/VideoCard';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { Video, Flame } from 'lucide-react';

interface ReelsSectionProps {
  onOpenCinema: (media: MediaItem) => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({ onOpenCinema }) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(155,188,171,0.2)] overflow-hidden">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="subtle" watermarkText="12 // LIVE REELS FEED" glowPosition="top-left" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#DFBE8B] px-2.5 py-1 rounded bg-[rgba(7,45,51,0.7)] border border-[rgba(155,188,171,0.25)]">
            <Video className="w-3.5 h-3.5 text-[#DFBE8B]" />
            <span>Daily Stories &amp; Sold Highlights</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#F5F2EA] tracking-tight uppercase">
            LIVE FROM OUR REELS
          </h3>
          <p className="text-xs sm:text-sm text-[#C8D8D0]">
            Freshly recorded retail deliveries as seen on our official Instagram feed.
          </p>
        </div>

        <div className="text-xs font-semibold text-[#DFBE8B] flex items-center gap-1.5 self-start md:self-end bg-[rgba(7,45,51,0.75)] border border-[rgba(155,188,171,0.25)] px-3 py-1.5 rounded-lg">
          <Flame className="w-3.5 h-3.5 text-[#DFBE8B]" />
          <span>Updated Daily at Josan Mobile</span>
        </div>
      </div>

      {/* 5-Column Responsive Vertical Feed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {instagramVideos.map((reel) => (
          <div key={reel.id} className="relative group">
            <VideoCard
              media={reel}
              aspectRatioClass="aspect-[9/16]"
              hoverPlay={true}
              onOpenCinema={onOpenCinema}
              className="h-full rounded-2xl border-[rgba(155,188,171,0.25)] hover:border-[#DFBE8B]/50"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
