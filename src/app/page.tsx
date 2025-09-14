'use client';
import { CategoryWidget } from '@/components/CategpryWidegt';
import { useComparison } from '../hooks/useComparison';
import { ComparisonTable } from '../components/ComparisonTable';
import { Button } from '../components/ui/button';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export default function Home() {
  const { selectedIds, comparedProducts, compare, loading } = useComparison();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text leading-tight">
            Discover the Future of
            <br />
            <span className="relative">
              AI Tools
              <Sparkles className="absolute -top-2 -right-8 h-8 w-8 text-primary animate-pulse" />
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore 500+ cutting-edge AI tools, compare features, read reviews, and find the perfect solution for your needs.
            From productivity to creativity, we&apos;ve got you covered.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-medium">500+ Tools</span>
          </div>
          <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-medium">10K+ Users</span>
          </div>
          <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-medium">Updated Daily</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <CategoryWidget />
      </section>

      {/* Comparison Section */}
      {selectedIds.length >= 2 && (
        <section className="space-y-6">
          <div className="glass-effect rounded-2xl p-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Compare Selected Tools</h3>
            <p className="text-muted-foreground mb-6">
              You&apos;ve selected {selectedIds.length} tools for comparison. Click below to see a detailed comparison.
            </p>
            <Button
              onClick={compare}
              disabled={loading}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Comparing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Compare Selected Tools
                </>
              )}
            </Button>
          </div>

          {comparedProducts.length > 0 && (
            <div className="glass-effect rounded-2xl p-6">
              <ComparisonTable products={comparedProducts} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}