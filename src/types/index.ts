export interface Project {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  subtitle: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  year: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  liveDemo: string;
  github?: string;
  featured: boolean;
  metrics?: {
    label: { en: string; ar: string };
    value: string;
  }[];
  challenge?: { en: string; ar: string };
  solution?: { en: string; ar: string };
}

export interface Service {
  id: string;
  iconName: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
}

export interface ProcessStep {
  number: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  duration: { en: string; ar: string };
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | '3d' | 'design' | 'database';
  icon: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  company: string;
  avatar: string;
  content: { en: string; ar: string };
  rating: number;
}

export interface FAQItem {
  id: string;
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
}

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';
