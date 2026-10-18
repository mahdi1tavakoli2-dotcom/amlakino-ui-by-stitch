import luxuryApartmentImage from '../assets/images/luxury_apartment_saadat_abad_1791330057482.jpg';

export interface UrgentTask {
  id: string;
  name: string;
  phone: string;
  delayText: string;
  timeText: string;
  summary: string;
  propertyInterest: string;
  notes: string;
}

export interface FollowUpItem {
  id: string;
  name: string;
  initials: string;
  roleBadge: string;
  proposal: string;
  phone: string;
  lastContact: string;
  budget?: string;
}

export interface PropertyMatch {
  id: string;
  matchScore: number;
  location: string;
  title: string;
  priceText: string;
  areaTag: string;
  image: string;
  clientName: string;
  clientBudget: string;
  tag: string;
  features: string[];
  bedrooms: number;
  floor: number;
  parkingCount: number;
  storage: boolean;
  elevator: boolean;
  address: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  period: string; // عصر, غروب, صبح
  title: string;
  typeBadge: string;
  badgeColor: 'teal' | 'amber' | 'rose';
  subtitle: string;
  phone?: string;
  location?: string;
  notes?: string;
  type: 'visit' | 'contract';
}

export interface RecentActivity {
  id: string;
  title: string;
  timeAgo: string;
}

export const urgentTaskData: UrgentTask = {
  id: 'urgent-1',
  name: 'آقای رضایی',
  phone: '۰۹۱۲۴۴۵۵۶۷۸',
  delayText: '۲ ساعت تأخیر',
  timeText: '۱۰:۳۰ امروز',
  summary: 'خریدار ۲ خوابه سعادت‌آباد • منتظر تماس نهایی استعلام پارکینگ',
  propertyInterest: 'آپارتمان ۲ خوابه نوساز سعادت‌آباد - متراژ ۱۱۰ تا ۱۳۰ متر',
  notes: 'استعلام اصالت پارکینگ از شهرداری منطقه ۲ تأیید شده و مالک آماده مذاکره نهایی است.',
};

export const followUpsList: FollowUpItem[] = [
  {
    id: 'f-1',
    name: 'خانم دکتر مرادی',
    initials: 'مر',
    roleBadge: 'سرمایه‌گذار',
    proposal: 'پیشنهاد فایل زعفرانیه ۱۶۰ متری',
    phone: '۰۹۱۲۱۱۱۸۸۹۹',
    lastContact: 'دیروز ۱۷:۳۰',
    budget: '۲۵ میلیارد تومان',
  },
  {
    id: 'f-2',
    name: 'مهندس آریا مهرابی',
    initials: 'مه',
    roleBadge: 'خریدار نقد',
    proposal: 'پیگیری نتیجه بازدید ولنجک برج پارمیس',
    phone: '۰۹۱۲۳۳۳۴۴۵۵',
    lastContact: '۲ روز پیش',
    budget: '۳۰ میلیارد تومان',
  },
  {
    id: 'f-3',
    name: 'آقای فراهانی',
    initials: 'فر',
    roleBadge: 'مالک فروشنده',
    proposal: 'تمدید فایل انحصاری شهرک غرب',
    phone: '۰۹۱۲۵۵۵۶۶۷۷',
    lastContact: '۳ روز پیش',
    budget: 'قیمت اعلامی: ۴۲ م',
  },
  {
    id: 'f-4',
    name: 'سرکار خانم توکلی',
    initials: 'تو',
    roleBadge: 'مستأجر VIP',
    proposal: 'هماهنگی بازدید ویلای لواسان',
    phone: '۰۹۱۲۷۷۷۸۸۹۹',
    lastContact: 'امروز ۰۹:۱۵',
    budget: 'رهن کامل ۳.۵ م',
  },
  {
    id: 'f-5',
    name: 'دکتر بهرامی',
    initials: 'به',
    roleBadge: 'سازنده',
    proposal: 'ارائه طرح توجیهی مشارکت زمین قیطریه',
    phone: '۰۹۱۲۹۹۹۰۰۱۱',
    lastContact: 'دیروز ۱۲:۰۰',
    budget: 'زمین ۵۰۰ متری',
  },
];

export const propertyMatchesList: PropertyMatch[] = [
  {
    id: 'm-1',
    matchScore: 94,
    location: 'سعادت‌آباد',
    title: '۱۳۵ متری، صراف‌های شمالی',
    priceText: '۱۳.۵ میلیارد تومان',
    areaTag: '۱۳۵ م',
    image: luxuryApartmentImage,
    clientName: 'خانم دکتر احمدی',
    clientBudget: 'بودجه تا ۱۵ م',
    tag: 'منطقه و قیمت هم‌خوان',
    features: ['۳ خواب مستر', 'پارکینگ سندی', 'آسانسور ۱۰ نفره', 'انباری ۸ متر', 'تراس چیدمان رو به باغ'],
    bedrooms: 3,
    floor: 4,
    parkingCount: 1,
    storage: true,
    elevator: true,
    address: 'سعادت‌آباد، خیابان صراف‌های شمالی، نبش خیابان بیست و هفتم، پلاک ۱۴',
  },
  {
    id: 'm-2',
    matchScore: 91,
    location: 'شهرک غرب',
    title: '۱۱۰ متری، فاز ۲ مجتمع گل‌ها',
    priceText: '۱۱.۲ میلیارد تومان',
    areaTag: '۱۱۰ م',
    image: luxuryApartmentImage,
    clientName: 'مهندس کاظمی',
    clientBudget: 'بودجه ۱۲ م',
    tag: 'سند تک‌برگ آماده انتقال',
    features: ['۲ خواب استاندارد', 'پارکینگ سندی', 'لابی من ۲۴ ساعته', 'بازسازی صفر تا صد'],
    bedrooms: 2,
    floor: 2,
    parkingCount: 1,
    storage: true,
    elevator: true,
    address: 'شهرک غرب، فاز ۲، خیابان هرمزان',
  },
  {
    id: 'm-3',
    matchScore: 89,
    location: 'زعفرانیه',
    title: '۱۶۰ متری، خیابان آصف',
    priceText: '۲۴ میلیارد تومان',
    areaTag: '۱۶۰ م',
    image: luxuryApartmentImage,
    clientName: 'دکتر مرادی',
    clientBudget: 'سرمایه‌گذاری تا ۲۵ م',
    tag: 'قیمت متری زیر عرف منطقه',
    features: ['۳ خواب با نور عالی', '۲ پارکینگ سندی باکس', 'روف گاردن چهار فصل', 'استخر و سونا فعال'],
    bedrooms: 3,
    floor: 5,
    parkingCount: 2,
    storage: true,
    elevator: true,
    address: 'زعفرانیه، خیابان آصف، کوچه شقایق',
  },
  {
    id: 'm-4',
    matchScore: 88,
    location: 'ولنجک',
    title: '۹۵ متری، خیابان چهاردهم',
    priceText: '۱۰.۸ میلیارد تومان',
    areaTag: '۹۵ م',
    image: luxuryApartmentImage,
    clientName: 'سرکار خانم توکلی',
    clientBudget: 'بودجه ۱۱ م',
    tag: 'دید کامل کوهستان بدون مشرف',
    features: ['۲ خواب', 'پارکینگ سندی', 'آسانسور', 'لابی مبله'],
    bedrooms: 2,
    floor: 6,
    parkingCount: 1,
    storage: true,
    elevator: true,
    address: 'ولنجک، خیابان چهاردهم غربی',
  },
];

export const schedulesList: ScheduleItem[] = [
  {
    id: 's-1',
    time: '۱۶:۳۰',
    period: 'عصر',
    title: 'کوچه شقایق',
    typeBadge: 'بازدید حضوری',
    badgeColor: 'teal',
    subtitle: 'مهندس کاظمی (خریدار)',
    phone: '۰۹۱۲۳۳۳۴۴۵۵',
    location: 'سعادت‌آباد، خیابان صراف‌های شمالی، کوچه شقایق، پلاک ۱۸',
    notes: 'کلید هماهنگ شده با سرایداری (آقای مرادی). مشتری تقاضای بازدید پارکینگ و انباری را دارد.',
    type: 'visit',
  },
  {
    id: 's-2',
    time: '۱۸:۰۰',
    period: 'غروب',
    title: 'ملک مهستان، طبقه ۴',
    typeBadge: 'جلسه قرارداد',
    badgeColor: 'amber',
    subtitle: 'اتاق قرارداد ۲ با مدیریت',
    phone: '۰۲۱۲۲۳۴۵۶۷۸',
    location: 'دفتر مرکزی املاکینو، طبقه اول، اتاق قرارداد شماره ۲',
    notes: 'خریدار و فروشنده با وکیل تشریف می‌آورند. مدارک چک تضمین و اصل سند توسط مدیریت بررسی شده است.',
    type: 'contract',
  },
];

export const performanceStats = {
  activeFiles: '۲۴',
  activeClients: '۱۸',
  newMatches: '۴',
  todayFollowUps: '۵',
};

export const recentActivities: RecentActivity[] = [
  {
    id: 'act-1',
    title: 'تأیید بازدید خیابان مروارید توسط مشتری',
    timeAgo: '۱۵ دقیقه پیش',
  },
  {
    id: 'act-2',
    title: 'ثبت ملک جدید توسط هوش مصنوعی',
    timeAgo: '۴۵ دقیقه پیش',
  },
  {
    id: 'act-3',
    title: 'استعلام سند فایل صراف‌های شمالی ثبت شد',
    timeAgo: '۱ ساعت پیش',
  },
  {
    id: 'act-4',
    title: 'پیش‌نویس قرارداد شماره ۸۴ آماده امضا شد',
    timeAgo: '۲ ساعت پیش',
  },
];

export const notificationsList = [
  {
    id: 'notif-1',
    title: 'تأخیر در پیگیری آقای رضایی',
    desc: 'تماس با خریدار سعادت‌آباد بیش از ۲ ساعت به تعویق افتاده است.',
    time: '۱۰ دقیقه پیش',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'تطبیق ۹۴٪ جدید پیدا شد',
    desc: 'فایل صراف‌های شمالی با مشخصات خانم دکتر احمدی تطبیق داده شد.',
    time: '۳۰ دقیقه پیش',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'جلسه قرارداد ساعت ۱۸:۰۰',
    desc: 'طرفین قرارداد ملک مهستان در مسیر دفتر هستند.',
    time: '۱ ساعت پیش',
    unread: true,
  },
];
