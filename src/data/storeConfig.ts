/**
 * Josan Computer & Mobile - Business Configuration
 * 
 * Strict Single Source of Truth for verified store data.
 * All information here is confirmed from verified store records.
 * Unverified statistics and claims are strictly excluded.
 */

export const STORE_NAME = 'Josan Computer & Mobile';
export const STORE_SHORT_NAME = 'Josan Mobile';
export const STORE_TAGLINE = 'Your Next Phone. Your Next Experience.';

// Physical location & contact
export const STORE_ADDRESS = 'Verowal Road, Near Hakk Computer, Jandiala Guru, Punjab 143115';
export const STORE_PHONE = '+91 94177 65441';
export const STORE_RAW_PHONE = '9417765441';
export const STORE_WHATSAPP = 'https://wa.me/919417765441?text=Hi%20Josan%20Computer%20%26%20Mobile%2C%20I%20am%20interested%20in%20visiting%20your%20showroom!';
export const STORE_INSTAGRAM = 'https://instagram.com/josan_computer_mobile';
export const STORE_GOOGLE_MAPS = 'https://maps.google.com/?q=Josan+Computer+and+Mobile+Punjab';

// Verified Google Rating (Verified store listing: 5.0 ★, 1 Review)
export const STORE_RATING = 5.0;
export const STORE_REVIEW_COUNT = 1;

export const STORE_OPENING_HOURS = {
  days: 'Monday – Sunday',
  hours: '10:00 AM – 9:00 PM',
  isOpenSevenDays: true
};

// Verified in-store services offered
export const STORE_SERVICES = [
  'New Smartphone Sales (Apple, Samsung, OnePlus, Vivo, Oppo, Xiaomi)',
  'Certified In-Store Device Unboxing & Transfer',
  'Professional Chip-Level Hardware & Display Repair Lab',
  'Original Audio, Charging & Protective Accessories',
  'Direct In-Store Counter Assistance & Billing'
];

// Factual, verified highlights (zero exaggerated numbers or unverified claims)
export const STORE_HIGHLIGHTS = [
  { value: '5.0 ★', label: 'Google Rating (1 Review)' },
  { value: '100%', label: 'Genuine Billing' },
  { value: 'LIVE', label: 'In-Store Unboxings' },
  { value: 'DIRECT', label: 'Counter Lab Support' }
];

export const storeConfig = {
  STORE_NAME,
  STORE_SHORT_NAME,
  STORE_TAGLINE,
  STORE_ADDRESS,
  STORE_PHONE,
  STORE_RAW_PHONE,
  STORE_WHATSAPP,
  STORE_INSTAGRAM,
  STORE_GOOGLE_MAPS,
  STORE_RATING,
  STORE_REVIEW_COUNT,
  STORE_OPENING_HOURS,
  STORE_SERVICES,
  STORE_HIGHLIGHTS
};

export default storeConfig;
