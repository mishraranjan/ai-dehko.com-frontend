'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { getProducts } from '../../lib/api';
import { Product } from '../../lib/types';
import { Grid, List, Filter, TrendingUp, Users, Star } from 'lucide-react';

export default function CategoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { 
      name: 'Marketing', 
      slug: 'marketing',
      description: 'AI tools for marketing automation, content creation, and customer engagement',
      icon: '📈',
      color: 'bg-blue-500'
    },
    { 
      name: 'Financial', 
      slug: 'financial',
      description: 'AI solutions for financial analysis, trading, and risk management',
      icon: '💰',
      color: 'bg-green-500'
    },
    { 
      name: 'Content Management', 
      slug: 'content-management',
      description: 'AI-powered content creation, editing, and management tools',
      icon: '📝',
      color: 'bg-purple-500'
    },
    { 
      name: 'Development', 
      slug: 'development',
      description: 'AI tools for code generation, testing, and development workflows',
      icon: '💻',
      color: 'bg-indigo-500'
    },
    { 
      name: 'Design', 
      slug: 'design',
      description: 'AI-powered design tools for graphics, UI/UX, and creative work',
      icon: '🎨',
      color: 'bg-pink-500'
    },
    { 
      name: 'Analytics', 
      slug: 'analytics',
      description: 'AI tools for data analysis, business intelligence, and insights',
      icon: '📊',
      color: 'bg-orange-500'
    },
    { 
      name: 'Customer Support', 
      slug: 'customer-support',
      description: 'AI chatbots, help desk automation, and customer service tools',
      icon: '🎧',
      color: 'bg-teal-500'
    },
    { 
      name: 'Sales', 
      slug: 'sales',
      description: 'AI tools for sales automation, lead generation, and CRM',
      icon: '💼',
      color: 'bg-red-500'
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts({ limit: 100 });
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryStats = (categorySlug: string) => {
    const categoryProducts = products.filter(product => 
      product.categories.some(cat => 
        cat.toLowerCase().replace(' ', '-') === categorySlug
      )
    );
    
    const totalReviews = categoryProducts.reduce((sum, product) => sum + product.reviews.length, 0);
    const avgRating = categoryProducts.length > 0 
      ? categoryProducts.reduce((sum, product) => {
          const productRating = product.reviews.length > 0 
            ? product.reviews.reduce((rSum, review) => rSum + review.rating, 0) / product.reviews.length 
            : 0;
          return sum + productRating;
        }, 0) / categoryProducts.length 
      : 0;

    return {
      productCount: categoryProducts.length,
      totalReviews,
      avgRating: avgRating.toFixed(1)
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Tool Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of AI tools organized by category. 
            Find the perfect solution for your specific needs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length}</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">{products.length}+</div>
            <div className="text-gray-600">AI Tools</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {products.reduce((sum, product) => sum + product.reviews.length, 0)}+
            </div>
            <div className="text-gray-600">Reviews</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.5</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const stats = getCategoryStats(category.slug);
            
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{stats.productCount} tools available</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{stats.totalReviews} reviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{stats.avgRating}</span>
                      </div>
                    </div>
                    <div className="text-blue-600 font-medium group-hover:text-blue-700">
                      Explore →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Popular Tools Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular Tools Across Categories</h2>
            <Link href="/trending" className="text-blue-600 hover:text-blue-700 font-medium">
              View all trending →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4"
              >
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  {product.gallery && product.gallery[0] ? (
                    <img 
                      src={product.gallery[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {product.categories[0]}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span className="text-xs text-gray-500">
                      {product.reviews.length > 0 
                        ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}