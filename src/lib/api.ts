import { Product, FilterOptions } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Mock data for development when API is not available
const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'ChatGPT',
    description: 'Advanced AI chatbot for conversations and assistance',
    categories: ['chatbot', 'ai-assistant'],
    tags: ['nlp', 'conversation', 'openai'],
    usps: ['Natural conversations', 'Code generation', 'Multiple languages'],
    features: [
      { name: 'Text Generation', description: 'Generate human-like text responses' },
      { name: 'Code Assistance', description: 'Help with programming tasks' }
    ],
    reviews: [
      { user: 'John Doe', rating: 5, comment: 'Excellent AI tool!', date: '2024-01-15' }
    ],
    gallery: ['https://via.placeholder.com/300x200'],
    price: 20,
    purchaseLink: 'https://openai.com/chatgpt',
    popularity: 95,
    seoMetadata: { title: 'ChatGPT - AI Assistant', description: 'Advanced AI chatbot' }
  },
  {
    _id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation tool',
    categories: ['image-generation', 'creative'],
    tags: ['art', 'design', 'images'],
    usps: ['High-quality images', 'Artistic styles', 'Easy to use'],
    features: [
      { name: 'Image Generation', description: 'Create stunning images from text' },
      { name: 'Style Control', description: 'Various artistic styles available' }
    ],
    reviews: [
      { user: 'Jane Smith', rating: 4, comment: 'Great for creative work!', date: '2024-01-10' }
    ],
    gallery: ['https://via.placeholder.com/300x200'],
    price: 30,
    purchaseLink: 'https://midjourney.com',
    popularity: 88,
    seoMetadata: { title: 'Midjourney - AI Art', description: 'AI image generation' }
  },
  {
    _id: '3',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant for analysis and conversation',
    categories: ['chatbot', 'ai-assistant'],
    tags: ['analysis', 'conversation', 'anthropic'],
    usps: ['Constitutional AI', 'Long conversations', 'Helpful and harmless'],
    features: [
      { name: 'Document Analysis', description: 'Analyze and summarize documents' },
      { name: 'Code Review', description: 'Review and improve code quality' }
    ],
    reviews: [
      { user: 'Alex Johnson', rating: 5, comment: 'Very helpful for analysis!', date: '2024-01-12' }
    ],
    gallery: ['https://via.placeholder.com/300x200'],
    price: 25,
    purchaseLink: 'https://claude.ai',
    popularity: 92,
    seoMetadata: { title: 'Claude - AI Assistant', description: 'Anthropic AI assistant' }
  }
];

export async function fetchProducts(options: FilterOptions = {}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (options.category) params.append('category', options.category);
    if (options.tags) params.append('tags', options.tags.join(','));
    if (options.sort) params.append('sort', options.sort);
    if (options.search) params.append('search', options.search);
    params.append('page', String(options.page || 1));
    params.append('limit', String(options.limit || 20));

    const res = await fetch(`${API_URL}/api/products?${params}`);
    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();
    // Ensure we always return an array
    if (!Array.isArray(data)) {
      console.warn('API returned non-array data, using mock data');
      return mockProducts;
    }
    return data;
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    // Filter mock data based on options
    let filtered = [...mockProducts];
    if (options.category) {
      filtered = filtered.filter(p => p.categories.includes(options.category!));
    }
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    return filtered;
  }
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function fetchTrending(category?: string, limit = 5): Promise<Product[]> {
  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (category) params.append('category', category);
    const res = await fetch(`${API_URL}/api/products/trending?${params}`);

    if (!res.ok) {
      throw new Error('Failed to fetch trending');
    }

    const data = await res.json();
    // Ensure we always return an array
    if (!Array.isArray(data)) {
      console.warn('API returned non-array data, using mock data');
      return mockProducts.slice(0, limit);
    }
    return data;
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    // Return mock data filtered by category if specified
    let filtered = [...mockProducts];
    if (category) {
      filtered = filtered.filter(p => p.categories.includes(category));
    }
    // Sort by popularity and limit
    return filtered
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }
}

export async function compareProducts(ids: string[]): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error('Failed to compare');
  return (await res.json()).products;
}

export async function searchSuggestions(query: string): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/products?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch suggestions');
  const products = await res.json();
  return Array.from(new Set(products.flatMap((p: Product) => [p.name, ...p.tags, ...p.categories])));
}