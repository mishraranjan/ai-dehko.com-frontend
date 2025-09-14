// src/app/ClientLayout.tsx
'use client';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { useProducts } from '../hooks/useProducts';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { products } = useProducts();

  // Ensure products is always an array and has the expected structure
  const safeProducts = Array.isArray(products) ? products : [];
  const categories = Array.from(new Set(safeProducts.flatMap(p => p?.categories || [])));
  const tags = Array.from(new Set(safeProducts.flatMap(p => p?.tags || [])));

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">AI Dehko</h1>
                <p className="text-sm text-muted-foreground">Discover the Future of AI Tools</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">500+ AI Tools</span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">Updated Daily</span>
            </div>
          </div>
          <SearchBar onSearch={(query) => console.log('Search:', query)} />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Filters categories={categories} tags={tags} onFilter={(filters) => console.log('Filters:', filters)} />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}