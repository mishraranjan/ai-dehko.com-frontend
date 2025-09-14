'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Play } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4"></div>
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  const isVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('vimeo.com') || url.endsWith('.mp4');
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 group">
        {isVideo(images[selectedIndex]) ? (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Video Preview</p>
              <p className="text-sm text-gray-300">Click to view</p>
            </div>
          </div>
        ) : (
          <Image
            src={images[selectedIndex]}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
            }}
          />
        )}
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 8).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {isVideo(image) ? (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
              ) : (
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
              )}
            </button>
          ))}
          {images.length > 8 && (
            <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium">
              +{images.length - 8}
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold"
            >
              ✕
            </button>
            {isVideo(images[selectedIndex]) ? (
              <div className="bg-gray-900 rounded-lg p-8 text-center">
                <Play className="h-24 w-24 text-white mx-auto mb-4" />
                <p className="text-white text-xl">Video Content</p>
                <a
                  href={images[selectedIndex]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Watch Video
                </a>
              </div>
            ) : (
              <Image
                src={images[selectedIndex]}
                alt={`${productName} - Full size`}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}