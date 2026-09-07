export interface KeyaProduct {
  id: string;
  name: string;
  category: 'cosmetics' | 'textiles' | 'agro' | string;
  categoryLabel: string;
  imageUrl: string;
  description: string;
  weightOrSize?: string;
  badge?: string;
}

export interface ProductInquiry {
  id?: number;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  quantity: string;
  notes?: string;
  submittedAt?: string;
  status: 'Pending' | 'Contacted' | 'Completed' | string;
}

export interface Subcategory {
  id?: number;
  categoryId?: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Division {
  id: string;
  name: string;
  slug: string;
  category: 'textiles' | 'cosmetics' | string;
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
