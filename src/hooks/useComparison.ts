'use client';
import { useState } from 'react';
import { compareProducts } from '@/lib/api';
import { Product } from '../lib/types';

export function useComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const addToCompare = (id: string) => {
    if (selectedIds.length >= 3) return;
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeFromCompare = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const compare = async () => {
    if (selectedIds.length < 2) return;
    setLoading(true);
    try {
      const products = await compareProducts(selectedIds);
      setComparedProducts(products);
    } finally {
      setLoading(false);
    }
  };

  return { selectedIds, comparedProducts, addToCompare, removeFromCompare, compare, loading };
}