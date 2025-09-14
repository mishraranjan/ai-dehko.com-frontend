'use client';
import { useState, useEffect } from 'react';
import { searchSuggestions } from '@/lib/api';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      searchSuggestions(query).then(data => setSuggestions(data)).finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return { query, setQuery, suggestions, loading };
}