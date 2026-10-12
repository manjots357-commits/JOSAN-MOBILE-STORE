import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#3A7564] via-[#DFBE8B] to-[#3A7564] shadow-[0_0_10px_rgba(223,190,139,0.8)] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
