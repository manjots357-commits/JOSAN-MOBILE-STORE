import React, { useState, useEffect } from 'react';
import { MagneticElement } from '../cursor/MagneticElement';
import { storeInfo } from '../../data/media';
import { Phone, MapPin, Menu, X, Smartphone } from 'lucide-react';

interface TopBarProps {
  onVisitStoreClick: () => void;
  onRequestClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onVisitStoreClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Standard clean navigation links requested: Home, Phones, Accessories, Services, Customers, Store, Contact
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Phones', href: '#phones' },
    { label: 'Accessories', href: '#accessories' },
    { label: 'Services', href: '#services' },
    { label: 'Customers', href: '#customers' },
    { label: 'Store', href: '#store' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#072D33]/95 border-b border-[rgba(155,188,171,0.22)] shadow-xl backdrop-blur-md'
          : 'py-4 bg-[#072D33]/60 backdrop-blur-sm border-b border-[rgba(155,188,171,0.1)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: Josan Mobile Logo Wordmark */}
        <MagneticElement cursorText="HOME">
          <a
            href="#home"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[rgba(7,45,51,0.9)] border border-[#DFBE8B]/70 flex items-center justify-center text-[#DFBE8B] group-hover:scale-105 transition-all shadow-[0_0_10px_rgba(223,190,139,0.25)]">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight text-[#F5F0E6] group-hover:text-[#DFBE8B] transition-colors whitespace-nowrap">
              JOSAN MOBILE
            </span>
          </a>
        </MagneticElement>

        {/* Center: Clean Nav Links Capsule */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.22)] backdrop-blur-md shadow-md text-xs font-semibold text-[#E2EAE6]">
          {navLinks.map((link) => {
            const isActive = activeNav === link.label;
            return (
              <MagneticElement key={link.label} cursorText="GO">
                <a
                  href={link.href}
                  onClick={() => setActiveNav(link.label)}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#DFBE8B] text-[#072D33] font-bold shadow-sm'
                      : 'hover:text-[#DFBE8B] hover:bg-[#3A7564]/20'
                  }`}
                >
                  {link.label}
                </a>
              </MagneticElement>
            );
          })}
        </nav>

        {/* Right: Single Compact Visit Store Action */}
        <div className="flex items-center gap-3">
          <MagneticElement cursorText="VISIT">
            <button
              onClick={onVisitStoreClick}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#DFBE8B] hover:bg-[#F5F0E6] text-[#072D33] text-xs font-bold transition-all shadow-md shadow-[#DFBE8B]/20 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#072D33]" />
              <span>Visit Store</span>
            </button>
          </MagneticElement>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] text-[#C8D8D0] hover:text-[#F5F0E6] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#072D33]/98 border-b border-[rgba(155,188,171,0.25)] px-6 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveNav(link.label);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-sm font-semibold text-[#C8D8D0] hover:text-[#DFBE8B] transition-colors border-b border-[rgba(155,188,171,0.1)] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                onVisitStoreClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#DFBE8B] text-[#072D33] text-xs font-bold flex items-center justify-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Visit Showroom</span>
            </button>
            <a
              href={`tel:${storeInfo.rawPhone}`}
              className="flex items-center justify-center gap-2 py-2 rounded-xl bg-[rgba(7,45,51,0.8)] border border-[rgba(155,188,171,0.25)] text-xs font-semibold text-[#F5F0E6]"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFBE8B]" />
              <span>Call: {storeInfo.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
