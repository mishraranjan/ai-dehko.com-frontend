'use client';
import { useProducts } from '../../../hooks/useProducts';
import { ProductCard } from '../../../components/ProductCard';
import { useComparison } from '../../../hooks/useComparison';
import { use } from 'react';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { products, loading, error } = useProducts({ category: slug });
  const { addToCompare } = useComparison();

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold gradient-text capitalize">{slug} Tools</h1>
          <p className="text-lg text-muted-foreground">Loading amazing AI tools...</p>
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
        <h1 className="text-4xl font-bold gradient-text capitalize">{slug} Tools</h1>
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
        <h1 className="text-4xl font-bold gradient-text capitalize">{slug} Tools</h1>
        <p className="text-lg text-muted-foreground">
          Discover the best AI tools in the {slug} category
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>{products.length} tools available</span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground">
              We couldn&apos;t find any tools in the {slug} category. Try browsing other categories.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <ProductCard key={p._id} product={p} onCompare={addToCompare} />
          ))}
        </div>
      )}
    </div>
  );
}