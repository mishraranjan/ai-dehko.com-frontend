export interface Product {
    _id: string;
    name: string;
    description: string;
    categories: string[];
    tags: string[];
    usps: string[];
    features: { name: string; description: string }[];
    reviews: { user: string; rating: number; comment: string; date: string }[];
    gallery: string[];
    price?: number;
    purchaseLink?: string;
    popularity: number;
    seoMetadata?: { title: string; description: string };
  }
  
  export interface FilterOptions {
    category?: string;
    tags?: string[];
    sort?: 'popularity' | 'ratings' | 'price';
    search?: string;
    page?: number;
    limit?: number;
  }