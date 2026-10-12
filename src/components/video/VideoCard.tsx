import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MediaItem } from '../../data/media';
import { useCursor } from '../../context/CursorContext';

interface VideoCardProps {
  media: MediaItem;
  autoPlayMuted?: boolean;
  hoverPlay?: boolean;
  aspectRatioClass?: string;
  className?: string;
  onOpenCinema?: (media: MediaItem) => void;
  showDetails?: boolean;
  badgeLabel?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  media,
  autoPlayMuted = false,
  hoverPlay = false,
  aspectRatioClass,
  className = '',
  onOpenCinema,
  showDetails = true,
  badgeLabel
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor, isMobile } = useCursor();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Derive aspect ratio class
  const aspect = aspectRatioClass || (
    media.aspectRatio === '9:16' ? 'aspect-[9/16]' :
    media.aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-video'
  );

  // Lazy loading & Intersection Observer for below-fold video management
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (autoPlayMuted && videoRef.current) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            // Pause immediately when outside viewport to preserve GPU and CPU
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlayMuted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setCursor('video', 'PAUSE');
      }).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setCursor('video', 'PLAY');
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMobile) {
      setCursor('video', isPlaying ? 'PAUSE' : 'PLAY');
    }

    if (hoverPlay && videoRef.current && !hasError && isInView) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isMobile) {
      resetCursor();
    }

    if (hoverPlay && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleCardClick = () => {
    if (onOpenCinema) {
      onOpenCinema(media);
    } else {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-2xl bg-[rgba(7,45,51,0.60)] border border-[rgba(155,188,171,0.20)] shadow-xl hover:border-[#DFBE8B]/60 transition-all duration-200 cursor-pointer ${className}`}
    >
      <div className={`relative w-full ${aspect} overflow-hidden bg-[#072D33]`}>
        {/* Poster Image (Zero network lag fallback) */}
        <img
          src={media.poster}
          alt={media.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Video Element: preload="none" until scrolled into view - Natural colors */}
        {!hasError && (
          <video
            ref={videoRef}
            src={isInView ? media.mp4Url : undefined}
            poster={media.poster}
            muted={isMuted}
            loop
            playsInline
            preload="none"
            onLoadedData={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Natural Vignette to protect typography without obscuring footage */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#072D33]/90 via-[#072D33]/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5">
            {badgeLabel ? (
              <span className="text-[10px] font-bold text-[#DFBE8B] bg-[rgba(7,45,51,0.85)] px-2 py-0.5 rounded-md border border-[rgba(155,188,171,0.30)]">
                {badgeLabel}
              </span>
            ) : media.customerLabel ? (
              <span className="text-[10px] font-bold text-[#DFBE8B] bg-[rgba(7,45,51,0.85)] px-2 py-0.5 rounded-md border border-[rgba(155,188,171,0.30)] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#3A7564]" />
                {media.customerLabel}
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-[#C8D8D0] bg-[#072D33]/85 px-2 py-0.5 rounded-md border border-[rgba(155,188,171,0.20)] uppercase">
                {media.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute' : 'Mute'}
              className="p-1.5 rounded-lg bg-[#072D33]/85 hover:bg-[#3A7564] text-[#C8D8D0] hover:text-[#F5F2EA] border border-[rgba(155,188,171,0.25)] transition-colors"
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-[#DFBE8B]" />}
            </button>

            {onOpenCinema && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCinema(media);
                }}
                title="Expand Cinema View"
                className="p-1.5 rounded-lg bg-[#072D33]/85 hover:bg-[#3A7564] text-[#C8D8D0] hover:text-[#F5F2EA] border border-[rgba(155,188,171,0.25)] transition-colors"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Center Play Button Overlay on Hover/Paused */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 pointer-events-none ${
            !isPlaying || isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={togglePlay}
            className="pointer-events-auto w-11 h-11 rounded-full bg-[#DFBE8B] text-[#072D33] flex items-center justify-center shadow-lg shadow-[#DFBE8B]/30 transform transition-transform duration-150 hover:scale-110 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Bottom Details Overlay */}
        {showDetails && (
          <div className="absolute bottom-0 inset-x-0 p-3 pointer-events-none z-10">
            {media.soldDevice && (
              <div className="text-[11px] font-bold text-[#DFBE8B] mb-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#DFBE8B]" />
                <span>{media.soldDevice}</span>
              </div>
            )}
            <h4 className="text-xs sm:text-sm font-bold text-[#F5F2EA] line-clamp-1 group-hover:text-[#DFBE8B] transition-colors">
              {media.title}
            </h4>
            <p className="text-[11px] text-[#C8D8D0] line-clamp-1 mt-0.5">
              {media.subtitle}
            </p>

            {media.specs && (
              <div className="mt-1 text-[10px] text-[#C8D8D0] flex items-center gap-2">
                <span>{media.specs}</span>
                <span className="text-[#C8D8D0]/50">&bull;</span>
                <span className="font-mono text-[#DFBE8B]">{media.duration}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
