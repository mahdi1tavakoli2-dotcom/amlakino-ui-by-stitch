# AMLAKINO — Architecture Refactoring Plan for Existing Dashboard

> **Context & Goal**: Transform the current single-file stateful dashboard mockup into a modular, testable, and production-ready modular monolith in React + TypeScript + Vite + Tailwind CSS. The design, visual tokens, and micro-interactions of the approved dashboard are preserved exactly without visual regression.

---

## 1. Existing System Audit & Baseline

### 1.1 Existing Component Tree & Dependencies
Currently, `src/App.tsx` acts as an omni-controller handling:
1. Navigation tab state (`home` | `properties` | `clients` | `more`)
2. Viewport presentation mode (`framedView` toggle)
3. Modal/Drawer open/closed states (11 simultaneous modal flags)
4. Active contact/entity selection states for action sheets
5. Inline toast dispatching and timer management

```
App.tsx (Root State Orchestrator)
 ├── Viewport Wrapper (Framed Mobile vs. Full-Width toggle)
 ├── TopHeader (User badge, Online indicator, Search trigger, Bell trigger, Menu trigger)
 ├── Tab Views:
 │    ├── [home]:
 │    │    ├── HeroGreeting ("صبح بخیر، علیرضا" + "دستیار هوشمند فعال" trigger)
 │    │    ├── UrgentTaskCard (Border accent, Delayed call, Snooze & Quick Call CTAs)
 │    │    ├── FollowUpSection (Dr. Moradi card, View All trigger, Call CTA)
 │    │    ├── PropertyMatchSection (135m Saadat Abad card, Match details trigger, Share CTA)
 │    │    ├── ScheduleSection (16:30 Shaqayeq visit, 18:00 Mehestan contract)
 │    │    ├── StatsGrid (24 files, 18 clients, 4 matches, 5 follow-ups)
 │    │    └── RecentActivitySection (Morvarid St confirmation, AI listing registered)
 │    ├── [properties]: PropertiesView (Internal filter pills, Search input, Property cards)
 │    ├── [clients]: ClientsView (Search input, Client cards with budget badges)
 │    └── [more]: MoreView (Advisor profile, AI settings, Security & Support links)
 ├── Modals & Action Drawers (Controlled by App.tsx state):
 │    ├── CallModal (Simulated live call session, timer, mute/speaker, call notes)
 │    ├── SnoozeModal (1h, afternoon, tomorrow snooze duration selection)
 │    ├── SharePropertyModal (SMS, Bale, WhatsApp, Telegram, Clipboard)
 │    ├── MatchDetailsModal (94% breakdown, 3-metric radar, property specs, client demand)
 │    ├── RouteModal (Mini-map simulation, address, Neshan/Balad/Waze triggers)
 │    ├── ContractModal (Buyer/Seller checks, legal checklist, 58M Toman commission)
 │    ├── QuickAddModal (Tabs for Property, Client, Visit, Voice note)
 │    ├── AllFollowUpsDrawer (Modal list of 5 follow-ups)
 │    ├── AllMatchesDrawer (Modal list of 4 AI property matches)
 │    ├── NotificationsDrawer (Modal list of 3 unread priority notifications)
 │    ├── SearchModal (Unified client/property/visit search with instant filter)
 │    └── AssistantModal (Status overview of AI matching & monitoring engine)
 └── BottomNavBar (Sticky 4-tab bar with elevated center '+' Quick-Add button)
```

### 1.2 Preservation Inventory (UI Components Reused Without Visual Changes)
The following components are strictly visual presenters and will be preserved intact or adapted with typed prop contracts:
- `TopHeader`: Preserved as part of the shared application layout shell.
- `HeroGreeting`: Preserved in the `dashboard` feature.
- `UrgentTaskCard`: Preserved with event emitter props (`onCall`, `onSnooze`, `onCardClick`).
- `FollowUpSection`: Preserved with typed list props.
- `PropertyMatchSection`: Preserved with typed match entity props.
- `ScheduleSection`: Preserved with typed schedule entity props.
- `StatsGrid`: Preserved as a pure presenter component.
- `RecentActivitySection`: Preserved as a pure presenter component.
- `BottomNavBar`: Preserved in the shared application layout shell.
- `CallModal`, `SnoozeModal`, `SharePropertyModal`, `MatchDetailsModal`, `RouteModal`, `ContractModal`, `QuickAddModal`: Preserved visually; separated into modal registry/contexts.

### 1.3 Identified Mock Data & Hardcoded Metrics
All hardcoded values currently residing in `src/data/mockData.ts` and `src/App.tsx`:
1. **Advisor Profile**: Hardcoded to `علیرضا تهرانی`, `مشاور ارشد سعادت‌آباد و شهرک غرب`, `رتبه ۱ آژانس`.
2. **Urgent Task**: Hardcoded delay (`۲ ساعت تأخیر`), time (`۱۰:۳۰ امروز`), inquiry (`استعلام پارکینگ`).
3. **Follow-ups (5 items)**: Hardcoded contacts with fixed Iranian phone numbers (`۰۹۱۲...`).
4. **AI Property Matches (4 items)**: Fixed match scores (94%, 91%, 89%, 88%), fixed static image asset (`luxury_apartment_saadat_abad_1791330057482.jpg`).
5. **Schedules (2 items)**: Fixed times (`۱۶:۳۰`, `۱۸:۰۰`) and locations.
6. **KPI Metrics**: Hardcoded numbers `۲۴`, `۱۸`, `۴`, `۵`.
7. **Simulated Delays & Counters**: In `CallModal.tsx`, a 1.5s timeout transitions status from `calling` to `connected`, and a local `setInterval` increments seconds.
8. **Notifications**: 3 hardcoded unread items.

---

## 2. Target Architecture & Modular Monolith Layout

### 2.1 Directory Structure & Boundaries
We decouple `src/` into a standard layered modular architecture:

```
src/
├── app/                        # Application Root & Shell
│   ├── App.tsx                 # Clean Router entry & Global Providers
│   ├── routes.tsx              # Route table (declarative lightweight client router)
│   ├── providers/              # ToastProvider, ModalProvider, AuthProvider (future)
│   └── shell/
│       ├── AppShell.tsx        # TopHeader, BottomNavBar, Viewport Frame wrapper
│       └── PageContainer.tsx
│
├── core/                       # Shared Domain Primitives & Infrastructure
│   ├── types/                  # Global domain types (ID, Money, Timestamps, PersianNumber)
│   ├── errors/                 # DomainError, NotFoundError, ValidationError, ApiError
│   ├── http/                   # HTTP client / Repository abstract contracts
│   └── utils/
│       ├── persianNumbers.ts   # Digit conversion & Toman currency formatting
│       └── dateUtils.ts        # Jalali date & relative time helpers
│
├── ui/                         # Reusable Headless / Dumb Design System Components
│   ├── Button/
│   ├── Modal/                  # Base modal backdrop with focus trap & ESC handlers
│   ├── Drawer/                 # Bottom sheet drawer container
│   ├── Badge/
│   ├── Avatar/
│   └── Toast/
│
├── features/                   # Independent Feature Modules
│   ├── dashboard/              # Home view aggregate, KPI cards, urgent alert
│   │   ├── components/         # HeroGreeting, UrgentTaskCard, StatsGrid
│   │   ├── hooks/              # useDashboardSummary()
│   │   └── pages/DashboardPage.tsx
│   ├── properties/             # Property Management & CRUD
│   │   ├── components/         # PropertyCard, PropertyFilterBar, PropertyForm
│   │   ├── hooks/              # useProperties(), usePropertyDetails(), useCreateProperty()
│   │   ├── api/                # IPropertyRepository, MemoryPropertyRepository, ApiPropertyRepository
│   │   ├── types/              # Property, PropertyFilter, CreatePropertyInput
│   │   └── pages/PropertiesPage.tsx
│   ├── clients/                # Buyer & Investor Directory
│   │   ├── components/         # ClientCard, ClientInquiryBadge
│   │   ├── hooks/              # useClients(), useCreateClient()
│   │   ├── api/                # IClientRepository
│   │   └── pages/ClientsPage.tsx
│   ├── matching/               # AI Property-Client Match Engine
│   │   ├── components/         # PropertyMatchSection, MatchDetailsModal, ShareModal
│   │   ├── hooks/              # useHighScoringMatches()
│   │   └── types/              # PropertyMatch, MatchBreakdown
│   ├── follow-ups/             # Task & Lead Follow-Up Engine
│   │   ├── components/         # FollowUpSection, SnoozeModal, CallModal
│   │   └── hooks/              # useFollowUps(), useSnoozeFollowUp()
│   ├── activities/             # Audit Log & Recent Events
│   │   ├── components/         # RecentActivitySection
│   │   └── hooks/              # useRecentActivities()
│   ├── schedules/              # Visits & Contracts
│   │   ├── components/         # ScheduleSection, RouteModal, ContractModal
│   │   └── hooks/              # useTodaySchedules()
│   ├── team/                   # Agency Team & Hierarchy (Phase 4)
│   └── reports/                # Performance analytics & Sales Pipeline (Phase 4)
│
└── assets/                     # Images, Icons, Static assets
```

### 2.2 Routing Strategy
Instead of bloated multi-megabyte external routing libraries, we implement a lightweight, fully typed, hash-based or browser history router:
- `/` or `#/` → Dashboard (Home)
- `#/properties` → Properties Directory & CRUD
- `#/properties/:id` → Property Details
- `#/clients` → Clients & Inquiries
- `#/more` → Advisor Settings & AI Diagnostics

This guarantees that:
1. Reloading or deep linking retains the active tab/screen.
2. The bottom nav bar binds directly to route paths (`navigate('#/properties')`).
3. Modals can be route-backed or managed by a clean `useModal()` store without re-rendering the entire page tree.

---

## 3. Data Access Layer & Minimal CRUD Contract

### 3.1 Domain Entity: Property
To support the first real CRUD workflow for properties without tying the frontend directly to raw SQL or Supabase before the approved phase:

```typescript
// src/features/properties/types/property.types.ts

export type PropertyListingType = 'sale' | 'presale' | 'mortgage' | 'rent';

export interface PropertyFeatures {
  bedrooms: number;
  floor: number;
  totalFloors?: number;
  parkingCount: number;
  storage: boolean;
  elevator: boolean;
  balcony: boolean;
  masterBathrooms?: number;
}

export interface PropertyEntity {
  id: string;
  code: string;                  // e.g. "AML-1042"
  title: string;                 // "۱۳۵ متری، صراف‌های شمالی"
  location: {
    district: string;            // "سعادت‌آباد"
    street: string;              // "صراف‌های شمالی"
    alley?: string;              // "خیابان بیست و هفتم"
    fullAddress: string;
    coordinates?: { lat: number; lng: number };
  };
  pricing: {
    totalPriceToman: number;     // 13_500_000_000
    pricePerMeterToman?: number; // 100_000_000
    depositToman?: number;
    monthlyRentToman?: number;
    isNegotiable: boolean;
  };
  metrics: {
    builtAreaSqm: number;        // 135
    landAreaSqm?: number;
    ageYears: number;            // 0 for new
  };
  features: PropertyFeatures;
  images: {
    id: string;
    url: string;
    isCover: boolean;
    altText?: string;
  }[];
  listingType: PropertyListingType;
  status: 'active' | 'reserved' | 'sold' | 'archived';
  advisorId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreatePropertyInput = Omit<
  PropertyEntity,
  'id' | 'code' | 'createdAt' | 'updatedAt' | 'advisorId'
>;

export type UpdatePropertyInput = Partial<CreatePropertyInput>;

export interface PropertyFilterQuery {
  listingType?: PropertyListingType;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  searchQuery?: string;
  status?: PropertyEntity['status'];
}
```

### 3.2 Data Access Interface (`IPropertyRepository`)
```typescript
// src/features/properties/api/property.repository.ts

export interface PaginatedResult<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface IPropertyRepository {
  getAll(filter?: PropertyFilterQuery): Promise<PropertyEntity[]>;
  getById(id: string): Promise<PropertyEntity | null>;
  create(input: CreatePropertyInput): Promise<PropertyEntity>;
  update(id: string, input: UpdatePropertyInput): Promise<PropertyEntity>;
  delete(id: string): Promise<boolean>;
}
```

**Implementation Strategy**:
- Phase 1–2 uses `InMemoryPropertyRepository` initialized with seeds, storing mutations in memory/sessionStorage.
- Phase 3 swaps to `SupabasePropertyRepository` implementing the exact same interface:
  ```typescript
  // Repository Injection via React Context:
  const { propertyRepo } = useRepositories();
  ```
Zero UI component changes will be required when migrating to Supabase PostgreSQL.

---

## 4. Issues & Technical Debt Discovered

1. **Hardcoded Image Reference Path**:
   `src/data/mockData.ts` contains raw string paths:
   ```typescript
   image: '/src/assets/images/luxury_apartment_saadat_abad_1791330057482.jpg'
   ```
   In production Vite builds (`npm run build`), raw `/src/...` string paths are not bundled or hashed, causing broken images in static previews.
   *Fix*: Use standard ES module imports:
   ```typescript
   import defaultApartmentCover from '../assets/images/luxury_apartment_saadat_abad_1791330057482.jpg';
   ```
2. **Missing Input Validation & Error Boundaries**:
   Currently, form submissions in `QuickAddModal.tsx` perform no type coercion or sanitization.
   *Fix*: Add lightweight schema/parser validation with descriptive Persian error messages.
3. **App.tsx State Explosion**:
   `App.tsx` has over 15 `useState` hooks controlling unrelated views and modals.
   *Fix*: Introduce a lightweight `useModalStore` and route-based views.
4. **TypeScript Strictness**:
   `SearchModal.tsx` currently has `(item: any) => void`.
   *Fix*: Strongly type search result union types (`PropertyEntity | ClientEntity | ScheduleEntity`).

---

## 5. Incremental Refactoring Phases

```
┌────────────────────────────────────────────────────────┐
│ Phase 0: Baseline & Asset Fixes                        │
│ Fix Vite image bundling imports & TypeScript strictness │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ Phase 1: Shared Shell & Navigation Routing             │
│ AppShell, Router Provider, Toast & Modal Contexts      │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ Phase 2: Domain Boundary Separation                    │
│ Move features into independent folders with hooks       │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ Phase 3: Property CRUD Data Access Layer               │
│ Repository interface, validations, real CRUD state     │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ Phase 4 (Future Approved): Supabase & PostgreSQL Auth  │
│ Replace in-memory repository with Supabase client      │
└────────────────────────────────────────────────────────┘
```

### Phase 0: Asset Fixes & Baseline Integrity
- **Scope**:
  - Replace hardcoded `/src/assets/...` strings with standard Vite static asset imports.
  - Fix any `any` type annotations in `SearchModal.tsx`.
- **Acceptance Criteria**:
  - `npm run build` succeeds cleanly with all images bundled in `/dist/assets/`.
  - Zero TypeScript lint errors.
- **Rollback Point**: Revert import statements if Vite asset resolution fails.

### Phase 1: Shared Shell & Lightweight Router
- **Scope**:
  - Create `src/app/shell/AppShell.tsx` hosting `TopHeader`, `BottomNavBar`, and responsive container logic.
  - Implement a zero-dependency client route switcher (`hash-router` or state router matching URLs).
  - Extract global modal state from `App.tsx` into a lightweight `ModalProvider` or custom hook.
- **Acceptance Criteria**:
  - Dashboard visual appearance and mobile frame view are 100% pixel-identical to the original.
  - Back/forward navigation and URL tabs (`#/`, `#/properties`, `#/clients`, `#/more`) work cleanly.
  - All modals trigger and dismiss without re-rendering unrelated cards.
- **Rollback Point**: `App.tsx` snapshot remains functional.

### Phase 2: Feature Module Boundary Decoupling
- **Scope**:
  - Move components into domain folders:
    - `features/dashboard/` (HeroGreeting, UrgentTaskCard, StatsGrid, RecentActivitySection)
    - `features/properties/` (PropertyMatchSection, PropertiesView, MatchDetailsModal, ShareModal)
    - `features/clients/` (FollowUpSection, ClientsView, AllFollowUpsDrawer, CallModal, SnoozeModal)
    - `features/schedules/` (ScheduleSection, RouteModal, ContractModal)
  - Create custom domain hooks (`useDashboardData`, `useFollowUps`, `useSchedules`).
- **Acceptance Criteria**:
  - No circular dependencies between features.
  - Clean separation: presentation components do not own data fetching logic.
- **Rollback Point**: Git revert to Phase 1 commits.

### Phase 3: Real Property CRUD & Data-Access Layer
- **Scope**:
  - Implement `IPropertyRepository` and `InMemoryPropertyRepository`.
  - Connect `QuickAddModal` ("ثبت ملک جدید") to create real records stored in the repository.
  - Connect `PropertiesView` to list, search, filter, and delete properties dynamically.
  - Update `StatsGrid` active properties count based on repository state.
- **Acceptance Criteria**:
  - Adding a new property in the UI updates the properties list and the dashboard stat count.
  - Persian price and number formatting remain crisp and properly validated.
  - Form shows validation errors for invalid or empty inputs.
  - Zero mock fallback hacks in the CRUD layer.
- **Rollback Point**: Fallback repository to static seed data.

### Phase 4 (Subsequent Phase — Upon User Request & Approval):
- Supabase Client, Auth Provider, and PostgreSQL Drizzle/RPC migration.
- Team permissions and multi-advisor analytics.

---

## 6. Verification Plan
1. **Compilation Check**: Run `compile_applet` after each phase.
2. **Lint Check**: Run `lint_applet` to enforce zero TypeScript errors.
3. **Visual Regression Verification**: Verify that the dashboard in `#/` matches the uploaded screenshot pixel-for-pixel (colors, RTL typography, spacing, Persian numerals).
4. **Interactive Verification**: Test urgent call trigger, snooze dialog, property share dialog, match breakdown, and route navigation.
