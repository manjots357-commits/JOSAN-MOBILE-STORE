/**
 * Central Media Configuration for Josan Computer & Mobile
 * Deep Jade + Champagne + Burgundy + Sage Luxury Palette
 */

import {
  STORE_NAME,
  STORE_SHORT_NAME,
  STORE_TAGLINE,
  STORE_ADDRESS,
  STORE_PHONE,
  STORE_RAW_PHONE,
  STORE_WHATSAPP,
  STORE_GOOGLE_MAPS,
  STORE_OPENING_HOURS,
  STORE_HIGHLIGHTS
} from './storeConfig';

export interface MediaItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'store' | 'customer' | 'product' | 'delivery' | 'reel';
  mp4Url: string;
  webmUrl?: string;
  fallbackUrl?: string;
  poster: string;
  aspectRatio: '16:9' | '9:16' | '4:3' | '1:1';
  duration: string;
  soldDevice?: string;
  customerLabel?: 'REAL CUSTOMER' | 'DEVICE DELIVERED' | 'PURCHASE COMPLETED';
  specs?: string;
  price?: string;
  description?: string;
  tags?: string[];
}

// Inline optimized SVG posters in Deep Jade + Champagne + Burgundy luxury palette
const SVG_POSTERS = {
  hero: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
      <defs>
        <radialGradient id="heroJade" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#0B3A42"/>
          <stop offset="50%" stop-color="#072D33"/>
          <stop offset="100%" stop-color="#031619"/>
        </radialGradient>
        <linearGradient id="champagneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#DFBE8B"/>
          <stop offset="100%" stop-color="#F5E5C9"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#heroJade)"/>
      <circle cx="640" cy="360" r="280" fill="#3A7564" opacity="0.12" filter="blur(70px)"/>
      <circle cx="900" cy="200" r="180" fill="#8F5C64" opacity="0.1" filter="blur(60px)"/>
      <!-- Glass Display Shelves -->
      <rect x="140" y="200" width="1000" height="8" fill="rgba(155, 188, 171, 0.2)" rx="4"/>
      <rect x="140" y="380" width="1000" height="8" fill="rgba(155, 188, 171, 0.2)" rx="4"/>
      <rect x="140" y="560" width="1000" height="8" fill="rgba(155, 188, 171, 0.2)" rx="4"/>
      <!-- Smartphone boxes representation -->
      <g fill="rgba(7, 45, 51, 0.85)" stroke="rgba(155, 188, 171, 0.3)" stroke-width="1.5">
        <rect x="180" y="110" width="65" height="90" rx="6"/>
        <rect x="270" y="110" width="65" height="90" rx="6"/>
        <rect x="360" y="110" width="65" height="90" rx="6"/>
        <rect x="450" y="110" width="65" height="90" rx="6"/>
        <rect x="540" y="110" width="65" height="90" rx="6"/>
        <rect x="630" y="110" width="65" height="90" rx="6"/>
        <rect x="720" y="110" width="65" height="90" rx="6"/>
        <rect x="810" y="110" width="65" height="90" rx="6"/>
        <rect x="900" y="110" width="65" height="90" rx="6"/>
        <rect x="990" y="110" width="65" height="90" rx="6"/>
      </g>
      <text x="640" y="310" font-family="sans-serif" font-weight="800" font-size="34" fill="#F5F2EA" text-anchor="middle" letter-spacing="4">JOSAN COMPUTER &amp; MOBILE</text>
      <text x="640" y="355" font-family="sans-serif" font-weight="600" font-size="16" fill="url(#champagneGrad)" text-anchor="middle" letter-spacing="2">AUTHENTIC TECH SHOWROOM &bull; PUNJAB</text>
      <text x="640" y="440" font-family="sans-serif" font-size="14" fill="#C8D8D0" text-anchor="middle">Samsung &bull; Apple iPhone &bull; Vivo &bull; Motorola &bull; OnePlus &bull; 0% EMI</text>
    </svg>
  `)}`,
  storeTour: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
      <rect width="1280" height="720" fill="#072D33"/>
      <radialGradient id="storeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#3A7564" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#072D33" stop-opacity="1"/>
      </radialGradient>
      <rect width="1280" height="720" fill="url(#storeGlow)"/>
      <rect x="340" y="200" width="600" height="300" rx="20" fill="rgba(7, 45, 51, 0.75)" stroke="rgba(223, 190, 139, 0.35)" stroke-width="2"/>
      <text x="640" y="320" font-family="sans-serif" font-weight="800" font-size="36" fill="#DFBE8B" text-anchor="middle" letter-spacing="3">STORE WALKTHROUGH</text>
      <text x="640" y="370" font-family="sans-serif" font-weight="600" font-size="18" fill="#F5F2EA" text-anchor="middle">LIVE DISPLAY COUNTERS &amp; GIFT PACKS</text>
      <text x="640" y="420" font-family="sans-serif" font-size="14" fill="#C8D8D0" text-anchor="middle">Josan Mobile Store &bull; Ph: 9417765441</text>
    </svg>
  `)}`,
  fold6: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280">
      <rect width="720" height="1280" fill="#072D33"/>
      <radialGradient id="foldGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#3A7564" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#072D33" stop-opacity="1"/>
      </radialGradient>
      <rect width="720" height="1280" fill="url(#foldGlow)"/>
      <rect x="180" y="340" width="360" height="420" rx="20" fill="rgba(7, 45, 51, 0.8)" stroke="#DFBE8B" stroke-width="2"/>
      <line x1="360" y1="340" x2="360" y2="760" stroke="#9ABCAB" stroke-width="2" stroke-dasharray="8 4"/>
      <circle cx="360" cy="200" r="60" fill="#DFBE8B" opacity="0.25"/>
      <text x="360" y="208" font-family="sans-serif" font-weight="bold" font-size="22" fill="#DFBE8B" text-anchor="middle">JOSAN</text>
      <text x="360" y="860" font-family="sans-serif" font-weight="800" font-size="34" fill="#F5F2EA" text-anchor="middle">SAMSUNG Z FOLD 6</text>
      <rect x="230" y="890" width="260" height="42" rx="21" fill="#DFBE8B"/>
      <text x="360" y="918" font-family="sans-serif" font-weight="800" font-size="18" fill="#33091B" text-anchor="middle">SOLD &amp; DELIVERED &#10004;</text>
      <text x="360" y="970" font-family="sans-serif" font-size="16" fill="#C8D8D0" text-anchor="middle">Real Store Customer Handover</text>
    </svg>
  `)}`,
  iphone16pro: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280">
      <rect width="720" height="1280" fill="#33091B"/>
      <radialGradient id="ipGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#8F5C64" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#33091B" stop-opacity="1"/>
      </radialGradient>
      <rect width="720" height="1280" fill="url(#ipGlow)"/>
      <rect x="220" y="320" width="280" height="520" rx="36" fill="rgba(7, 45, 51, 0.75)" stroke="rgba(223, 190, 139, 0.4)" stroke-width="2.5"/>
      <rect x="245" y="345" width="105" height="105" rx="22" fill="#072D33"/>
      <circle cx="270" cy="375" r="16" fill="#33091B" stroke="#DFBE8B" stroke-width="2"/>
      <circle cx="270" cy="420" r="16" fill="#33091B" stroke="#DFBE8B" stroke-width="2"/>
      <circle cx="315" cy="398" r="16" fill="#33091B" stroke="#DFBE8B" stroke-width="2"/>
      <text x="360" y="930" font-family="sans-serif" font-weight="800" font-size="34" fill="#F5F2EA" text-anchor="middle">16 PRO 512GB SOLD</text>
      <rect x="230" y="960" width="260" height="42" rx="21" fill="#DFBE8B"/>
      <text x="360" y="987" font-family="sans-serif" font-weight="800" font-size="17" fill="#33091B" text-anchor="middle">REAL CUSTOMER UNBOXING &#128077;</text>
      <text x="360" y="1035" font-family="sans-serif" font-size="15" fill="#C8D8D0" text-anchor="middle">Josan Computer &amp; Mobile</text>
    </svg>
  `)}`,
  iphone15pm: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280">
      <rect width="720" height="1280" fill="#072D33"/>
      <rect x="210" y="280" width="300" height="560" rx="38" fill="rgba(7, 45, 51, 0.8)" stroke="#3A7564" stroke-width="2.5"/>
      <text x="360" y="920" font-family="sans-serif" font-weight="800" font-size="32" fill="#F5F2EA" text-anchor="middle">15 PRO MAX 256GB SOLD</text>
      <rect x="230" y="950" width="260" height="40" rx="20" fill="#DFBE8B"/>
      <text x="360" y="977" font-family="sans-serif" font-weight="800" font-size="16" fill="#33091B" text-anchor="middle">DEVICE DELIVERED &#10004;</text>
      <text x="360" y="1030" font-family="sans-serif" font-size="15" fill="#C8D8D0" text-anchor="middle">Josan Mobile Store &bull; 9417765441</text>
    </svg>
  `)}`,
  iphone16done: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280">
      <rect width="720" height="1280" fill="#072D33"/>
      <rect x="230" y="310" width="260" height="500" rx="34" fill="rgba(7, 45, 51, 0.75)" stroke="rgba(155, 188, 171, 0.3)" stroke-width="2"/>
      <text x="360" y="880" font-family="sans-serif" font-weight="800" font-size="34" fill="#DFBE8B" text-anchor="middle">IPHONE 16 DELIVERED &#9996;</text>
      <text x="360" y="930" font-family="sans-serif" font-weight="700" font-size="18" fill="#F5F2EA" text-anchor="middle">JOSAN COMPUTER &amp; MOBILE</text>
      <text x="360" y="970" font-family="sans-serif" font-weight="700" font-size="22" fill="#9ABCAB" text-anchor="middle">&#128222; 9417765441</text>
      <text x="360" y="1020" font-family="sans-serif" font-size="15" fill="#C8D8D0" text-anchor="middle">Punjab's Premier Mobile Destination</text>
    </svg>
  `)}`
};

// Verified working public sample video stream (prevents 403 Forbidden errors)
const SAMPLE_MP4 = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

// Hero Video (Only 1 optimized video loaded on first view)
export const heroVideo: MediaItem = {
  id: 'hero-cinematic',
  title: 'Josan Computer & Mobile Flagship Showroom',
  subtitle: 'YOUR NEXT PHONE. YOUR NEXT EXPERIENCE.',
  category: 'store',
  mp4Url: SAMPLE_MP4,
  poster: SVG_POSTERS.hero,
  aspectRatio: '16:9',
  duration: '0:27',
  description: 'Step into Punjab’s futuristic technology destination. Brand-new smartphones, transparent pricing, certified warranty, and Diwali festival gift hampers.',
  tags: ['Showroom', 'Flagship', 'Live Tour']
};

export const storeVideos: MediaItem[] = [
  {
    id: 'store-diwali-2025',
    title: 'Showroom Walkthrough & Festive VIP Gift Packages',
    subtitle: 'Free Luxury Gift Worth Up To ₹2,000/- With Every Phone',
    category: 'store',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.storeTour,
    aspectRatio: '16:9',
    duration: '0:27',
    description: 'Full store walkthrough featuring stacked festive gift hampers, ribbon-wrapped smartphone shelves, and authorized Vivo & iPhone counters.',
    tags: ['Diwali Special', 'Gift Pack ₹2000', 'Store Tour']
  },
  {
    id: 'store-counter-tour',
    title: 'Flagship Glass Counter & Display Pavilion',
    subtitle: 'Vivo, Apple, Samsung, Poco, Redmi & Motorola In Stock',
    category: 'store',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.hero,
    aspectRatio: '16:9',
    duration: '0:18',
    description: 'Ready stock available for immediate unboxing. Genuine products with official in-store billing.',
    tags: ['Live Stock', 'In-Store Billing', 'Smartphones']
  },
  {
    id: 'store-evening-front',
    title: 'Josan Computer & Mobile Storefront & Service Hub',
    subtitle: 'Call & WhatsApp Support: +91 94177 65441',
    category: 'store',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.iphone16done,
    aspectRatio: '16:9',
    duration: '0:15',
    description: 'Expert mobile repair, instant unlocking, genuine display replacement, and gadget exchange desk.',
    tags: ['Service', 'Repair', 'Exchange']
  }
];

export const customerVideos: MediaItem[] = [
  {
    id: 'cust-fold6',
    title: 'Samsung Galaxy Z Fold 6 Handover Celebration',
    subtitle: 'Delivered to customer in store with verified GST invoice',
    category: 'customer',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.fold6,
    aspectRatio: '9:16',
    duration: '0:13',
    soldDevice: 'Samsung Galaxy Z Fold 6',
    customerLabel: 'PURCHASE COMPLETED',
    specs: '512GB Phantom Black · Foldable AMOLED 120Hz',
    description: 'Delivering the sealed flagship Samsung Fold 6 to our customer with live setup and accessories.',
    tags: ['Samsung Z Fold 6', 'Customer Handover']
  },
  {
    id: 'cust-16pro-512',
    title: 'iPhone 16 Pro 512GB Fresh Unboxing',
    subtitle: 'Customer thumbs up & instant first boot on counter',
    category: 'customer',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.iphone16pro,
    aspectRatio: '9:16',
    duration: '0:19',
    soldDevice: 'iPhone 16 Pro 512GB',
    customerLabel: 'REAL CUSTOMER',
    specs: '512GB Natural Titanium · A18 Pro Bionic',
    description: 'Delighted customer peeling the seal off his brand-new 16 Pro at the Josan main counter with 1-year warranty.',
    tags: ['iPhone 16 Pro', 'Unboxing', '512GB']
  },
  {
    id: 'cust-15pm-256',
    title: 'iPhone 15 Pro Max 256GB Handover',
    subtitle: 'Official Apple warranty verification & accessories pack',
    category: 'customer',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.iphone15pm,
    aspectRatio: '9:16',
    duration: '0:11',
    soldDevice: 'iPhone 15 Pro Max 256GB',
    customerLabel: 'DEVICE DELIVERED',
    specs: '256GB Blue Titanium · Super Retina XDR',
    description: 'Customer receiving sealed Blue Titanium 15 Pro Max box with store team in Jandiala Guru.',
    tags: ['15 Pro Max', 'Delivered', 'Blue Titanium']
  },
  {
    id: 'cust-16-plus',
    title: 'iPhone 16 Delivery & Data Transfer',
    subtitle: 'Instant data transfer & free tempered glass applied',
    category: 'customer',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.iphone16done,
    aspectRatio: '9:16',
    duration: '0:20',
    soldDevice: 'iPhone 16 Teal 256GB',
    customerLabel: 'PURCHASE COMPLETED',
    specs: '256GB Teal · A18 Bionic · Camera Control',
    description: 'Celebrating another satisfied customer walking out with brand-new certified iPhone and festive gift hamper.',
    tags: ['iPhone 16', 'Josan Mobile', '9417765441']
  }
];

export const productVideos: MediaItem[] = [
  {
    id: 'prod-fold6',
    title: 'Samsung Galaxy Z Fold 6 5G',
    subtitle: 'Ultra-slim hinge with immersive 7.6" Dynamic AMOLED 2X',
    category: 'product',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.fold6,
    aspectRatio: '16:9',
    duration: '0:30',
    specs: '12GB RAM · 512GB Storage · Snapdragon 8 Gen 3',
    price: '₹1,54,999',
    description: 'Flagship productivity device. Multitask with 3 apps side by side, S-Pen precision, and armor aluminum chassis.',
    tags: ['Foldable', 'Flagship', '512GB']
  },
  {
    id: 'prod-16pro',
    title: 'Apple iPhone 16 Pro & Pro Max',
    subtitle: 'Titanium chassis, 48MP Fusion camera, A18 Pro chip',
    category: 'product',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.iphone16pro,
    aspectRatio: '16:9',
    duration: '0:30',
    specs: 'A18 Pro Bionic · 256GB / 512GB · 120Hz ProMotion',
    price: '₹1,19,900',
    description: 'Photography powerhouse with Camera Control, 4K 120fps Dolby Vision, and all-day battery stamina.',
    tags: ['Apple', 'ProMotion', 'Titanium']
  },
  {
    id: 'prod-flip6',
    title: 'Samsung Galaxy Z Flip 6',
    subtitle: 'Pocket-sized innovation with FlexWindow & 50MP camera',
    category: 'product',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.fold6,
    aspectRatio: '16:9',
    duration: '0:25',
    specs: '8GB RAM · 256GB / 512GB Storage · Galaxy AI',
    price: '₹89,999',
    description: 'Compact foldable powerhouse with FlexCam auto-zoom, IP48 water resistance, and vibrant cover screen.',
    tags: ['Flip 6', 'Compact', 'FlexWindow']
  },
  {
    id: 'prod-edge50pro',
    title: 'Motorola Edge 50 Pro 5G',
    subtitle: 'Pantone-validated 144Hz curved pOLED & 125W TurboCharge',
    category: 'product',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.hero,
    aspectRatio: '16:9',
    duration: '0:20',
    specs: '12GB RAM · 256GB UFS 2.2 · IP68 Water Protection',
    price: '₹31,999',
    description: 'Vegan leather back with handcrafted pearl finish. 0 to 100% in 18 minutes with included 125W charger.',
    tags: ['Motorola', '144Hz', '125W Turbo']
  }
];

export const deliveryVideos: MediaItem[] = [
  ...customerVideos
];

export const instagramVideos: MediaItem[] = [
  {
    id: 'reel-moto-edge50',
    title: 'Moto Edge 50 Sold & Handed Over',
    subtitle: 'Fresh unboxing with 68W charger & protective case',
    category: 'reel',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.iphone16done,
    aspectRatio: '9:16',
    duration: '0:15',
    soldDevice: 'Moto Edge 50 Sold',
    customerLabel: 'DEVICE DELIVERED',
    specs: 'Peacock Green · 256GB'
  },
  {
    id: 'reel-flip6-512',
    title: 'Galaxy Z Flip 6 512GB Sold',
    subtitle: 'Delivered with free Diwali gift package',
    category: 'reel',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.fold6,
    aspectRatio: '9:16',
    duration: '0:14',
    soldDevice: 'Flip 6 512GB Sold',
    customerLabel: 'PURCHASE COMPLETED',
    specs: 'Shadow Gray · 512GB'
  },
  {
    id: 'reel-16pm-256',
    title: 'iPhone 16 Pro Max 256GB Sold',
    subtitle: 'Celebrated delivery with official invoice and setup',
    category: 'reel',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.iphone16pro,
    aspectRatio: '9:16',
    duration: '0:16',
    soldDevice: '16 Pro Max 256GB',
    customerLabel: 'REAL CUSTOMER',
    specs: 'Desert Titanium · 256GB'
  },
  {
    id: 'reel-edge50pro-sold',
    title: 'Moto Edge 50 Pro Sold',
    subtitle: 'Lavender vegan leather edition delivered',
    category: 'reel',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.hero,
    aspectRatio: '9:16',
    duration: '0:12',
    soldDevice: 'Moto Edge 50 Pro Sold',
    customerLabel: 'DEVICE DELIVERED',
    specs: 'Luxe Lavender · 256GB'
  },
  {
    id: 'reel-15pro-256',
    title: 'iPhone 15 Pro 256GB Handover',
    subtitle: 'Certified genuine device with 1-year brand warranty',
    category: 'reel',
    mp4Url: SAMPLE_MP4,
    poster: SVG_POSTERS.iphone15pm,
    aspectRatio: '9:16',
    duration: '0:18',
    soldDevice: '15 Pro 256GB Sold',
    customerLabel: 'PURCHASE COMPLETED',
    specs: 'Natural Titanium · 256GB'
  }
];

// Accessories Data
export interface AccessoryItem {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  specs: string;
  inStock: boolean;
}

export const accessoriesList: AccessoryItem[] = [
  {
    id: 'acc-apple-20w',
    name: 'Apple 20W USB-C Power Adapter',
    category: 'Charging',
    price: '₹1,699',
    originalPrice: '₹1,900',
    specs: 'Official 1-Year Apple Warranty',
    inStock: true
  },
  {
    id: 'acc-magsafe',
    name: 'Apple MagSafe Charger (15W)',
    category: 'Wireless',
    price: '₹3,499',
    originalPrice: '₹4,500',
    specs: 'Fast Magnetic Induction',
    inStock: true
  },
  {
    id: 'acc-samsung-45w',
    name: 'Samsung 45W Super Fast Charger 2.0',
    category: 'Charging',
    price: '₹2,199',
    originalPrice: '₹2,999',
    specs: 'Power Delivery 3.0 PPS',
    inStock: true
  },
  {
    id: 'acc-airpods-pro2',
    name: 'AirPods Pro 2 (USB-C MagSafe)',
    category: 'Audio',
    price: '₹19,990',
    originalPrice: '₹24,900',
    specs: 'Active Noise Cancellation 2x',
    inStock: true
  },
  {
    id: 'acc-watch-ultra',
    name: 'Apple Watch Ultra 2 Titanium',
    category: 'Wearable',
    price: '₹74,900',
    originalPrice: '₹89,900',
    specs: '3000 nits display · GPS+Cellular',
    inStock: true
  },
  {
    id: 'acc-glass-uv',
    name: '9H Curved UV Tempered Glass',
    category: 'Protection',
    price: '₹499',
    originalPrice: '₹999',
    specs: 'Installed Free on Counter',
    inStock: true
  }
];

export const storeInfo = {
  name: STORE_NAME,
  shortName: STORE_SHORT_NAME,
  tagline: STORE_TAGLINE,
  address: STORE_ADDRESS,
  phone: STORE_PHONE,
  rawPhone: STORE_RAW_PHONE,
  whatsappUrl: STORE_WHATSAPP,
  mapsUrl: STORE_GOOGLE_MAPS,
  timings: `${STORE_OPENING_HOURS.days}: ${STORE_OPENING_HOURS.hours}`,
  stats: STORE_HIGHLIGHTS
};
