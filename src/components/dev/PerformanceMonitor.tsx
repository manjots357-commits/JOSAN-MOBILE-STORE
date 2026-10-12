import React, { useEffect, useState, useRef } from 'react';
import { Activity, X, ChevronDown, ChevronUp } from 'lucide-react';
import { centralLoop } from '../../utils/unifiedLoop';

export const PerformanceMonitor: React.FC = () => {
  const [fps, setFps] = useState(60);
  const [tier, setTier] = useState('high');
  const [particles, setParticles] = useState(1800);
  const [memoryMB, setMemoryMB] = useState<number | null>(null);
  const [activeVideos, setActiveVideos] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const lastUpdate = useRef(0);

  useEffect(() => {
    const onTick = (_deltaMs: number, elapsedSec: number, currentFps: number) => {
      // Update UI stats once every 800ms to minimize React state changes
      if (elapsedSec - lastUpdate.current >= 0.8) {
        lastUpdate.current = elapsedSec;
        setFps(currentFps);
        setTier(centralLoop.getDeviceTier());
        setParticles(centralLoop.getRecommendedParticleCount());

        // Check active video tags
        const videos = document.querySelectorAll('video');
        let playingCount = 0;
        videos.forEach((v) => {
          if (!v.paused && !v.ended) playingCount++;
        });
        setActiveVideos(playingCount);

        // Check memory if available in Chromium
        const perf = window.performance as unknown as { memory?: { usedJSHeapSize: number } };
        if (perf && perf.memory) {
          setMemoryMB(Math.round(perf.memory.usedJSHeapSize / (1024 * 1024)));
        }
      }
    };

    const unsubscribe = centralLoop.subscribe('performance-monitor', onTick, 90);
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 text-xs select-none">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#072D33]/90 border border-[rgba(155,188,171,0.25)] text-[#DFBE8B] hover:bg-[#3A7564]/30 transition-all shadow-md"
          title="Toggle Performance HUD"
        >
          <Activity className="w-3.5 h-3.5 text-[#DFBE8B]" />
          <span className="font-mono font-bold">{fps} FPS</span>
        </button>
      ) : (
        <div className="p-3.5 rounded-xl bg-[#072D33]/95 border border-[rgba(155,188,171,0.3)] text-[#F5F2EA] shadow-2xl space-y-2 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-[rgba(155,188,171,0.2)] pb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#DFBE8B]">
              <Activity className="w-3.5 h-3.5" />
              <span>PERF MONITOR</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9ABCAB] hover:text-[#F5F2EA]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#9ABCAB]">Frame Rate:</span>
              <span className={`font-bold ${fps >= 55 ? 'text-[#DFBE8B]' : fps >= 30 ? 'text-[#9ABCAB]' : 'text-[#8F5C64]'}`}>
                {fps} FPS
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#9ABCAB]">Playing Videos:</span>
              <span className="text-[#F5F2EA]">{activeVideos}</span>
            </div>

            {memoryMB !== null && (
              <div className="flex justify-between">
                <span className="text-[#9ABCAB]">JS Heap:</span>
                <span className="text-[#F5F2EA]">{memoryMB} MB</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-[#9ABCAB]">3D WebGL:</span>
              <span className="text-[#3A7564]">Active (Low-Poly)</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#9ABCAB]">Rain Particles:</span>
              <span className="text-[#DFBE8B]">{particles} ({tier.toUpperCase()})</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
