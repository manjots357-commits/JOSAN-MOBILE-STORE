import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/cursor/CustomCursor';
import { ScrollProgressBar } from './components/navigation/ScrollProgressBar';
import { TopBar } from './components/navigation/TopBar';
import { HeroSection } from './components/sections/HeroSection';
import { TickerAndPillarsSection } from './components/sections/TickerAndPillarsSection';
import { HorizontalProductShowroom } from './components/sections/HorizontalProductShowroom';
import { FeaturedPhoneCinematicShowcase } from './components/sections/FeaturedPhoneCinematicShowcase';
import { CraftServiceSelectorSection } from './components/sections/CraftServiceSelectorSection';
import { TransformationSliderSection } from './components/sections/TransformationSliderSection';
import { StoreServicesSection } from './components/sections/StoreServicesSection';
import { WorkProcessSection } from './components/sections/WorkProcessSection';
import { WhyJosanSection } from './components/sections/WhyJosanSection';
import { CustomerVideosSection } from './components/sections/CustomerVideosSection';
import { StoreExperienceSection } from './components/sections/StoreExperienceSection';
import { StoreExploreHotspotsSection } from './components/sections/StoreExploreHotspotsSection';
import { CinematicDealsSection } from './components/sections/CinematicDealsSection';
import { AccessoriesSection } from './components/sections/AccessoriesSection';
import { StoreLocationSection } from './components/sections/StoreLocationSection';
import { Footer } from './components/navigation/Footer';
import { CinemaModal } from './components/video/CinemaModal';
import { QuickRequestDrawer } from './components/modal/QuickRequestDrawer';
import { CinematicRainAtmosphere } from './components/common/CinematicRainAtmosphere';
import { MediaItem } from './data/media';

// Register GSAP ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeCinemaMedia, setActiveCinemaMedia] = useState<MediaItem | null>(null);
  const [requestDrawerOpen, setRequestDrawerOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const globalParallaxRef = useRef<HTMLDivElement>(null);

  // Subtle GSAP ScrollTrigger intersection & background parallax animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mainEl = mainRef.current;
    if (!mainEl) return;

    const sections = mainEl.querySelectorAll<HTMLElement>('section');

    const ctx = gsap.context(() => {
      // 1. Global background parallax: moves slower across the full main container
      if (globalParallaxRef.current) {
        gsap.fromTo(
          globalParallaxRef.current,
          { y: -70 },
          {
            y: 70,
            ease: 'none',
            scrollTrigger: {
              trigger: mainEl,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.5,
            },
          }
        );
      }

      // 2. Main sections intersection entrance & background parallax
      sections.forEach((section, index) => {
        // Section fade-in / slide-up entrance animation:
        if (section.id === 'home' || index === 0) {
          gsap.fromTo(
            section,
            { opacity: 0.3, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power2.out',
              clearProps: 'transform',
            }
          );
        } else {
          gsap.fromTo(
            section,
            {
              opacity: 0,
              y: 32,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Section background parallax effect:
        // Background moves slower than section content (translates +y as page scrolls down)
        // Creating authentic multi-plane depth
        const bgLayer = section.querySelector<HTMLElement>('.parallax-bg-layer');
        if (bgLayer) {
          gsap.fromTo(
            bgLayer,
            { y: -50 },
            {
              y: 50,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
      });
    }, mainRef);

    // Refresh ScrollTrigger measurements after initial render settles and on resize
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  const handleOpenCinema = (media: MediaItem) => {
    setActiveCinemaMedia(media);
  };

  const handleCloseCinema = () => {
    setActiveCinemaMedia(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#072D33] text-[#F5F2EA] selection:bg-[#DFBE8B]/30 selection:text-[#DFBE8B]">
        {/* Continuous Scroll Progress Bar along top edge */}
        <ScrollProgressBar />

        {/* Advanced Desktop Custom Cursor & Ambient Champagne Light */}
        <CustomCursor />

        {/* Shared Persistent Rain Background across the ENTIRE Website */}
        <CinematicRainAtmosphere />

        {/* Floating Glass Navbar with Shrink-On-Scroll */}
        <TopBar
          onVisitStoreClick={() => scrollToSection('contact')}
          onRequestClick={() => setRequestDrawerOpen(true)}
        />

        {/* Main Content Sections - Continuous Cinematic Story with GSAP ScrollTrigger */}
        <main ref={mainRef} className="relative z-10 overflow-hidden">
          {/* Continuous Ambient Background Parallax Backdrop across the full main container */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
            <div
              ref={globalParallaxRef}
              className="absolute inset-x-0 -top-32 h-[calc(100%+256px)] opacity-70 will-change-transform"
            >
              {/* Natural mineral ambient light blooms along the showroom spine */}
              <div className="absolute top-[8%] -left-36 w-[640px] h-[640px] rounded-full blur-[170px] bg-[#3A7564]/[0.08]" />
              <div className="absolute top-[32%] -right-36 w-[720px] h-[720px] rounded-full blur-[190px] bg-[#DFBE8B]/[0.06]" />
              <div className="absolute top-[56%] -left-36 w-[680px] h-[680px] rounded-full blur-[180px] bg-[#8F5C64]/[0.07]" />
              <div className="absolute top-[80%] -right-36 w-[640px] h-[640px] rounded-full blur-[170px] bg-[#9ABCAB]/[0.06]" />
            </div>
          </div>

          {/* 1. Cinematic Movie Opening Hero: Real Store Video + 3D Phone + Typography */}
          <HeroSection
            onExploreClick={() => scrollToSection('phones')}
            onVisitStoreClick={() => scrollToSection('contact')}
          />

          {/* 2. Marquee Ticker & Core Brand Pillars with Scroll Typography Reveal */}
          <TickerAndPillarsSection />

          {/* 3. Horizontal Runway Product Showroom: iPhone, Samsung, OnePlus, Pixel with Asymmetrical Cards */}
          <HorizontalProductShowroom onOpenCinema={handleOpenCinema} />

          {/* 4. Featured Flagship 3D Showcase: Front, 360° Rotate, Back, 48MP Camera & Specs */}
          <FeaturedPhoneCinematicShowcase />

          {/* 5. 02 / The Craft: Interactive Service & Element Tabs with Transparent Pricing */}
          <CraftServiceSelectorSection />

          {/* 6. 03 / The Reveal: Interactive Before & After Repair / Exchange Split Slider */}
          <TransformationSliderSection />

          {/* 7. Store Services: 6 Interactive Glass Cards with Hover Reactions */}
          <StoreServicesSection />

          {/* 8. Work Process: 4-Step Transparent Customer Journey (How We Help You) */}
          <WorkProcessSection />

          {/* 9. Why Shop With Us: Statistics & Storytelling Standards */}
          <WhyJosanSection />

          {/* 10. Real Customer Story: Real People. Real Devices. Verified Deliveries */}
          <CustomerVideosSection onOpenCinema={handleOpenCinema} />

          {/* 11. Store Experience: Step Inside Josan with 4K Walkthrough Video */}
          <StoreExperienceSection onOpenCinema={handleOpenCinema} />

          {/* 12. 04 / The Space: Interactive Showroom Interior Hotspots Tour */}
          <StoreExploreHotspotsSection onOpenCinema={handleOpenCinema} />

          {/* 13. Editorial Deals: In-Store Specials & Trade-In Desk */}
          <CinematicDealsSection onOpenCinema={handleOpenCinema} />

          {/* 14. Certified Original Accessories & Gear Showcase */}
          <AccessoriesSection />

          {/* 15. Visit Josan Mobile: Physical Store Location, Google Maps, Hotline & Timings */}
          <StoreLocationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Fullscreen Cinema Modal for Video Viewing */}
        <CinemaModal media={activeCinemaMedia} onClose={handleCloseCinema} />

        {/* Concierge Device Request Drawer */}
        <QuickRequestDrawer
          isOpen={requestDrawerOpen}
          onClose={() => setRequestDrawerOpen(false)}
        />
      </div>
    </CursorProvider>
  );
}
