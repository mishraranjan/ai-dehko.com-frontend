import { Product, FilterOptions } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getProducts(options: FilterOptions = {}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (options.category) params.append('category', options.category);
    if (options.tags?.length) params.append('tags', options.tags.join(','));
    if (options.search) params.append('search', options.search);
    if (options.sort) params.append('sort', options.sort);
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.page) params.append('page', options.page.toString());

    const res = await fetch(`${API_URL}/api/products?${params}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    return mockProducts;
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    return mockProducts.find(p => p._id === id) || mockProducts[0];
  }
}

export async function getTrendingProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/api/products/trending`);
    if (!res.ok) throw new Error('Failed to fetch trending products');
    return await res.json();
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    return mockProducts.slice(0, 6);
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.append('search', query);
    
    const res = await fetch(`${API_URL}/api/products?${params}`);
    if (!res.ok) throw new Error('Failed to search products');
    return await res.json();
  } catch (error) {
    console.warn('Search API not available, using mock data:', error);
    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return getProducts({ category, limit: 50 });
}

export async function compareProducts(ids: string[]): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/api/products/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error('Failed to compare');
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    return ids.map(id => mockProducts.find(p => p._id === id)).filter(Boolean) as Product[];
  }
}

// Auth functions
export async function registerUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role: 'user' }),
  });
  if (!res.ok) throw new Error('Registration failed');
  return await res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
}

// Mock data remains for fallback
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
