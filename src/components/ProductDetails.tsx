'use client';
import { Product } from '../lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface ProductDetailsProps { product: Product; }

export function ProductDetails({ product }: ProductDetailsProps) {
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="glass-effect rounded-2xl p-8 professional-shadow">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold gradient-text">{product.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex flex-wrap items-center gap-4">
              {averageRating > 0 && (
                <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
                </div>
              )}

              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full">
                <span className="text-primary font-medium">{product.popularity}% popularity</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.categories.map(category => (
                <span
                  key={category}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:text-right space-y-4">
            {product.price && (
              <div className="glass-effect p-6 rounded-xl text-center lg:text-right">
                <div className="text-3xl font-bold text-primary">${product.price}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            )}

            {product.purchaseLink && (
              <Button asChild className="w-full lg:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href={product.purchaseLink} target="_blank" rel="noopener noreferrer">
                  Get Started
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 gap-2 glass-effect p-2 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="usps" className="rounded-lg">USPs</TabsTrigger>
          <TabsTrigger value="features" className="rounded-lg">Features</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-lg">Reviews</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-lg">Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="glass-effect rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">About {product.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map(category => (
                    <span key={category} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="usps" className="mt-6">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Unique Selling Points</h3>
            <div className="grid gap-4">
              {product.usps.map((usp, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 bg-accent/50 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-foreground">{usp}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <div className="grid gap-6">
              {product.features.map((feat, i) => (
                <div key={i} className="border-l-4 border-primary pl-6 py-2">
                  <h4 className="font-semibold text-lg mb-2">{feat.name}</h4>
                  <p className="text-muted-foreground">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
            {product.reviews.length ? (
              <div className="space-y-6">
                {product.reviews.map((review, i) => (
                  <div key={i} className="border-b border-border/50 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">{review.user[0].toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{review.user}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, starIndex) => (
                              <span key={starIndex} className={`text-sm ${starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-muted-foreground">No reviews yet. Be the first to review this tool!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Gallery</h3>
            {product.gallery.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.gallery.map((url, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl">
                    <Image
                      src={url}
                      alt={`${product.name} screenshot ${i + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🖼️</div>
                <p className="text-muted-foreground">No gallery images available.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}