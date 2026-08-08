export type ClassType = 'privat' | 'reguler';
export type SessionCount = 4 | 8;
export type LocationKey = 'ubud' | 'tychi' | 'savana';

export interface LocationInfo {
  key: LocationKey;
  name: string;
  htm: number;
  days: string;
  hours: string;
  badge?: string;
  mapUrl?: string;
  embedMapUrl?: string;
  address?: string;
  description: string;
  image: string;
}

export interface PackageRate {
  price: number;
  label: string;
  perSession: number;
  discount?: string;
}

export interface CategoryProgram {
  id: string;
  title: string;
  target: string;
  iconName: string;
  description: string;
  features: string[];
  popular?: boolean;
  tag: string;
}

export interface CoachAchievement {
  year: string;
  title: string;
  category: string;
  medal: 'gold' | 'silver' | 'bronze';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: string;
  comment: string;
  rating: number;
  avatar: string;
  outcomeBadge: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'harga' | 'jadwal' | 'teknis' | 'garansi';
}
