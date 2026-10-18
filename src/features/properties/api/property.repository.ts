import luxuryApartmentImage from '@/src/assets/images/luxury_apartment_saadat_abad_1791330057482.jpg';
import kitchenApartmentImage from '@/src/assets/images/modern_apartment_kitchen_1791898994580.jpg';
import officeInteriorImage from '@/src/assets/images/modern_office_interior_1791899014936.jpg';

import { PropertyEntity, CreatePropertyInput, PropertyFilterQuery } from '../types/property.types';
import { toPersianDigits } from '@/src/core/utils/persianNumbers';

export interface IPropertyRepository {
  getAll(filter?: PropertyFilterQuery): Promise<PropertyEntity[]>;
  getById(id: string): Promise<PropertyEntity | null>;
  create(input: CreatePropertyInput): Promise<PropertyEntity>;
  delete(id: string): Promise<boolean>;
  subscribe(listener: () => void): () => void;
}

const INITIAL_PROPERTIES: PropertyEntity[] = [
  {
    id: 'prop-1',
    code: 'AML-140',
    title: 'آپارتمان ۱۴۰ متری، ۳ خواب - سعادت‌آباد',
    exclusiveBadge: 'انحصاری',
    statusBadge: {
      text: 'تازه (امروز)',
      type: 'fresh',
    },
    location: 'میدان کاج، صراف‌های شمالی',
    address: 'سعادت‌آباد، میدان کاج، صراف‌های شمالی، نبش کوچه بیست و هفتم',
    priceText: '۲۲٫۵ میلیارد تومان',
    priceSubtitle: 'متری ۱۶۰ م',
    priceNumericToman: 22500000000,
    areaSqm: 140,
    areaTag: '۱۴۰ م',
    image: luxuryApartmentImage,
    photoCount: 4,
    listingType: 'sale',
    features: {
      bedrooms: 3,
      floor: 3,
      parkingCount: 1,
      storage: true,
      elevator: true,
      balcony: true,
    },
    amenitiesChips: ['طبقه ۳', 'پارکینگ سندی', 'آسانسور', 'انباری'],
    matchScore: 94,
    matchedClientsText: '۶ مشتری منطبق',
    ctaType: 'view_and_buyers',
    statusCategory: 'fresh',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-2',
    code: 'AML-95',
    title: 'آپارتمان ۹۵ متری، ۲ خواب - شهرک غرب',
    hasWarningAccent: true,
    statusBadge: {
      text: 'نیازمند استعلام (۱۶ روز)',
      type: 'warning',
    },
    convertible: true,
    location: 'شهرک غرب، فاز ۲',
    address: 'شهرک غرب، فاز ۲، خیابان هرمزان، مجتمع گل‌ها',
    priceText: 'رهن کامل: ۲ میلیارد',
    priceNumericToman: 2000000000,
    areaSqm: 95,
    areaTag: '۹۵ م',
    image: kitchenApartmentImage,
    photoCount: 6,
    listingType: 'rent',
    features: {
      bedrooms: 2,
      floor: 2,
      parkingCount: 1,
      storage: true,
      elevator: true,
    },
    amenitiesChips: ['طبقه ۲', 'انباری بزرگ', 'بازسازی کامل'],
    ownerName: 'آقای فراهانی',
    ownerPhone: '۰۹۱۲۵۵۵۶۶۷۷',
    matchScore: 88,
    matchedClientsText: '۳ متقاضی فعال',
    ctaType: 'inquiry_call',
    statusCategory: 'inquiry',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-3',
    code: 'AML-80',
    title: 'اداری ۸۰ متری، ۲ اتاق - میدان شهرداری',
    categoryBadge: 'موقعیت اداری',
    statusBadge: {
      text: 'تازه و معتبر',
      type: 'fresh',
    },
    location: 'سرو غربی، نبش شهرداری',
    address: 'سعادت‌آباد، سرو غربی، نبش شهرداری، ساختمان اداری نگین',
    priceText: 'رهن: ۵۰۰ م',
    rentSubtitle: 'اجاره: ۳۵ میلیون',
    priceNumericToman: 500000000,
    areaSqm: 80,
    areaTag: '۸۰ م',
    image: officeInteriorImage,
    photoCount: 3,
    listingType: 'commercial',
    features: {
      bedrooms: 2,
      floor: 4,
      parkingCount: 2,
      storage: true,
      elevator: true,
    },
    amenitiesChips: ['پارکینگ مراجع', 'لابی‌من ۲۴ ساعته', 'آسانسور'],
    matchScore: 82,
    matchedClientsText: '۲ متقاضی فعال',
    ctaType: 'view',
    statusCategory: 'fresh',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

class InMemoryPropertyRepository implements IPropertyRepository {
  private properties: PropertyEntity[] = [...INITIAL_PROPERTIES];
  private listeners: Set<() => void> = new Set();

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  async getAll(filter?: PropertyFilterQuery): Promise<PropertyEntity[]> {
    let result = [...this.properties];

    if (filter?.searchQuery) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.priceText.toLowerCase().includes(q) ||
          p.amenitiesChips.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (filter?.listingType && filter.listingType !== 'all') {
      result = result.filter((p) => {
        if (filter.listingType === 'apartment') {
          return p.title.includes('آپارتمان');
        }
        return p.listingType === filter.listingType;
      });
    }

    if (filter?.statusCategory && filter.statusCategory !== 'all') {
      result = result.filter((p) => p.statusCategory === filter.statusCategory);
    }

    if (filter?.location) {
      result = result.filter((p) => p.location.includes(filter.location!));
    }

    return result;
  }

  async getById(id: string): Promise<PropertyEntity | null> {
    const item = this.properties.find((p) => p.id === id);
    return item ? { ...item } : null;
  }

  async create(input: CreatePropertyInput): Promise<PropertyEntity> {
    const area = input.areaSqm || 120;
    const newProperty: PropertyEntity = {
      id: `prop-${Date.now()}`,
      code: `AML-${Math.floor(100 + Math.random() * 900)}`,
      title: input.title,
      location: input.location || 'سعادت‌آباد',
      address: `${input.location}، نشانی ثبت شده در سامانه`,
      priceText: input.priceText,
      priceSubtitle: input.priceSubtitle || '',
      areaSqm: area,
      areaTag: `${toPersianDigits(area)} م`,
      image: luxuryApartmentImage,
      photoCount: 4,
      listingType: input.listingType || 'sale',
      features: {
        bedrooms: input.bedrooms || 2,
        floor: input.floor || 2,
        parkingCount: 1,
        storage: true,
        elevator: true,
      },
      amenitiesChips: ['پارکینگ سندی', 'آسانسور', 'انباری'],
      matchScore: 92,
      matchedClientsText: '۴ مشتری منطبق',
      statusBadge: {
        text: 'تازه (امروز)',
        type: 'fresh',
      },
      statusCategory: 'fresh',
      status: 'active',
      ctaType: 'view_and_buyers',
      ownerName: input.ownerName || 'مالک جدید',
      createdAt: new Date().toISOString(),
    };

    this.properties.unshift(newProperty);
    this.notify();
    return newProperty;
  }

  async delete(id: string): Promise<boolean> {
    const initialLen = this.properties.length;
    this.properties = this.properties.filter((p) => p.id !== id);
    const deleted = this.properties.length < initialLen;
    if (deleted) {
      this.notify();
    }
    return deleted;
  }
}

// Singleton repository instance
export const propertyRepository: IPropertyRepository = new InMemoryPropertyRepository();
