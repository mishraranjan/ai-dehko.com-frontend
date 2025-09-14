'use client';
import { Product } from '../lib/types';
import { ProductCard } from './ProductCard';
import { useEffect, useState } from 'react';
import { fetchTrending } from '@/lib/api';

interface CategoryWidgetProps { category?: string; limit?: number; }

export function CategoryWidget({ category, limit = 5 }: CategoryWidgetProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTrending(category, limit)
      .then(setProducts)
      .catch(err => {
        console.error('Failed to fetch trending products:', err);
        setError('Failed to load trending products. Please try again later.');
        setProducts([]); // Set empty array as fallback
      })
      .finally(() => setLoading(false));
  }, [category, limit]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text mb-2">{category || 'Trending'} AI Tools</h2>
          <p className="text-muted-foreground">Discovering the latest AI innovations...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-effect rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold gradient-text">{category || 'Trending'} AI Tools</h2>
        <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-destructive text-lg font-medium mb-2">Oops! Something went wrong</div>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold gradient-text">{category || 'Trending'} AI Tools</h2>
        <p className="text-lg text-muted-foreground">
          {category
            ? `Explore the best AI tools in ${category}`
            : 'Discover the most popular AI tools right now'
          }
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>{products.length} tools found</span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}