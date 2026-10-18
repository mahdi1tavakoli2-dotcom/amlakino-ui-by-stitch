export type PersianDigitString = string;

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ViewportMode = 'framed' | 'full';
