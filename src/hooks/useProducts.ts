'use client';
import { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '@/lib/api';
import { FilterOptions, Product } from '../lib/types';

export function useProducts(options: FilterOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => options, [
    options.category,
    options.tags?.join(','), // Convert array to string for stable comparison
    options.sort,
    options.search,
    options.page,
    options.limit
  ]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts(memoizedOptions)
      .then(data => setProducts(data))
      .catch(err => setError(err.message || 'Failed to fetch products'))
      .finally(() => setLoading(false));
  }, [memoizedOptions]);

  return { products, loading, error };
}