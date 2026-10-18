export type PropertyListingType = 'all' | 'sale' | 'rent' | 'apartment' | 'commercial';

export interface PropertyFeatures {
  bedrooms: number;
  floor: number;
  totalFloors?: number;
  parkingCount: number;
  storage: boolean;
  elevator: boolean;
  balcony?: boolean;
}

export interface PropertyEntity {
  id: string;
  code?: string;
  title: string;
  location: string;
  address?: string;
  priceText: string;
  priceSubtitle?: string; // e.g. "متری ۱۶۰ م"
  rentSubtitle?: string; // e.g. "اجاره: ۳۵ میلیون"
  priceNumericToman?: number;
  areaSqm: number;
  areaTag: string;
  image: string;
  photoCount: number;
  listingType: PropertyListingType;
  features: PropertyFeatures;
  amenitiesChips: string[]; // e.g. ['طبقه ۳', 'پارکینگ سندی', 'آسانسور', 'انباری']
  matchScore: number; // e.g. 94, 88, 82
  matchedClientsText: string; // e.g. "۶ مشتری منطبق", "۳ متقاضی فعال"
  tag?: string;
  exclusiveBadge?: string; // e.g. "انحصاری"
  categoryBadge?: string; // e.g. "موقعیت اداری"
  convertible?: boolean; // e.g. "قابل تبدیل"
  ownerName?: string; // e.g. "آقای فراهانی"
  ownerPhone?: string; // e.g. "۰۹۱۲۵۵۵۶۶۷۷"
  statusBadge: {
    text: string; // e.g. "تازه (امروز)", "نیازمند استعلام (۱۶ روز)", "تازه و معتبر"
    type: 'fresh' | 'warning' | 'normal';
  };
  statusCategory: 'fresh' | 'inquiry' | 'archived';
  status: 'active' | 'reserved' | 'sold';
  hasWarningAccent?: boolean; // For orange/amber border card
  ctaType: 'view_and_buyers' | 'inquiry_call' | 'view';
  createdAt: string;
}

export interface CreatePropertyInput {
  title: string;
  location: string;
  priceText: string;
  priceSubtitle?: string;
  areaSqm?: number;
  listingType?: PropertyListingType;
  bedrooms?: number;
  floor?: number;
  clientName?: string;
  ownerName?: string;
}

export interface PropertyFilterQuery {
  listingType?: PropertyListingType;
  statusCategory?: 'all' | 'fresh' | 'inquiry' | 'archived';
  searchQuery?: string;
  location?: string;
}
