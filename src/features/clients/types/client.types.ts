export type ClientLeadStatus = 'all' | 'hot' | 'warm' | 'cold' | 'deal';

export interface ClientEntity {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  category: string; // e.g. "خریدار مسکونی", "رهن و اجاره اداری", "سرمایه‌گذار ملکی", "خریدار خانه اولی"
  phone: string;
  statusBadge: {
    text: string; // "مشتری داغ", "در خطر رکود", "مشتری گرم", "در معامله"
    iconType: 'flame' | 'warning' | 'sun' | 'deal';
    colorScheme: 'red' | 'amber' | 'teal';
  };
  statusCategory: 'hot' | 'warm' | 'cold' | 'deal';
  budgetDisplay: string; // "۲۰ تا ۲۵ م.ت", "۲ م رهن / ۶۰ م اجاره", "۵۰۰ میلیارد تومان", "۹ تا ۱۱ م.ت"
  preferredLocations: string; // "سعادت‌آباد، شهرک غرب", "جردن، ونک اداری", "الهیه، ولنجک", "پونک، جنت‌آباد"
  areaDisplay: string; // "۱۲۰-۱۵۰ م", "۹۰-۱۱۰ م", "۲۰۰۰+ متر", "۸۰-۱۰۰ م"
  matchesCount: number; // 3, 2, 4, 1
  bestMatchScore: number; // 94, 85, 88, 91
  nextFollowUp: {
    text: string; // "امروز ۱۷:۰۰ - تماس هماهنگی", "۳ روز عقب‌افتاده - تجدید نیاز", "فردا ۱۰:۰۰ - ارائه فایل", "فردا ۱۱:۰۰ - بازدید نهایی"
    isOverdue?: boolean;
    timeText?: string;
  };
  notes?: string;
  preferredBedrooms?: number;
}
