import React, { useState, useRef } from 'react';
import { MagneticElement } from '../cursor/MagneticElement';
import { useCursor, CursorState } from '../../context/CursorContext';
import { MediaItem } from '../../data/media';
import { SectionParallaxBg } from '../common/SectionParallaxBg';
import { storeConfig } from '../../data/storeConfig';
import {
  Smartphone,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Phone,
  CheckCircle2,
  SlidersHorizontal,
  Grid3X3,
  Columns
} from 'lucide-react';

export interface CatalogProduct {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'OnePlus' | 'Google' | 'Motorola' | 'Vivo';
  badge: string;
  storage: string;
  condition: string;
  price: string;
  rawPrice: number;
  emi: string;
  availability: 'In Stock' | 'Limited Stock' | 'Order on Request';
  display: string;
  processor: string;
  camera: string;
  battery: string;
  image: string;
  category: 'all' | 'apple' | 'samsung' | 'flagship' | 'budget5g';
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod-iphone16promax',
    name: 'Apple iPhone 16 Pro Max',
    brand: 'Apple',
    badge: 'FLAGSHIP LEADER',
    storage: '256GB · 512GB · 1TB',
    condition: 'Brand New Sealed · 1-Yr Official Apple Warranty',
    price: '₹1,34,900',
    rawPrice: 134900,
    emi: 'From ₹5,620/mo with 0% EMI',
    availability: 'In Stock',
    display: '6.9" Super Retina XDR 120Hz ProMotion',
    processor: 'Apple A18 Pro Bionic (3nm)',
    camera: '48MP Fusion + 48MP Ultra-Wide + 5x Telephoto',
    battery: '33 hrs video playback · MagSafe 25W',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80&auto=format&fit=crop',
    category: 'apple'
  },
  {
    id: 'prod-s24ultra',
    name: 'Samsung Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    badge: 'GALAXY AI TITANIUM',
    storage: '256GB · 512GB · 1TB',
    condition: 'Brand New Sealed · Official Samsung India Warranty',
    price: '₹1,21,999',
    rawPrice: 121999,
    emi: 'From ₹5,083/mo with 0% EMI',
    availability: 'In Stock',
    display: '6.8" Flat Dynamic AMOLED 2X 120Hz',
    processor: 'Snapdragon 8 Gen 3 for Galaxy',
    camera: '200MP Quad Telephoto + S-Pen Included',
    battery: '5000 mAh · 45W Super Fast Charging',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80&auto=format&fit=crop',
    category: 'samsung'
  },
  {
    id: 'prod-zfold6',
    name: 'Samsung Galaxy Z Fold 6 5G',
    brand: 'Samsung',
    badge: 'FOLDABLE ICON',
    storage: '256GB · 512GB',
    condition: 'Brand New Sealed · Official Samsung India Warranty',
    price: '₹1,54,999',
    rawPrice: 154999,
    emi: 'From ₹6,458/mo with 0% EMI',
    availability: 'In Stock',
    display: '7.6" Main Dynamic AMOLED + 6.3" Cover Screen',
    processor: 'Snapdragon 8 Gen 3 for Galaxy',
    camera: '50MP Triple Camera with FlexCam AI',
    battery: '4400 mAh Dual Battery · Armor Aluminum Frame',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop',
    category: 'samsung'
  },
  {
    id: 'prod-iphone16pro',
    name: 'Apple iPhone 16 Pro',
    brand: 'Apple',
    badge: 'PRO COMPACT',
    storage: '128GB · 256GB · 512GB',
    condition: 'Brand New Sealed · 1-Yr Official Apple Warranty',
    price: '₹1,19,900',
    rawPrice: 119900,
    emi: 'From ₹4,995/mo with 0% EMI',
    availability: 'In Stock',
    display: '6.3" Super Retina XDR 120Hz ProMotion',
    processor: 'Apple A18 Pro Bionic (3nm)',
    camera: '48MP Triple Periscope + Camera Control Button',
    battery: '27 hrs video playback · MagSafe Qi2',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80&auto=format&fit=crop',
    category: 'apple'
  },
  {
    id: 'prod-oneplus12',
    name: 'OnePlus 12 5G Flagship',
    brand: 'OnePlus',
    badge: 'SPEED MONSTER',
    storage: '256GB · 512GB (16GB RAM)',
    condition: 'Brand New Sealed · Official OnePlus India Warranty',
    price: '₹64,999',
    rawPrice: 64999,
    emi: 'From ₹2,708/mo with 0% EMI',
    availability: 'In Stock',
    display: '6.82" 2K 120Hz ProXDR 4500-nit Display',
    processor: 'Snapdragon 8 Gen 3 · Cryo-velocity VC',
    camera: '50MP Sony LYT-808 Hasselblad Camera',
    battery: '5400 mAh · 100W SUPERVOOC + 50W AIRVOOC',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80&auto=format&fit=crop',
    category: 'flagship'
  },
  {
    id: 'prod-pixel9pro',
    name: 'Google Pixel 9 Pro XL',
    brand: 'Google',
    badge: 'GEMINI AI PRO',
    storage: '128GB · 256GB · 512GB',
    condition: 'Brand New Sealed · 1-Yr Official Google Warranty',
    price: '₹1,24,999',
    rawPrice: 124999,
    emi: 'From ₹5,208/mo with 0% EMI',
    availability: 'In Stock',
    display: '6.8" Super Actua OLED 1-120Hz (3000 nits)',
    processor: 'Google Tensor G4 + Titan M2 Security',
    camera: '50MP Main + 48MP Ultra-Wide + 48MP 5x Telephoto',
    battery: '5060 mAh · 37W Fast Charging · 7 Years OS Updates',
    image: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&q=80&auto=format&fit=crop',
    category: 'flagship'
  },
  {
    id: 'prod-edge50pro',
    name: 'Motorola Edge 50 Pro 5G',
    brand: 'Motorola',
    badge: 'BEST VALUE 5G',
    storage: '256GB (12GB RAM)',
    condition: 'Brand New Sealed · Official Motorola Warranty',
    price: '₹31,999',
    rawPrice: 31999,
    emi: 'From ₹1,333/mo with 0% EMI',
    availability: 'In Stock',
    display: '6.7" 1.5K 144Hz True Color Curved pOLED',
    processor: 'Snapdragon 7 Gen 3 5G',
    camera: '50MP AI Ultra-Pixel Camera with OIS',
    battery: '4500 mAh · 125W TurboPower (Full in 18 mins)',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop',
    category: 'budget5g'
  },
  {
    id: 'prod-vivox100pro',
    name: 'Vivo X100 Pro Zeiss Edition',
    brand: 'Vivo',
    badge: 'ZEISS 1-INCH SENSOR',
    storage: '512GB (16GB RAM)',
    condition: 'Brand New Sealed · Official Vivo India Warranty',
    price: '₹89,999',
    rawPrice: 89999,
    emi: 'From ₹3,749/mo with 0% EMI',
    availability: 'In Stock',
    display: '6.78" 1.5K 120Hz 8T LTPO Eye-Care AMOLED',
    processor: 'MediaTek Dimensity 9300 Flagship (4nm)',
    camera: '50MP 1-inch Sony IMX989 + Zeiss APO Telephoto',
    battery: '5400 mAh · 100W FlashCharge + 50W Wireless',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80&auto=format&fit=crop',
    category: 'flagship'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Smartphones' },
  { id: 'apple', label: 'Apple iPhone' },
  { id: 'samsung', label: 'Samsung Galaxy' },
  { id: 'flagship', label: 'Flagships & Pro' },
  { id: 'budget5g', label: 'Curved & Value 5G' }
];

interface HorizontalProductShowroomProps {
  onOpenCinema?: (media: MediaItem) => void;
}

export const HorizontalProductShowroom: React.FC<HorizontalProductShowroomProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'runway'>('grid');
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor, isMobile } = useCursor();

  const filteredProducts = CATALOG_PRODUCTS.filter((prod) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'apple') return prod.brand === 'Apple';
    if (selectedCategory === 'samsung') return prod.brand === 'Samsung';
    if (selectedCategory === 'flagship') return prod.category === 'flagship' || prod.brand === 'Apple' || prod.brand === 'Samsung';
    if (selectedCategory === 'budget5g') return prod.category === 'budget5g';
    return true;
  });

  const handleScrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <section id="phones" className="relative py-20 lg:py-24 bg-[#072D33]/45 overflow-hidden border-t border-[rgba(155,188,171,0.20)]">
      {/* Background Parallax Layer */}
      <SectionParallaxBg variant="jade" glowPosition="top-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#DFBE8B] px-3 py-1.5 rounded-lg bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)]">
              <Smartphone className="w-3.5 h-3.5 text-[#DFBE8B]" />
              <span>OFFICIAL PRODUCT CATALOGUE · JANDIALA GURU SHOWROOM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight uppercase leading-tight">
              CERTIFIED SMARTPHONE INVENTORY
            </h2>

            <p className="text-sm sm:text-base text-[#E2EAE6] leading-relaxed">
              Scan genuine sealed models available directly on our counter. 100% Indian retail stock
              backed by official brand warranties, verified GST tax invoices, and instant 0% EMI financing.
            </p>
          </div>

          {/* Controls: View Mode Toggle & Horizontal Scroll Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-[rgba(7,45,51,0.9)] border border-[rgba(155,188,171,0.25)]">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#DFBE8B] text-[#072D33] shadow-sm'
                    : 'text-[#C8D8D0] hover:text-[#F5F2EA]'
                }`}
                aria-label="Grid View"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid View</span>
              </button>

              <button
                onClick={() => setViewMode('runway')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'runway'
                    ? 'bg-[#DFBE8B] text-[#072D33] shadow-sm'
                    : 'text-[#C8D8D0] hover:text-[#F5F2EA]'
                }`}
                aria-label="Runway Carousel View"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Runway</span>
              </button>
            </div>

            {viewMode === 'runway' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleScrollLeft}
                  className="p-2.5 rounded-xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] text-[#C8D8D0] hover:text-[#DFBE8B] hover:border-[#DFBE8B] transition-all"
                  aria-label="Scroll products left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleScrollRight}
                  className="p-2.5 rounded-xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] text-[#C8D8D0] hover:text-[#DFBE8B] hover:border-[#DFBE8B] transition-all"
                  aria-label="Scroll products right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#DFBE8B] text-[#072D33] border-[#DFBE8B] shadow-md shadow-[#DFBE8B]/20'
                    : 'bg-[rgba(7,45,51,0.7)] text-[#C8D8D0] border-[rgba(155,188,171,0.25)] hover:text-[#F5F2EA] hover:bg-[#3A7564]/30'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Container (Grid or Runway) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isMobile={isMobile}
                setCursor={setCursor}
                resetCursor={resetCursor}
              />
            ))}
          </div>
        ) : (
          <div
            ref={scrollTrackRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none no-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="snap-start shrink-0 w-[300px] sm:w-[350px]">
                <ProductCard
                  product={prod}
                  isMobile={isMobile}
                  setCursor={setCursor}
                  resetCursor={resetCursor}
                />
              </div>
            ))}
          </div>
        )}

        {/* Quick In-Store Guarantee Bar */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[rgba(7,45,51,0.75)] border border-[rgba(155,188,171,0.25)] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6 text-[#E2EAE6]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3A7564]" />
              <span className="font-semibold">100% Factory Sealed Indian Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3A7564]" />
              <span className="font-semibold">Free On-Counter Data Transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3A7564]" />
              <span className="font-semibold">Instant 0% Interest EMI with Aadhaar</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[#C8D8D0]">Need a specific variant?</span>
            <a
              href={`https://wa.me/${storeConfig.STORE_RAW_PHONE}?text=${encodeURIComponent('Hi Josan Mobile, I am looking for a specific phone model and color variant.')}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#DFBE8B] font-bold underline hover:text-[#F5F2EA]"
            >
              Ask on WhatsApp &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: CatalogProduct;
  isMobile: boolean;
  setCursor: (type: CursorState, text?: string) => void;
  resetCursor: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isMobile,
  setCursor,
  resetCursor
}) => {
  const whatsappUrl = `https://wa.me/${storeConfig.STORE_RAW_PHONE}?text=${encodeURIComponent(
    `Hi Josan Mobile! I am interested in checking stock and best counter price for: ${product.name} (${product.storage}) priced at ${product.price}.`
  )}`;

  return (
    <div
      onMouseEnter={() => {
        if (!isMobile) setCursor('product', 'INQUIRE');
      }}
      onMouseLeave={() => {
        if (!isMobile) resetCursor();
      }}
      className="rounded-2xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.25)] hover:border-[#DFBE8B]/70 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#072D33]/80 group relative backdrop-blur-sm"
    >
      {/* Top Product Photography Showcase */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-[#0B3A42] to-[#072D33] overflow-hidden p-3 flex items-center justify-center">
        {/* Soft Ambient Light Halo */}
        <div className="absolute inset-0 bg-radial from-[#DFBE8B]/12 via-transparent to-transparent opacity-80 pointer-events-none" />

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback gracefully if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Top Floating Tags */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-[rgba(7,45,51,0.95)] border border-[rgba(155,188,171,0.3)] text-[#DFBE8B] shadow-md">
            {product.badge}
          </span>

          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[rgba(51,9,27,0.9)] border border-[rgba(143,92,100,0.4)] text-[#DFBE8B]">
            {product.brand}
          </span>
        </div>

        {/* Bottom Availability Status Indicator */}
        <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[rgba(7,45,51,0.9)] border border-[rgba(155,188,171,0.25)] text-[10px] font-semibold text-[#E2EAE6]">
          <span className="w-2 h-2 rounded-full bg-[#3A7564] animate-pulse" />
          <span>{product.availability}</span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Model Name & Price */}
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-[#F5F0E6] group-hover:text-[#DFBE8B] transition-colors line-clamp-1">
              {product.name}
            </h3>

            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xl font-black font-mono text-[#DFBE8B]">
                {product.price}
              </span>
              <span className="text-[11px] font-mono font-medium text-[#9ABCAB]">
                {product.emi}
              </span>
            </div>
          </div>

          {/* Storage & Condition (Easy to scan!) */}
          <div className="pt-2 border-t border-[rgba(155,188,171,0.18)] space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[#E2EAE6]">
              <span className="text-[#9ABCAB] font-mono text-[11px] uppercase">Storage:</span>
              <span className="font-bold text-[#F5F2EA]">{product.storage}</span>
            </div>

            <div className="flex items-center justify-between text-[#E2EAE6]">
              <span className="text-[#9ABCAB] font-mono text-[11px] uppercase">Condition:</span>
              <span className="font-semibold text-[#DFBE8B] text-right line-clamp-1">{product.condition}</span>
            </div>
          </div>

          {/* Specifications Matrix */}
          <div className="p-2.5 rounded-xl bg-[rgba(4,27,31,0.7)] border border-[rgba(155,188,171,0.15)] space-y-1 text-[11px] text-[#C8D8D0]">
            <div className="line-clamp-1">
              <strong className="text-[#DFBE8B]">Display:</strong> {product.display}
            </div>
            <div className="line-clamp-1">
              <strong className="text-[#DFBE8B]">Chip:</strong> {product.processor}
            </div>
            <div className="line-clamp-1">
              <strong className="text-[#DFBE8B]">Camera:</strong> {product.camera}
            </div>
          </div>
        </div>

        {/* Dual Actions: WhatsApp Inquiry & Call Counter */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#DFBE8B] hover:bg-[#F5F0E6] text-[#072D33] text-xs font-bold transition-all shadow-md shadow-[#DFBE8B]/20"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

          <a
            href={`tel:${storeConfig.STORE_RAW_PHONE}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[rgba(7,45,51,0.9)] hover:bg-[#3A7564] border border-[rgba(155,188,171,0.3)] text-[#F5F2EA] text-xs font-bold transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#DFBE8B] shrink-0" />
            <span className="truncate">Call Store</span>
          </a>
        </div>
      </div>
    </div>
  );
};
