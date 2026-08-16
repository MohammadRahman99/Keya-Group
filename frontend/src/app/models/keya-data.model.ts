export interface KeyaProduct {
  id: string;
  name: string;
  category: 'cosmetics' | 'textiles' | 'agro';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  weightOrSize?: string;
  badge?: string;
}

export interface Division {
  id: string;
  name: string;
  slug: string;
  category: 'textiles' | 'cosmetics';
  subtitle: string;
  description: string;
  imageUrl: string;
  keyFeatures: string[];
}

export interface CarouselSlide {
  id: string;
  title: string;
  imageUrl: string;
  tag: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  summary: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  deadline: string;
  description: string;
}
