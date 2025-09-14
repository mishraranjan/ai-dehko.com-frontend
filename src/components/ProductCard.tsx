'use client';
import { Product } from '../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Star, TrendingUp, ExternalLink, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onCompare?: (id: string) => void;
}

export function ProductCard({ product, onCompare }: ProductCardProps) {
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <Card className="group card-hover professional-shadow border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              {averageRating > 0 && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
                </div>
              )}
              <div className="flex items-center space-x-1 text-primary">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">{product.popularity}% popular</span>
              </div>
            </div>
          </div>
          {product.price && (
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${product.price}</div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        <div className="space-y-3">
          <div>
            <div className="flex flex-wrap gap-1">
              {product.categories.slice(0, 2).map(category => (
                <span
                  key={category}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {category}
                </span>
              ))}
              {product.categories.length > 2 && (
                <span className="text-xs text-muted-foreground">+{product.categories.length - 2} more</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-accent text-accent-foreground"
                >
                  #{tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{product.tags.length - 3} more</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Link href={`/products/${product._id}`} className="flex-1">
            <Button className="w-full h-10 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-md hover:shadow-lg transition-all duration-300">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          {onCompare && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCompare(product._id)}
              className="h-10 w-10 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}