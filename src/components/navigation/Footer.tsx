import React from 'react';
import { storeInfo } from '../../data/media';
import { MagneticElement } from '../cursor/MagneticElement';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#072D33] border-t border-[rgba(155,188,171,0.20)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-base font-extrabold text-[#F5F2EA] tracking-tight">
            JOSAN COMPUTER &amp; MOBILE
          </div>
          <p className="text-xs text-[#E2EAE6]">
            {storeInfo.tagline} &bull; Ph: {storeInfo.phone} &bull; Jandiala Guru, Punjab
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#E2EAE6] font-bold tracking-wider">
          <MagneticElement cursorText="HOME">
            <a href="#home" className="hover:text-[#DFBE8B] transition-colors">
              HOME
            </a>
          </MagneticElement>
          <MagneticElement cursorText="PHONES">
            <a href="#phones" className="hover:text-[#DFBE8B] transition-colors">
              PHONES
            </a>
          </MagneticElement>
          <MagneticElement cursorText="ACCESSORIES">
            <a href="#accessories" className="hover:text-[#DFBE8B] transition-colors">
              ACCESSORIES
            </a>
          </MagneticElement>
          <MagneticElement cursorText="SERVICES">
            <a href="#services" className="hover:text-[#DFBE8B] transition-colors">
              SERVICES
            </a>
          </MagneticElement>
          <MagneticElement cursorText="DEALS">
            <a href="#deals" className="hover:text-[#DFBE8B] transition-colors">
              DEALS
            </a>
          </MagneticElement>
          <MagneticElement cursorText="CUSTOMERS">
            <a href="#customers" className="hover:text-[#DFBE8B] transition-colors">
              CUSTOMERS
            </a>
          </MagneticElement>
          <MagneticElement cursorText="STORE">
            <a href="#store" className="hover:text-[#DFBE8B] transition-colors">
              STORE
            </a>
          </MagneticElement>
          <MagneticElement cursorText="CONTACT">
            <a href="#contact" className="hover:text-[#DFBE8B] transition-colors">
              CONTACT
            </a>
          </MagneticElement>
        </div>

        <div className="text-xs text-[#9ABCAB] text-center md:text-right">
          &copy; {new Date().getFullYear()} Josan Computer &amp; Mobile.
        </div>
      </div>
    </footer>
  );
};
