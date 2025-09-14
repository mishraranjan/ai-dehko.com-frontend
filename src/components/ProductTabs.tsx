'use client';
import { useState } from 'react';
import { Product } from '../lib/types';
import { Star, User, Calendar, ExternalLink, Check, X } from 'lucide-react';

interface ProductTabsProps {
  product: Product;
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

export function ProductTabs({ product, selectedTab, onTabChange }: ProductTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'reviews', label: `Reviews (${product.reviews.length})` },
    { id: 'specifications', label: 'Specifications' },
  ];

  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About {product.name}</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.usps.map((usp, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{usp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'features' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features & Specifications</h3>
            {product.features.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.name}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No detailed features available.</p>
            )}
          </div>
        )}

        {selectedTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
              <div className="flex items-center gap-2">
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
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} out of 5
                </span>
              </div>
            </div>

            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{review.user}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'specifications' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Category</span>
                  <span className="text-gray-600">{product.categories.join(', ')}</span>
                </div>
                {product.price && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Price</span>
                    <span className="text-gray-600">${product.price}/month</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Popularity Score</span>
                  <span className="text-gray-600">{product.popularity || 0}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Total Reviews</span>
                  <span className="text-gray-600">{product.reviews.length}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Average Rating</span>
                  <span className="text-gray-600">{averageRating.toFixed(1)}/5</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Tags</span>
                  <span className="text-gray-600">{product.tags.length} tags</span>
                </div>
                {product.purchaseLink && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Website</span>
                    <a 
                      href={product.purchaseLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}