'use client';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface FiltersProps {
  categories: string[];
  tags: string[];
  onFilter: (filters: { category?: string; tags?: string[]; sort?: string }) => void;
}

export function Filters({ categories, tags, onFilter }: FiltersProps) {
  const [category, setCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState('popularity');

  const applyFilters = () => {
    onFilter({ category: category === 'all' ? undefined : category, tags: selectedTags, sort });
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="glass-effect rounded-2xl p-6 professional-shadow">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tags</label>
            <Select onValueChange={handleTagChange}>
              <SelectTrigger className="h-11 bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Filter by Tags" />
              </SelectTrigger>
              <SelectContent>
                {tags.map(t => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sort By</label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-11 bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">🔥 Popularity</SelectItem>
                <SelectItem value="ratings">⭐ Ratings</SelectItem>
                <SelectItem value="price">💰 Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={applyFilters}
          className="w-full lg:w-auto h-11 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Apply Filters
        </Button>
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Selected tags:</span>
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
                <button
                  onClick={() => handleTagChange(tag)}
                  className="ml-2 hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}