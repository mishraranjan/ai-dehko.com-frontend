'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { searchProducts } from '../lib/api';
import { Product } from '../lib/types';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await searchProducts(query);
      setSearchResults(results.slice(0, 5));
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const categories = [
    'Marketing', 'Development', 'Design', 'Analytics'
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AI Dehko</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              {/* Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product._id}
                      href={`/products/${product._id}`}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      onClick={() => setShowSearchResults(false)}
                    >
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate">{product.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium">
              Browse Tools
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="h-5 w-5" />
                  <span>{user.email}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:flex items-center space-x-6 py-3 border-t border-gray-100">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category.toLowerCase()}`}
              className="text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              <Link href="/categories" className="block py-2 text-gray-700">Browse Tools</Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toLowerCase()}`}
                  className="block py-2 text-gray-600 pl-4"
                >
                  {category}
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="py-2 text-gray-700">{user.email}</div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block py-2 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-2 mt-2 space-y-2">
                  <Link href="/login" className="block py-2 text-gray-700">Login</Link>
                  <Link href="/register" className="block py-2 text-blue-600 font-medium">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
