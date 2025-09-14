'use client';
import { useState, useEffect } from 'react';
import { Product } from '../lib/types';
import { ProductCard } from './ProductCard';
import { getProducts } from '../lib/api';

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        // Fetch products with similar categories or tags
        const products = await getProducts({
          category: currentProduct.categories[0],
          limit: 4
        });
        
        // Filter out current product and limit to 3
        const filtered = products
          .filter((p: Product) => p._id !== currentProduct._id)
          .slice(0, 3);
        
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentProduct]);

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
