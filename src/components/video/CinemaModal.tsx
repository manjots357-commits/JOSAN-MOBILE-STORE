import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, MessageCircle, Phone } from 'lucide-react';
import { MediaItem, storeInfo } from '../../data/media';
import { MagneticElement } from '../cursor/MagneticElement';

interface CinemaModalProps {
  media: MediaItem | null;
  onClose: () => void;
}

export const CinemaModal: React.FC<CinemaModalProps> = ({ media, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    setHasVideoError(false);
  }, [media]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (media && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    }
  }, [media]);

  if (!media) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#072D33]/90 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-[#072D33] border border-[rgba(155,188,171,0.25)] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(155,188,171,0.20)] bg-[#041B1F]/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DFBE8B] animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-[#DFBE8B]">
              {media.customerLabel || 'JOSAN DIGITAL SHOWCASE'}
            </span>
            <span className="hidden sm:inline text-[#C8D8D0]/50">&bull;</span>
            <span className="hidden sm:inline text-xs text-[#C8D8D0] font-mono">
              Ph: {storeInfo.phone}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#C8D8D0] hover:text-[#F5F2EA] hover:bg-[#041B1F] transition-colors"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative flex-1 bg-[#072D33] flex items-center justify-center overflow-hidden min-h-[280px] max-h-[60vh]">
          <video
            ref={videoRef}
            src={media.mp4Url}
            poster={media.poster}
            muted={isMuted}
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onError={() => setHasVideoError(true)}
            className="w-full h-full max-h-[60vh] object-contain"
          />

          {hasVideoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#072D33]/80 p-6 text-center z-20 pointer-events-none">
              <span className="text-xs font-mono text-[#DFBE8B] font-bold uppercase tracking-wider mb-1">
                Verified In-Store Delivery Record
              </span>
              <p className="text-xs text-[#C8D8D0] max-w-sm">
                Full unboxing footage and delivery verification available directly via WhatsApp or on counter.
              </p>
            </div>
          )}

          {/* Video Control Bar on Bottom */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#072D33]/95 via-[#072D33]/60 to-transparent flex flex-col gap-2">
            {/* Scrubber Timeline */}
            <div
              onClick={handleSeek}
              className="w-full h-1.5 bg-[#133E35] hover:h-2 rounded-full cursor-pointer transition-all relative overflow-hidden"
            >
              <div
                className="h-full bg-[#DFBE8B] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#F5F2EA] pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="p-1.5 rounded-lg bg-[rgba(7,45,51,0.85)] hover:bg-[#3A7564] hover:text-[#F5F2EA] text-[#DFBE8B] transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="p-1.5 rounded-lg bg-[rgba(7,45,51,0.85)] hover:bg-[#3A7564] hover:text-[#F5F2EA] text-[#DFBE8B] transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#DFBE8B]" />}
                </button>

                <span className="text-[#F5F2EA] font-medium">{media.title}</span>
              </div>

              <div className="text-[#C8D8D0] font-mono text-[11px]">
                {media.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Info & Action Drawer */}
        <div className="p-5 bg-[#072D33]/95 border-t border-[rgba(155,188,171,0.20)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[#F5F2EA]">
                {media.title}
              </h3>
              {media.soldDevice && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[rgba(51,9,27,0.85)] text-[#DFBE8B] border border-[#8F5C64]/40">
                  {media.soldDevice}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#C8D8D0] max-w-xl">
              {media.description || media.subtitle}
            </p>
            {media.specs && (
              <div className="text-xs text-[#9ABCAB] font-mono pt-0.5">
                Specs: {media.specs} {media.price ? `&bull; Price: ${media.price}` : ''}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <MagneticElement cursorText="CHAT">
              <a
                href={`https://wa.me/919417765441?text=Hi%20Josan%20Mobile%2C%20I%20saw%20${encodeURIComponent(media.title)}%20on%20your%20website%20and%20want%20to%20know%20availability`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#DFBE8B] hover:bg-[#F5F2EA] text-[#072D33] text-xs font-bold transition-all shadow-md shadow-[#DFBE8B]/20"
              >
                <MessageCircle className="w-4 h-4 text-[#072D33]" />
                <span>WhatsApp Inquiry</span>
              </a>
            </MagneticElement>

            <MagneticElement cursorText="CALL">
              <a
                href={`tel:${storeInfo.rawPhone}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[rgba(7,45,51,0.7)] hover:bg-[#3A7564] text-[#F5F2EA] text-xs font-bold transition-all border border-[rgba(155,188,171,0.25)]"
              >
                <Phone className="w-4 h-4 text-[#DFBE8B]" />
                <span>Call Store</span>
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>
    </div>
  );
};
