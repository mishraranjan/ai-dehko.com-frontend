'use client';
import React from 'react';
import { useSearch } from '../hooks/useSearch';
import { Input } from '@/components/ui/input';
import { Search, Sparkles } from 'lucide-react';

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const { query, setQuery, suggestions } = useSearch();

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search 500+ AI tools... (e.g., ChatGPT, Midjourney, Claude)"
          className="pl-12 pr-12 h-12 text-base bg-background/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 rounded-xl shadow-lg"
        />
        <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute w-full mt-2 z-50">
          <ul className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
            {suggestions.slice(0, 6).map((s, i) => (
              <li
                key={i}
                className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors border-b border-border/50 last:border-b-0 flex items-center space-x-3"
                onClick={() => {
                  setQuery(s);
                  onSearch(s);
                }}
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}