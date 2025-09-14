'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { ProductGallery } from '../../../components/ProductGallery';
import { ProductTabs } from '../../../components/ProductTabs';
import { RelatedProducts } from '../../../components/RelatedProducts';
import { getProduct } from '../../../lib/api';
import { Product } from '../../../lib/types';
import { Star, ExternalLink, Share2, Heart, Plus } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(params.id as string);
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
            <li><span className="text-gray-400">/</span></li>
            <li><a href="/categories" className="text-gray-500 hover:text-gray-700">Categories</a></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.gallery} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.categories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(averageRating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Price */}
              {product.price && (
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-gray-600 ml-2">/ month</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                {product.purchaseLink && (
                  <a
                    href={product.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Visit Website
                  </a>
                )}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-6 py-3 rounded-lg border transition-colors flex items-center gap-2 ${
                    isWishlisted 
                      ? 'bg-red-50 border-red-200 text-red-700' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Saved' : 'Save'}
                </button>
                <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>

              {/* USPs */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Key Benefits</h3>
                <ul className="space-y-1">
                  {product.usps.map((usp, index) => (
                    <li key={index} className="text-green-700 text-sm flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {usp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} selectedTab={selectedTab} onTabChange={setSelectedTab} />

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>

      <Footer />
    </div>
  );
}
